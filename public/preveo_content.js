/**
 * ─────────────────────────────────────────────────────────────
 *  PREVEO — Content Configuration
 *  Edit this file to update all text and color highlights
 *  on the landing page without touching any HTML or CSS.
 *
 *  COLOR TOKENS (use these names in `accent` fields):
 *    "amber"      → #C87820  (primary accent — data, CTAs)
 *    "slate-rule" → #C8D2E8  (wordmark "veo", subtle contrast)
 *    "muted"      → rgba(255,255,255,0.20)  (de-emphasis)
 *    "white"      → #F4F6FA  (full brightness)
 *    "dim"        → rgba(255,255,255,0.45)  (secondary text)
 *
 *  TEXT SEGMENTS with color highlights:
 *    Use an array of segments instead of a plain string.
 *    Each segment: { t: "text", c: "token" } or just "plain text"
 *    Example:
 *      headline: [
 *        "Plan with foresight.",
 *        { t: "\nAct with ", c: "muted" },
 *        { t: "precision.", c: "white" }
 *      ]
 * ─────────────────────────────────────────────────────────────
 */

const PREVEO_CONTENT = {

  // ── META ──────────────────────────────────────────────────
  meta: {
    title:       "Preveo — Goal-Driven Life Planning",
    description: "Preveo connects your goals, nutrition, training, and daily decisions into one coherent system.",
  },

  // ── NAV ───────────────────────────────────────────────────
  nav: {
    links: [
      { label: "Features",     href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "Stories",      href: "#testimonials" },
      { label: "Pricing",      href: "#pricing" },
    ],
    signinLabel: "Sign in",
    ctaLabel:    "Get started free",
    ctaHref:     "#",
  },

  // ── HERO ──────────────────────────────────────────────────
  hero: {
    eyebrow: "Data-Driven Lifestyle Intelligence Platform",

    // Headline: array of segments for mixed colors
    headline: [
      { t: "Plan with foresight.", c: "white" },
      "\n",
      { t: "Act with ", c: "muted" },
      { t: "precision.", c: "white" },
    ],

    sub: "Preveo connects your goals, nutrition, training, and daily decisions into one coherent system — built around you, updated in real time.",

    primaryBtn:  { label: "Start your first plan", href: "#" },
    secondaryBtn: { label: "See it in action",     href: "#" },

    // Social proof bar
    proof: {
      avatars: ["KL", "MR", "SA", "JT", "+"],
      text: [
        "Trusted by ",
        { t: "12,000+", c: "white" },
        " goal-driven people",
      ],
    },
  },

  // ── APP PREVIEW (mock UI inside hero) ─────────────────────
  preview: {
    topbarTitle: "preveo.app · 13-Week Lean Reset — Meal plan",
    sidebar: [
      { label: "13-Week Lean Reset",  active: true },
      { label: "Week 5 training" },
      { label: "Power Bowl breakdown" },
      { label: "Progressive overload" },
      { label: "Recovery Week 3–4" },
    ],
    messages: [
      { role: "ai",  html: "Week 5 targets loaded. Protein floor adjusted to <strong>185g</strong>. Caloric deficit holds at <strong>~420 kcal/day</strong>." },
      { role: "user", text: "Generate a full day meal plan for Wednesday. I have a 6am strength session." },
      { role: "ai",  html: "Wednesday plan structured around your 06:00 session. Post-workout window: <strong>whey isolate + fast carbs within 30 min</strong>." },
    ],
    artifact: {
      title:    "Wednesday Meal Plan",
      subtitle: "Strength day · High protein",
      macros: [
        { value: "1,783", label: "kcal" },
        { value: "186g",  label: "protein" },
        { value: "193g",  label: "carbs" },
      ],
      bars: [
        { label: "Protein", value: "186g", pct: 68,  color: "amber" },
        { label: "Carbs",   value: "193g", pct: 82,  color: "slate" },
        { label: "Fat",     value: "51g",  pct: 38,  color: "rule" },
      ],
    },
  },

  // ── STATS BAND ────────────────────────────────────────────
  stats: [
    { number: "94", unit: "%",   desc: "Average plan adherence" },
    { number: "13", unit: "wk",  desc: "Structured program cycles" },
    { number: "12", unit: "k+",  desc: "Active users worldwide" },
    { number: "4.9", unit: "★",  desc: "Average outcome score" },
  ],

  // ── FEATURES ──────────────────────────────────────────────
  features: {
    eyebrow: "What Preveo does",
    headline: [
      "Everything your goals need.",
      "\n",
      { t: "Nothing they don't.", c: "muted" },
    ],
    sub: "Six interconnected systems working in concert — so your decisions compound instead of conflict.",
    cards: [
      {
        icon: "adaptive",
        title: "Adaptive Planning",
        text:  "Your plan updates in real time as your body, schedule, and goals evolve. No more static spreadsheets.",
      },
      {
        icon: "nutrition",
        title: "Nutrition Intelligence",
        text:  "Macro targets that adjust to training load, recovery state, and weekly adherence — automatically.",
      },
      {
        icon: "training",
        title: "Training Protocol",
        text:  "Progressive overload structured around your recovery windows. Each week builds on the last.",
      },
      {
        icon: "daily",
        title: "Daily Execution",
        text:  "Morning briefings, meal timing, and session cues — delivered when you need them, not before.",
      },
      {
        icon: "library",
        title: "Goal Library",
        text:  "Every plan, decision, and outcome is stored and searchable. Your progress becomes your playbook.",
      },
      {
        icon: "experts",
        title: "Expert Protocols",
        text:  "Pre-built frameworks from coaches, doctors, and nutritionists — tailored to your baseline, not a generic template.",
      },
    ],
  },

  // ── HOW IT WORKS ──────────────────────────────────────────
  howItWorks: {
    eyebrow: "How it works",
    headline: [
      "From goal to outcome",
      "\n",
      { t: "in four steps.", c: "muted" },
    ],
    steps: [
      {
        num:   "01",
        title: "Define your goal",
        text:  "Tell Preveo what you're working toward. Body composition, performance, longevity — any target, any timeline.",
      },
      {
        num:   "02",
        title: "Build your baseline",
        text:  "Preveo maps your current state — training age, nutrition habits, schedule, and recovery patterns.",
      },
      {
        num:   "03",
        title: "Execute daily",
        text:  "Your day is structured for you. Meals, sessions, and decisions that compound toward your goal.",
      },
      {
        num:   "04",
        title: "Adapt and advance",
        text:  "Preveo reads your results and recalibrates your plan week over week. Progress that doesn't plateau.",
      },
    ],
  },

  // ── TESTIMONIALS ──────────────────────────────────────────
  testimonials: {
    eyebrow: "Real outcomes",
    headline: [
      "Built for people who",
      "\n",
      { t: "follow through.", c: "muted" },
    ],
    items: [
      {
        initials: "KL",
        name:     "Kai Larsen",
        role:     "13-Week Lean Reset · Week 5",
        stars:    5,
        quote:    "I've tried every app. Preveo is the first one that actually changes its recommendations based on what I did yesterday. It feels like a coach that's always watching.",
      },
      {
        initials: "MR",
        name:     "Maya Reyes",
        role:     "Performance Protocol · Cycle 2",
        stars:    5,
        quote:    "The macro timing around training is something I never thought about until Preveo surfaced it. My recovery has improved more in 6 weeks than the past year.",
      },
      {
        initials: "SA",
        name:     "Dr. Sofia Ames",
        role:     "Longevity Track · Month 3",
        stars:    5,
        quote:    "I'm a doctor and I was skeptical. But the evidence-based progressions and the honest tracking changed how I think about my own protocols. Remarkable product.",
      },
    ],
  },

  // ── CTA SECTION ───────────────────────────────────────────
  cta: {
    headline: [
      "Your best plan starts",
      "\n",
      { t: "with one conversation.", c: "muted" },
    ],
    sub:        "No templates. No generic advice. Just a system built around your goals, your baseline, and your life.",
    primaryBtn: { label: "Get started — it's free", href: "#" },
    ghostBtn:   { label: "Talk to the team",        href: "#" },
    note:       "No credit card required · Cancel anytime",
  },

  // ── FOOTER ────────────────────────────────────────────────
  footer: {
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing",  href: "#pricing" },
      { label: "Privacy",  href: "#" },
      { label: "Terms",    href: "#" },
      { label: "Help",     href: "#" },
    ],
    copy: "© 2026 Preveo",
  },

};

// ── COLOR TOKEN MAP ───────────────────────────────────────────
// Maps token names (used in content segments above) to actual CSS values.
// Change a value here to update every instance of that color across the page.
const PREVEO_COLORS = {
  "amber":      "var(--amber)",
  "slate-rule": "var(--slate-rule)",
  "white":      "#F4F6FA",
  "muted":      "rgba(255,255,255,0.20)",
  "dim":        "rgba(255,255,255,0.45)",
};
