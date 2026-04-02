/* ── Project Registry ────────────────────────────────────────────
   Single source of truth for all portfolio projects.
   Consumed by both index.html (card rendering) and
   projects/index.html (detail page rendering).
──────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'fdtd-directional-coupler',
    title: 'Broadband Bent Directional Coupler',
    type: 'FDTD Simulation',
    cardVisual: 'fdtd',
    cardBadge: 'O-band · 3D FDTD',
    heroImage: '../images/bentdc/bentdc_efield_hero.png',
    cardImage: 'images/bentdc/bentdc_efield_hero.png',
    preview: 'Does replacing the straight coupling section with a curved arc really flatten coupling across wavelength? A 75-sim Tidy3D investigation — spanning two wavelength bands and two compact models — finds out.',
    description: [
      'A directional coupler (DC) is one of the most fundamental building blocks in silicon photonics: two waveguides placed nanometres apart exchange optical power through evanescent coupling. The coupling ratio depends strongly on wavelength, which limits the useful bandwidth of DC-based devices such as 50:50 splitters, MZI arms, and wavelength-selective switches. A 2024 paper (arXiv:2404.06117) proposes a simple geometric fix: replace the straight coupling section with a symmetric arc. By linking the average propagation constant of the light (\\(\\bar{\\beta}\\)) with the specific physical footprint — the center-to-center waveguide spacing defined by the gap (\\(g\\)) and waveguide width (\\(w\\)), relative to the arc\'s bending radius (\\(R\\)) — the arc introduces a bending-induced phase mismatch \\(\\Delta\\beta = \\bar{\\beta}\\,(g+w)/R\\) between the two arms that, in theory, partially cancels the material dispersion and flattens the coupling ratio. On the IMEC iSiPP300 platform, the authors report a 7.67× reduction in coupling variation over an 80 nm O-band window.',
      'This study reproduces and stress-tests that claim using open-source PDK materials — Li1993 crystalline Si and Horiba SiO₂ — on the same 220 nm SOI stack. Three investigation paths were executed at O-band (\\(w\\) = 380 nm, λ = 1310 nm): a full 3D FDTD angle sweep at (\\(R\\)) = 25 µm, (\\(g\\)) = 100 nm over θ = 1–16° to locate the 50:50 design point (Path 1); a grid optimisation over (\\(R\\), θ) with \\(R\\) ∈ {15, 20, 25, 30} µm to check whether a different radius activates the broadband mechanism (Path 2); and a zero-cost 2D FEM cross-section sweep over 48 (\\(w\\), \\(g\\)) combinations using FemWell to explore whether cross-section engineering unlocks the effect (Path 3). A parallel C-band study (\\(w\\) = 500 nm, λ = 1550 nm) tested the same architecture at the standard telecom geometry and exposed an additional bending-phase-mismatch constraint. Across both bands, the FDTD results were distilled into SAX compact models for circuit-level simulation.',
      {
        figure: {
          src: '../images/bentdc/plot_BentDC_efield_composite_20260302_1152.png',
          caption: 'Fig. 1 — |E|² field maps at the Si mid-plane (z = 0.11 µm, λ = 1310 nm) spanning the accessible coupling range of the BentDC (R = 25 µm, gap = 100 nm). Left to right: θ = 1° (T_cross ≈ 17%, mostly-through) → θ = 8.5° (50:50 design point) → θ = 12° (T_cross ≈ 62%) → θ = 16° (T_cross ≈ 66%, near the first sin² maximum). The progressive transfer of power from the input waveguide into its neighbour follows the CMT prediction T_cross = F sin²(κRθ).',
        },
      },
      {
        text: 'Path 1 results: the 50:50 design point is confirmed at θ = 8.5° (Fig. 2), in quantitative agreement with the paper\'s Fig. 4. This aligns with the standard Coupled-Mode Theory (CMT) prediction for cross-transmission, \\(T_{\\text{cross}} = F\\sin^2\\!(\\kappa R\\theta)\\), where \\(F\\) represents the maximum power transfer efficiency dictated by the phase mismatch, and \\(\\kappa\\) is the coupling coefficient. However, the broadband performance fails to replicate. The coupling variation across the wavelength window, defined as \\(\\Delta T \\equiv \\max_\\lambda T_{\\text{cross}} - \\min_\\lambda T_{\\text{cross}}\\), is calculated to be 0.266 (Fig. 5), which is nearly identical to the straight DC baseline (0.265). The geometric phase compensation simply does not activate with the public PDK\'s Si dispersion data. The root cause is the difference in dn/dλ between IMEC\'s proprietary silicon model and the Li1993 fit at 1310 nm: the arc geometry was tuned to compensate a specific slope, and with a different slope, the compensation is off by design.',
        figure: {
          src: '../images/bentdc/plot_BentDC_fig4_anglesweep_20260228_0140.png',
          caption: 'Fig. 2 — T_cross and T_bar vs coupling angle θ at 1310 nm — FDTD sweep (blue/red) and CMT fit (orange). The 50:50 crossing falls at θ ≈ 8.4°, reproducing paper Fig. 4.',
        },
      },
      {
        text: 'Path 2 confirms the finding is not radius-dependent (Fig. 3). Across \\(R\\) = 20–30 µm, \\(\\Delta T\\) at the 50:50 point varies by only 3.2% — the parameter landscape is nearly flat. The optimal radius under Li1993/Horiba is \\(R\\) = 20 µm, θ = 11.4°, giving \\(\\Delta T\\) = 0.259, a marginal 2.2% improvement over \\(R\\) = 25 µm. Geometry alone cannot recover the 7.67× improvement reported on IMEC materials. The broadband mechanism is material-locked.',
        figure: {
          src: '../images/bentdc/plot_BentDC_Rtheta_landscape_20260228_1552.png',
          caption: 'Fig. 3 — ΔT at the 50:50 point vs bend radius R (left) and design angle θ* vs R (right). ΔT varies by only 3.2% across R = 20–30 µm — the landscape is essentially flat.',
        },
      },
      {
        text: 'Path 3 identifies a partial workaround (Fig. 4). A FemWell 2D supermode sweep over (\\(w, g\\)) shows that narrower waveguides at tighter gaps increase the coupling coefficient κ and shorten the 50:50 arc length, reducing the propagation distance over which chromatic dispersion accumulates. The best cross-section found — \\(w\\) = 280 nm, \\(g\\) = 80 nm — achieves \\(\\Delta T\\) = 0.138, a 1.8× improvement over the reference geometry. This is a coupling-length reduction effect, not the active phase-mismatch cancellation, but it is a real and practical route to broadening the DC bandwidth without proprietary material data. However, it is important to note that an 80 nm gap pushes the resolution limits of standard DUV lithography and makes the directional coupler exceptionally vulnerable to sub-nanometer fabrication tolerances.',
        figure: {
          src: '../images/bentdc/plot_BentDC_path3_landscape_20260301_1404.png',
          caption: 'Fig. 4 — FemWell cross-section sweep over 48 (w, gap) combinations. Left: ΔT at the 50:50 design point (grey = unreachable). Centre: coupling coefficient κ at 1310 nm. Right: F_max = (κ/Ω)². Best cross-section: w = 280 nm, gap = 80 nm → ΔT = 0.138.',
        },
      },
      'To close the workflow into a circuit-design-ready deliverable, two SAX compact models were trained on the FDTD data at the fabrication-safe gap of 200 nm — well within the minimum feature size of standard deep-UV SOI processes, unlike the paper\'s lithography-limited 100 nm nominal. The O-band model (Fig. 6) covers a 4 × 5 grid over \\(R\\) ∈ {20, 25, 30, 35} µm and θ ∈ {6, 10, 14, 18, 22}°; \\(T_{\\text{cross}}\\) peaks at 0.22 within the training domain, with the 50:50 contour lying beyond the explored radius range at this gap. The C-band model (Fig. 7, \\(w\\) = 500 nm, λ = 1550 nm) — the canonical single-mode width on 220 nm SOI — benefits from stronger evanescent coupling, shifting the 50:50 contour to accessible radii of R ≈ 100–150 µm (θ ≈ 5–9°). However, near the 50:50 operating point the coupling variation \\(\\Delta T\\) ≈ 0.34 is essentially identical to the C-band straight DC baseline (0.334), confirming the material-lock effect observed at O-band holds at the standard telecom cross-section as well. Both models are wrapped as SAX SDict functions mapping any (\\(R\\), θ, λ) to a full S-matrix via tri-linear interpolation, enabling MZI tree, ring lattice, and WDM router simulations at zero additional cloud cost.',
    ],
    toolstack: ['Tidy3D', 'GDSFactory', 'gplugins', 'FemWell', 'SAX', 'Python'],
    codeVisual: 'bentdc',
    noCodeGradient: true,
    codeSnippet: `@gf.cell
def bent_dc(
    wg_width: float = 0.38,      # 380 nm Si strip  (O-band single-mode)
    gap: float      = 0.10,      # 100 nm coupling gap
    R_inner: float  = 25.0,      # inner bend radius [µm]
    theta_deg: float = 8.5,      # coupling arc half-angle [°]
    device_length: float = 27.5,
    port_pitch: float    = 5.0,
    layer: str           = "WG",
) -> gf.Component:
    """Broadband Bent Directional Coupler (arXiv:2404.06117).

    Replaces the straight coupling region with a symmetric arc.
    S-bends are generated analytically for C¹ curvature continuity.
    50:50 design point on gpdk: θ = 8.5°, R = 25 µm, gap = 100 nm.
    """
    # ...
    return c`,
    imageGallery: [
      {
        src: '../images/bentdc/plot_BentDC_theta8p5_detail_20260228_0140.png',
        alt: 'Fig. 5 — T_cross and T_bar vs wavelength at the 50:50 design point (θ = 8.5°, R = 25 µm, gap = 100 nm). Coupling variation ΔT = 0.266 over 80 nm — near-identical to the straight DC baseline (0.265), confirming the broadband mechanism is inoperative with Li1993/Horiba dispersion.',
      },
      {
        src: '../images/bentdc/plot_BentDC_compact_model_200nm_heatmap_20260228_0210.png',
        alt: 'Fig. 6 — O-band compact model: T_cross(R, θ) at λ = 1310 nm, gap = 200 nm, trained on 20 FDTD-validated points (black +). Maximum T_cross = 0.22 within the domain — the 50:50 contour lies beyond the explored radius range at this fabrication-safe gap.',
      },
      {
        src: '../images/bentdc/plot_BentDC500nm_CM_heatmap_20260303_2258.png',
        alt: 'Fig. 7 — C-band compact model (500 nm): T_cross(R, θ) at λ = 1550 nm, gap = 200 nm. The 50:50 contour (white dashed) runs from R ≈ 150 µm at θ = 5° to R ≈ 100 µm at θ ≈ 9° — stronger evanescent coupling at 500 nm shifts it to accessible radii, but ΔT near 50:50 remains ≈ 0.34, confirming the material-lock.',
      },
    ],
    latex: [],
  },

  {
    id: 'linbo3-modulator',
    title: 'Design of a LiNbO\u2083 Modulator',
    type: 'FDTD Simulation',
    cardVisual: 'fdtd',
    cardBadge: 'LiNbO\u2083 · 3D FDTD',
    preview: 'Coming soon.',
    description: [
      'Details coming soon.',
    ],
    toolstack: ['Tidy3D', 'GDSFactory', 'Python'],
    codeSnippet: '',
    imageGallery: [],
    latex: [],
    status: 'coming-soon',
  },

  {
    id: 'blablia',
    title: 'Blablia',
    type: 'Telegram Bot',
    cardVisual: 'code',
    cardBadge: 'Live Beta · @blabliabot',
    preview: 'An AI language tutor that lives inside Telegram. No app to install — just daily structured lessons powered by Claude, in 7 languages.',
    preamble: 'Now in public beta — start learning at @blabliabot on Telegram.',
    description: [
      'Blablia is a language-learning bot built for people who want to make real progress without adding another app to their life. It lives inside Telegram and delivers a complete daily lesson — SRS flashcard review, a grammar drill, a roleplay conversation, and new vocabulary cards — all powered by Anthropic\'s Claude model.',
      'The core insight is that friction kills habits. Telegram is already open; switching to a dedicated app rarely happens. Blablia removes that switch entirely. A lesson takes 5–10 minutes and can be started with a single tap from any device.',
      'Every lesson is personalised. A spaced-repetition (SM-2) scheduler surfaces vocabulary at exactly the right forgetting interval, the grammar topic rotates through the CEFR syllabus for the learner\'s level, and the roleplay scenario is generated fresh each session. On first use, the bot runs a brief adaptive level assessment and places the user on the A1–C1 scale before the first lesson.',
      'Seven UI languages are supported (English, Spanish, French, German, Italian, Portuguese, Polish), with seven target languages available for learning. Subscriptions are handled via Stripe Checkout; the trial gives 3 lessons with no credit card required.',
    ],
    toolstack: ['Python', 'python-telegram-bot', 'Claude API', 'SQLite', 'Stripe', 'Hetzner VPS'],
    codeSnippet: `# Four-stage lesson, personalised per learner
async def cmd_lesson(update, context):
    user  = db.get_user(chat_id)
    level = user["level"]      # A1 → C1  (CEFR)
    tier  = user["tier"]       # trial / basic / pro / intensive / vip

    # 1 · SRS Review — words due today via SM-2 scheduler
    due_words = db.get_due_words(chat_id)

    # 2 · Grammar — topic rotated through CEFR syllabus
    grammar   = await claude.generate_grammar_lesson(level, language)

    # 3 · Roleplay — fresh scenario each session
    scenario  = await claude.start_roleplay(level, language)

    # 4 · Flashcards — new vocabulary cards
    cards     = await claude.generate_flashcards(level, language)`,
    imageGallery: [],
    latex: [],
    offchip: true,
    tos: [
      {
        title: 'Service',
        text: 'Blablia (@blabliabot) is an AI-powered language learning service delivered via Telegram, operated by Aitor López Hernández. By using the bot you agree to these terms. Contact: @pic_asso on Telegram.',
      },
      {
        title: 'Subscriptions & Billing',
        text: 'Paid plans (Basic, Pro, Intensive) are billed monthly or annually via Stripe. Prices are in euros and include applicable taxes. Subscriptions are not auto-renewed — you will be prompted to renew when your plan expires.',
      },
      {
        title: 'Refunds',
        text: 'You may request a full refund within 7 days of purchase if you have completed fewer than 5 lessons on the paid plan. After 7 days or 5 lessons (whichever comes first) no refund is issued. To request one, message @pic_asso on Telegram with your Telegram user ID and date of purchase.',
      },
      {
        title: 'Free Trial',
        text: 'New users receive 3 free lessons with no payment required. Trial access is limited to one account per Telegram user ID.',
      },
      {
        title: 'AI-Generated Content',
        text: 'Lesson content is generated by Anthropic\'s Claude model. While quality is generally high, AI can make mistakes. Blablia is a learning aid — always verify important language questions with a native speaker or authoritative reference.',
      },
      {
        title: 'Data & Privacy',
        text: 'We store your Telegram ID, learning progress, and subscription status. We do not store payment details. You can request access to or deletion of your data at any time by messaging @pic_asso on Telegram. Full privacy policy is available inside the bot via /privacy.',
      },
      {
        title: 'Changes',
        text: 'These terms may be updated. Material changes will be announced inside the bot. Continued use after notice constitutes acceptance.',
      },
    ],
  },

  {
    id: 'theater-play',
    title: 'Solvay',
    type: 'Theater Play',
    cardVisual: 'fdtd',
    cardBadge: 'Registered Work',
    heroImage: '../images/theater/Solvay_conference_1927.jpg',
    heroFullCover: true,
    cardImage: 'images/theater/Main_title.jpeg',
    preview: 'Brussels, 1927. Einstein vs Bohr. A young cleaner witnesses history. A drama about the Observer Effect \u2014 how the simple act of looking can change who we look at, or even ourselves.',
    preamble: 'Release date TBD (by now only in Spanish)!',
    description: [
      'Brussels, 1927. The Hotel Metropole braces itself to host the most important gathering of minds in history: the Fifth Solvay Conference. In its grand halls, Albert Einstein and Niels Bohr wage an intellectual battle that will change our understanding of reality forever.',
      'Meanwhile, in its luxurious rooms, conspiracies flourish, fueled by the wounds of old conflicts. And, in the service corridors, a young cleaner, endowed with a curiosity forbidden to her social class, becomes the invisible witness to an avalanche of events that will shake her life and that of her younger sister.',
      'Solvay is not just a play about physics; it is a drama about the "Observer Effect": how the simple act of looking can change who we look at, or even ourselves. A story that travels between 1927 and 1950 to answer the ultimate question: Does God play dice with our lives?',
    ],
    characters: [
      { name: 'Juliette Dumond', role: 'Metropole Hotel Cleaner. Corvette`s sister. Tremendously curious and intelligent, but with no formal education.' },
      { name: 'Corvette Dumond', role: 'Metropole Hotel Cleaner. Juliette`s sister. A dreamer, naive, and deeply in love with her beau, Herman.' },
      { name: 'Herman Schneider', role: 'German Army Officer. Corvette`s partner. Handsome, with impeccable manners and martial discipline.' },
      { name: 'Gabriel Mertens', role: 'Metropole Staff Manager. A lover of protocol, strict with the service, and comically fawning with the guests..' },
    ],
    toolstack: ['Drama', 'Historical Fiction', '1927\u20131950'],
    codeSnippet: '',
    imageGallery: [
      { src: '../images/theater/Main_title.jpeg', alt: '' },
      { src: '../images/theater/Einstein_and_Bohr.jpeg', alt: '' },
      { src: '../images/theater/Corvette_and_Herman.jpeg', alt: '' },
      { src: '../images/theater/Mertens_with_employees.png', alt: '' },
    ],
    latex: [],
    offchip: true,
  },
];
