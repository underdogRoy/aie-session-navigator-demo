// ============================================================================
// AIE Session Navigator — App Logic
// Zero dependencies. Renders persona picker, track filters, ranked session
// cards, and the ZCode booth conversation angle for the selected persona.
// ============================================================================

(function () {
  "use strict";

  var DATA = window.AIE_DATA;
  if (!DATA) {
    console.error("AIE_DATA not loaded. Include data.js before app.js.");
    return;
  }

  // --- State -----------------------------------------------------------------
  var state = {
    personaId: null,            // selected persona id
    activeTracks: {},           // trackId -> bool (multi-select)
    timeBudget: "any",          // 'any' | 'short' | 'deep'
  };

  // Track lookups for convenience.
  var trackById = indexBy(DATA.tracks, "id");
  var personaById = indexBy(DATA.personas, "id");

  // --- Small helpers ---------------------------------------------------------
  function indexBy(arr, key) {
    var out = {};
    for (var i = 0; i < arr.length; i++) out[arr[i][key]] = arr[i];
    return out;
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  // --- Rendering: Persona picker --------------------------------------------
  function renderPersonas() {
    var host = document.getElementById("persona-grid");
    clear(host);
    DATA.personas.forEach(function (p) {
      var card = el("button", "persona-card");
      card.type = "button";
      card.dataset.personaId = p.id;
      card.setAttribute("aria-pressed", "false");
      if (state.personaId === p.id) {
        card.classList.add("is-selected");
        card.setAttribute("aria-pressed", "true");
      }
      card.appendChild(el("div", "persona-name", p.name));
      card.appendChild(el("div", "persona-tag", p.tagline));
      card.appendChild(el("div", "persona-detail", p.detail));
      card.addEventListener("click", function () {
        state.personaId = (state.personaId === p.id) ? null : p.id;
        renderAll();
      });
      host.appendChild(card);
    });
  }

  // --- Rendering: Track filters ---------------------------------------------
  function renderTracks() {
    var host = document.getElementById("track-grid");
    clear(host);
    DATA.tracks.forEach(function (t) {
      var chip = el("button", "track-chip");
      chip.type = "button";
      chip.dataset.trackId = t.id;
      chip.setAttribute("aria-pressed", state.activeTracks[t.id] ? "true" : "false");
      if (state.activeTracks[t.id]) chip.classList.add("is-active");
      chip.style.setProperty("--track-color", t.color);
      var dot = el("span", "track-dot");
      dot.style.background = t.color;
      chip.appendChild(dot);
      chip.appendChild(el("span", "track-label", t.label));
      chip.addEventListener("click", function () {
        state.activeTracks[t.id] = !state.activeTracks[t.id];
        renderAll();
      });
      host.appendChild(chip);
    });
  }

  // --- Rendering: Time budget ------------------------------------------------
  function renderTimeBudget() {
    var host = document.getElementById("time-grid");
    clear(host);
    var opts = [
      { id: "any",   label: "Any time" },
      { id: "short", label: "Quick hits" },
      { id: "deep",  label: "Deep dive" },
    ];
    opts.forEach(function (o) {
      var b = el("button", "time-btn");
      b.type = "button";
      b.textContent = o.label;
      b.setAttribute("aria-pressed", state.timeBudget === o.id ? "true" : "false");
      if (state.timeBudget === o.id) b.classList.add("is-active");
      b.addEventListener("click", function () { state.timeBudget = o.id; renderAll(); });
      host.appendChild(b);
    });
  }

  // --- Ranking ---------------------------------------------------------------
  // Score each session: persona match weighted heavily, track match next,
  // with a tiny time-budget nudge. Returns sorted array of {session, score, reasons}.
  function rankSessions() {
    var selectedTracks = Object.keys(state.activeTracks).filter(function (k) {
      return state.activeTracks[k];
    });

    var results = DATA.sessions.map(function (s) {
      var score = 0;
      var reasons = [];

      if (state.personaId) {
        if (s.targetPersona === state.personaId) {
          score += 100;
          reasons.push({ kind: "persona", text: "Best match for " + personaById[state.personaId].name });
        } else if (s.personas.indexOf(state.personaId) !== -1) {
          score += 50;
          reasons.push({ kind: "persona", text: "Relevant to " + personaById[state.personaId].name });
        }
      }

      if (selectedTracks.length) {
        if (selectedTracks.indexOf(s.track) !== -1) {
          score += 30;
          reasons.push({ kind: "track", text: trackById[s.track].label });
        } else {
          // Track filter is active and this session isn't in it -> hard exclude.
          score = -1;
        }
      }

      // Time-budget nudge: deep-dive favors multi-step tracks; quick hits favor
      // focused single-skill tracks. Lightweight heuristic for demo flavor.
      if (state.timeBudget === "deep" && (s.track === "agentic" || s.track === "context")) {
        score += 5;
      } else if (state.timeBudget === "short" && (s.track === "evals" || s.track === "vision-ocr")) {
        score += 5;
      }

      return { session: s, score: score, reasons: reasons };
    });

    // Exclude hard-filtered, sort by score desc, stable on title for ties.
    results = results.filter(function (r) { return r.score >= 0; });
    results.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.session.title.localeCompare(b.session.title);
    });
    return results;
  }

  // --- Rendering: Session cards ---------------------------------------------
  function renderSessions() {
    var host = document.getElementById("session-list");
    clear(host);

    var ranked = rankSessions();

    // Summary line
    var summary = document.getElementById("result-summary");
    clear(summary);
    var persona = state.personaId ? personaById[state.personaId].name : "Any attendee";
    var trackWord = "";
    var activeTrackCount = Object.keys(state.activeTracks).filter(function (k) { return state.activeTracks[k]; }).length;
    if (activeTrackCount) trackWord = " · " + activeTrackCount + " track" + (activeTrackCount > 1 ? "s" : "");
    summary.appendChild(el("span", null, "Showing " + ranked.length + " session" + (ranked.length === 1 ? "" : "s") + " for " + persona + trackWord));

    if (!ranked.length) {
      var empty = el("div", "empty-state");
      empty.appendChild(el("p", "empty-title", "No sessions match those filters."));
      empty.appendChild(el("p", "empty-sub", "Try clearing a track filter or picking a different persona."));
      var clearBtn = el("button", "btn btn-secondary");
      clearBtn.type = "button";
      clearBtn.textContent = "Reset filters";
      clearBtn.addEventListener("click", resetAll);
      empty.appendChild(clearBtn);
      host.appendChild(empty);
      return;
    }

    ranked.forEach(function (r, idx) {
      host.appendChild(renderSessionCard(r, idx));
    });
  }

  function renderSessionCard(r, idx) {
    var s = r.session;
    var t = trackById[s.track];

    var card = el("article", "session-card");
    if (r.score >= 100) card.classList.add("is-top");
    else if (r.score >= 50) card.classList.add("is-relevant");

    // Header row: rank badge + track pill
    var head = el("div", "session-head");
    if (r.score >= 100) {
      var badge = el("span", "match-badge match-best", "Top pick");
      head.appendChild(badge);
    } else if (r.score >= 50) {
      head.appendChild(el("span", "match-badge match-good", "Good fit"));
    }
    var pill = el("span", "track-pill");
    pill.style.setProperty("--track-color", t.color);
    var pdot = el("span", "track-dot");
    pdot.style.background = t.color;
    pill.appendChild(pdot);
    pill.appendChild(el("span", null, t.label));
    head.appendChild(pill);
    card.appendChild(head);

    card.appendChild(el("h3", "session-title", s.title));

    if (r.reasons.length) {
      var why = el("div", "session-reasons");
      r.reasons.forEach(function (rs) {
        why.appendChild(el("span", "reason-chip reason-" + rs.kind, rs.text));
      });
      card.appendChild(why);
    }

    var body = el("div", "session-body");
    var whyBlock = el("div", "session-field");
    whyBlock.appendChild(el("div", "field-label", "Why this matters"));
    whyBlock.appendChild(el("p", "field-text", s.why));
    body.appendChild(whyBlock);

    var takeBlock = el("div", "session-field");
    takeBlock.appendChild(el("div", "field-label", "Practical takeaway"));
    takeBlock.appendChild(el("p", "field-text field-takeaway", s.takeaway));
    body.appendChild(takeBlock);
    card.appendChild(body);

    return card;
  }

  // --- Rendering: Booth conversation angle ----------------------------------
  function renderBoothAngle() {
    var host = document.getElementById("booth-angle");
    clear(host);

    if (!state.personaId) {
      var placeholder = el("div", "booth-placeholder");
      placeholder.appendChild(el("p", "booth-placeholder-title", "Pick a persona to see your booth angle."));
      placeholder.appendChild(el("p", "booth-placeholder-sub", "We'll tailor how to pitch ZCode to exactly who you're talking to."));
      host.appendChild(placeholder);
      return;
    }

    var persona = personaById[state.personaId];
    var angle = DATA.boothAngles[state.personaId];

    host.appendChild(el("div", "booth-eyebrow", "My booth conversation angle · " + persona.name));
    host.appendChild(el("h2", "booth-hook", angle.hook));
    host.appendChild(el("p", "booth-body", angle.body));

    var ppLabel = el("div", "proof-label", "Lead with these ZCode strengths");
    var ppGrid = el("div", "proof-grid");
    angle.proofPoints.forEach(function (sid) {
      var str = DATA.strengths[sid];
      if (!str) return;
      var item = el("div", "proof-item");
      item.appendChild(el("div", "proof-name", str.label));
      item.appendChild(el("div", "proof-blurb", str.blurb));
      ppGrid.appendChild(item);
    });
    host.appendChild(ppLabel);
    host.appendChild(ppGrid);
  }

  // --- Controls --------------------------------------------------------------
  function resetAll() {
    state.personaId = null;
    state.activeTracks = {};
    state.timeBudget = "any";
    renderAll();
  }

  function renderActiveControls() {
    var resetBtn = document.getElementById("reset-btn");
    if (resetBtn) resetBtn.disabled = !state.personaId &&
      Object.keys(state.activeTracks).every(function (k) { return !state.activeTracks[k]; }) &&
      state.timeBudget === "any";
  }

  function renderAll() {
    renderPersonas();
    renderTracks();
    renderTimeBudget();
    renderSessions();
    renderBoothAngle();
    renderActiveControls();
  }

  // --- Boot ------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    var resetBtn = document.getElementById("reset-btn");
    if (resetBtn) resetBtn.addEventListener("click", resetAll);
    renderAll();
  });
})();
