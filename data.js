// ============================================================================
// AIE Session Navigator — Seed Data
// Realistic AI Engineer World's Fair-style sessions for the ZCode booth demo.
// Zero dependencies; loaded globally as `AIE_DATA` for app.js.
// ============================================================================

const AIE_DATA = {
  // --------------------------------------------------------------------------
  // Personas — each maps to a ZCode conversation angle for the booth.
  // --------------------------------------------------------------------------
  personas: [
    {
      id: "ai-engineer",
      name: "AI Engineer",
      tagline: "Building production agents",
      detail: "You ship agents that run in real systems: tooling, evals, observability, and on-call.",
      strengths: ["long-horizon", "goal-driven", "git-aware"],
    },
    {
      id: "cto-vp",
      name: "CTO / VP of AI",
      tagline: "Evaluating platforms",
      detail: "You weigh buy-vs-build, platform cost, reliability, and how fast your team moves.",
      strengths: ["cost-transparent", "git-aware", "long-horizon"],
    },
    {
      id: "founder-fde",
      name: "Founder / FDE",
      tagline: "Customer-facing AI builds",
      detail: "You prototype fast in front of customers and turn demos into shipped features.",
      strengths: ["browser-preview", "goal-driven", "cost-transparent"],
    },
    {
      id: "researcher",
      name: "Researcher",
      tagline: "Model & agent systems",
      detail: "You care about how agents plan, use context, and stay aligned over long horizons.",
      strengths: ["goal-driven", "long-horizon", "context-engineering"],
    },
  ],

  // --------------------------------------------------------------------------
  // Tracks — exactly the 8 required by the objective.
  // --------------------------------------------------------------------------
  tracks: [
    { id: "agentic",          label: "Agentic Engineering",        color: "#7c5cff" },
    { id: "context",          label: "Context Engineering",        color: "#2bb3ff" },
    { id: "evals",            label: "Evals",                      color: "#ffb02e" },
    { id: "computer-use",     label: "Computer Use",               color: "#ff5c8a" },
    { id: "search-retrieval", label: "Search / Retrieval",         color: "#34d399" },
    { id: "vision-ocr",       label: "Vision & OCR",               color: "#f97066" },
    { id: "inference-local",  label: "Inference / Local AI",       color: "#22d3ee" },
    { id: "security-platform",label: "Security / Platform Eng.",   color: "#a78bfa" },
  ],

  // --------------------------------------------------------------------------
  // Sessions — realistic, track-tagged, persona-targeted, with the required
  // "why this session matters" + "practical takeaway" fields.
  // `targetPersona` is the primary persona id; `personas` is the full set this
  // session is relevant to (used for ranking).
  // --------------------------------------------------------------------------
  sessions: [
    {
      id: "s1",
      title: "From Prompts to Agents: Shipping Production-Grade Tool Use",
      track: "agentic",
      targetPersona: "ai-engineer",
      personas: ["ai-engineer", "founder-fde", "researcher"],
      why: "Most agent demos die at the tool-call boundary. This session covers the failure modes (retries, malformed args, partial state) that separate toy agents from production ones.",
      takeaway: "A checklist for durable tool execution: schema validation, idempotent retries, and structured intermediate state so agents resume instead of restarting.",
    },
    {
      id: "s2",
      title: "Planning Loops That Actually Hold: Multi-Step Agent Orchestration",
      track: "agentic",
      targetPersona: "researcher",
      personas: ["researcher", "ai-engineer", "founder-fde"],
      why: "Long-horizon tasks fall apart when plans drift. This is the state of the art on goal-driven iteration, replanning, and keeping an agent aligned across many steps.",
      takeaway: "Patterns for checkpointing plans and detecting drift mid-run — directly applicable to long-running coding agents.",
    },
    {
      id: "s3",
      title: "Context Engineering at Scale: What Stays In, What Gets Evicted",
      track: "context",
      targetPersona: "ai-engineer",
      personas: ["ai-engineer", "researcher", "cto-vp"],
      why: "Context windows are no longer the bottleneck; deciding what deserves a token is. This session reframes prompt engineering as a systems problem.",
      takeaway: "A tiered context strategy (working set + retrieved + summary) you can apply to any agent that lives across many turns.",
    },
    {
      id: "s4",
      title: "Evals for Agents: Beyond Single-Turn Benchmarks",
      track: "evals",
      targetPersona: "ai-engineer",
      personas: ["ai-engineer", "cto-vp", "researcher"],
      why: "Single-turn accuracy hides the regressions that matter. Multi-step agent evals are how teams ship without fear.",
      takeaway: "How to build trajectory-level evals with golden paths, rubric scoring, and CI gates that catch silent quality drops.",
    },
    {
      id: "s5",
      title: "Online Evals & Guardrails: Watching Agents After You Ship",
      track: "evals",
      targetPersona: "cto-vp",
      personas: ["cto-vp", "ai-engineer"],
      why: "Pre-deployment evals don't catch distribution shift. This covers the observability layer that turns evals from a launch gate into a runtime signal.",
      takeaway: "A metrics hierarchy (task success, cost per success, escalation rate) for monitoring agents in production.",
    },
    {
      id: "s6",
      title: "Computer Use in the Real World: Browsers, Apps, and the Edge",
      track: "computer-use",
      targetPersona: "founder-fde",
      personas: ["founder-fde", "ai-engineer", "researcher"],
      why: "Computer-use agents are graduating from demos to reliable workflows. This session covers latency, reliability, and where the GUI boundary breaks.",
      takeaway: "When to reach for computer-use vs. APIs, plus how to preview and verify browser-driven actions before committing them.",
    },
    {
      id: "s7",
      title: "Retrieval That Survives Ambiguity: Hybrid Search & Reranking",
      track: "search-retrieval",
      targetPersona: "ai-engineer",
      personas: ["ai-engineer", "founder-fde", "researcher"],
      why: "Naive RAG retrieves the wrong chunks for real queries. Hybrid + reranking is now table stakes for grounded agents.",
      takeaway: "A retrieval pipeline (lexical + dense + cross-encoder rerank) with a simple eval harness to prove it beats baseline.",
    },
    {
      id: "s8",
      title: "Vision & OCR for Documents: Structured Output from Messy Inputs",
      track: "vision-ocr",
      targetPersona: "founder-fde",
      personas: ["founder-fde", "ai-engineer"],
      why: "Real customers hand you PDFs, scans, and screenshots. Getting clean structured data out is where most document AI projects stall.",
      takeaway: "A two-stage pattern (VLM extraction + schema-validated repair) that hits high precision on forms and tables.",
    },
    {
      id: "s9",
      title: "Inference Economics: Cost, Latency, and Model Routing",
      track: "inference-local",
      targetPersona: "cto-vp",
      personas: ["cto-vp", "ai-engineer", "founder-fde"],
      why: "Model choice now drives 90% of unit economics. Routing the right model to the right step is a platform decision, not a one-off.",
      takeaway: "A routing framework (cheap model first, escalate on confidence) with cost-per-task accounting you can put in a dashboard.",
    },
    {
      id: "s10",
      title: "Local & On-Device Agents: Privacy, Latency, and the Offline Edge",
      track: "inference-local",
      targetPersona: "researcher",
      personas: ["researcher", "ai-engineer", "cto-vp"],
      why: "On-device inference is unlocking agents that can't call the cloud — healthcare, edge, air-gapped. Capabilities and limits are shifting fast.",
      takeaway: "A model-quantization and tool-selection guide for fitting useful agents into a local footprint.",
    },
    {
      id: "s11",
      title: "Securing the Agent Boundary: Tool Scopes, Sandboxing & Audit Logs",
      track: "security-platform",
      targetPersona: "cto-vp",
      personas: ["cto-vp", "ai-engineer"],
      why: "An agent with tools is a new attack surface. This session maps the threats (prompt injection, tool abuse, data exfil) and the mitigations teams trust.",
      takeaway: "A least-privilege tooling model with sandboxed execution and an immutable audit log for every action an agent takes.",
    },
    {
      id: "s12",
      title: "Platform Engineering for AI: Serving, Versioning & Rollbacks",
      track: "security-platform",
      targetPersona: "cto-vp",
      personas: ["cto-vp", "ai-engineer"],
      why: "AI features need the same SRE rigor as the rest of infra — but with non-deterministic outputs. This is how mature teams operate it.",
      takeaway: "A deploy + rollback strategy for prompts and agent configs, with canary evals baked into the release pipeline.",
    },
    {
      id: "s13",
      title: "Customer-Facing AI: Prototyping to Production in Front of Users",
      track: "agentic",
      targetPersona: "founder-fde",
      personas: ["founder-fde", "ai-engineer"],
      why: "Live demos make or break deals. This session is about building AI features fast enough to show a customer, then hardening them into shipping product.",
      takeaway: "A demo-to-prod loop: instant preview, then capture the session as a replay so you can reproduce and fix the failures.",
    },
    {
      id: "s14",
      title: "Goal-Driven Agents vs. Instruction Following: When to Let Go",
      track: "agentic",
      targetPersona: "researcher",
      personas: ["researcher", "ai-engineer", "founder-fde"],
      why: "The biggest capability jump this year is agents that iterate toward a goal instead of executing a script. This is the theory and the gotchas.",
      takeaway: "Decision criteria for when goal-driven autonomy beats scripted workflows — and the guardrails that keep it safe.",
    },
    {
      id: "s15",
      title: "Token Budgets & Usage Transparency: FinOps for AI Teams",
      track: "context",
      targetPersona: "cto-vp",
      personas: ["cto-vp", "ai-engineer", "founder-fde"],
      why: "You can't optimize what you can't see. Transparent, per-task usage and cost is now a hard requirement, not a nice-to-have.",
      takeaway: "A usage-accounting template that attributes tokens and cost back to features, users, and runs — no surprises on the invoice.",
    },
    {
      id: "s16",
      title: "Agentic Code Changes: Reviewable, Reversible, Git-Aware",
      track: "agentic",
      targetPersona: "ai-engineer",
      personas: ["ai-engineer", "founder-fde", "cto-vp"],
      why: "Coding agents that touch your repo need a story for review and rollback. This session is the current best practice.",
      takeaway: "How to scope agent changes to a workspace, preview diffs, and commit only what survives review — no mystery mega-commits.",
    },
  ],

  // --------------------------------------------------------------------------
  // ZCode strengths — single source of truth for booth copy.
  // Each has an id so personas can reference it.
  // --------------------------------------------------------------------------
  strengths: {
    "long-horizon":       { label: "Long-Horizon Tasks",       blurb: "Stays on goal across many steps — resumes, doesn't restart." },
    "goal-driven":        { label: "Goal-Driven Iteration",     blurb: "Iterates toward a definition of done instead of one-shotting." },
    "browser-preview":    { label: "Browser Preview",           blurb: "See computer-use and web actions before they're committed." },
    "git-aware":          { label: "Git-Aware Workspace",       blurb: "Scoped, reviewable, reversible changes — never a mystery commit." },
    "cost-transparent":   { label: "Transparent Usage & Cost",  blurb: "Per-task token and cost accounting, no invoice surprises." },
    "context-engineering":{ label: "Context Engineering",       blurb: "Keeps the right context in and evicts the noise, turn after turn." },
  },

  // --------------------------------------------------------------------------
  // Booth conversation angles — one per persona. This is the "pitch".
  // --------------------------------------------------------------------------
  boothAngles: {
    "ai-engineer": {
      hook: "Stop hand-holding your agents through long tasks.",
      body: "ZCode runs goal-driven, long-horizon agent work in a Git-aware workspace — so multi-step code changes come back as reviewable diffs you can revert, not mystery mega-commits. You see usage and cost per task, and you preview browser and tool actions before they're committed. It's the execution layer your evals assume you already have.",
      proofPoints: ["long-horizon", "git-aware", "goal-driven", "browser-preview", "cost-transparent"],
    },
    "cto-vp": {
      hook: "A platform your engineers trust, with cost you can see.",
      body: "ZCode gives your team an agent that's safely scoped to a Git workspace with transparent per-task usage and cost — so you can measure unit economics on every feature, not guess after the invoice. Long-horizon tasks complete instead of timing out, and changes are reversible. You get speed without losing the audit trail a platform team needs.",
      proofPoints: ["cost-transparent", "git-aware", "long-horizon", "browser-preview"],
    },
    "founder-fde": {
      hook: "Build the demo live, ship the feature after.",
      body: "ZCode is built for customer-facing AI work: goal-driven iteration so you can prototype in front of a prospect, a browser preview so they see the result instantly, and a Git-aware workspace so the same session hardens into a reviewable, shippable change. Transparent cost means you can scope deals without surprises. Demo today, production tomorrow — same artifacts.",
      proofPoints: ["browser-preview", "goal-driven", "git-aware", "cost-transparent"],
    },
    "researcher": {
      hook: "A testbed for goal-driven, long-horizon agents.",
      body: "ZCode is a place to study agents that iterate toward a goal across many steps — how they plan, what context they keep, and where they drift. The Git-aware workspace and per-task usage logs give you a clean, reproducible record of every run, and the browser preview lets you inspect computer-use behavior step by step. Useful as both a research harness and a strong baseline.",
      proofPoints: ["goal-driven", "long-horizon", "context-engineering", "browser-preview", "git-aware"],
    },
  },
};

// Expose globally (no module system — keeps the app build-free).
if (typeof window !== "undefined") {
  window.AIE_DATA = AIE_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = AIE_DATA;
}
