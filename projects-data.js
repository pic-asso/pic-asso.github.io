/* ── Project Registry ────────────────────────────────────────────
   Single source of truth for all portfolio projects.
   Consumed by both index.html (card rendering) and
   projects/index.html (detail page rendering).
──────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'ring-resonator-filter',
    title: 'Project 1',
    type: 'GDSII Layout',
    cardVisual: 'gdsii',
    cardBadge: '220 nm SOI',
    preview: 'Placeholder text',
    description: [
      'A ring resonator is one of the most elegant structures in integrated photonics: a closed-loop waveguide evanescently coupled to a straight bus. When the roundtrip phase accumulates to an exact multiple of 2π, the device resonates — selectively transferring power to the drop port at those wavelengths while passing all others.',
      'This layout was generated parametrically using GDSFactory with the Cornerstone PDK, targeting the 220 nm silicon-on-insulator (SOI) platform. Every geometric parameter — gap, ring radius, coupling length, waveguide width — is exposed as a Python argument, making it straightforward to sweep designs and export DRC-clean GDSII files ready for tapeout.',
    ],
    toolstack: ['GDSFactory', 'KLayout', 'Cornerstone PDK'],
    codeSnippet: `import gdsfactory as gf
from cornerstone_pdk import LAYER

@gf.cell
def ring_resonator_filter(
    gap: float = 0.2,
    radius: float = 10.0,
    coupling_length: float = 5.0,
    wg_width: float = 0.45,
) -> gf.Component:
    """Single-ring add-drop filter — Cornerstone 220 nm SOI."""
    c = gf.Component()

    ring = c << gf.components.ring_single(
        gap=gap,
        radius=radius,
        length_x=coupling_length,
        cross_section=gf.cross_section.strip(
            width=wg_width,
            layer=LAYER.WG,
        ),
    )

    c.add_ports(ring.get_ports_list())
    return c


if __name__ == "__main__":
    c = ring_resonator_filter(gap=0.18, radius=8.0)
    c.show()          # opens in KLayout
    c.write_gds("ring_filter.gds")`,
    imageGallery: [],
    latex: [
      '\\lambda_{\\text{res}} = \\dfrac{n_{\\text{eff}}(\\lambda) \\cdot L}{m}, \\quad m \\in \\mathbb{Z}^+',
      '\\Delta\\lambda_{\\text{FSR}} = \\dfrac{\\lambda^2}{n_g \\cdot L}',
      'Q = \\dfrac{\\lambda_{\\text{res}}}{\\Delta\\lambda_{\\text{FWHM}}} = \\dfrac{\\pi \\sqrt{r \\cdot t}}{1 - r \\cdot t}',
    ],
    status: 'coming-soon',
  },

  {
    id: 'fdtd-directional-coupler',
    title: 'Project 2',
    type: 'FDTD Simulation',
    cardVisual: 'fdtd',
    cardBadge: '3D FDTD',
    preview: 'Placeholder text',
    description: [
      'A directional coupler is formed when two waveguides run in close proximity: the evanescent tails of their modes overlap, allowing power to tunnel between them. The coupling coefficient depends critically on the gap and interaction length — a relationship that is straightforward analytically for idealised modes, but requires full-wave simulation to capture fabrication-realistic edge effects.',
      'This project uses Tidy3D\'s cloud-accelerated FDTD engine to sweep gap (150–300 nm) and coupling length (5–20 µm) on the Cornerstone 220 nm SOI stack. The simulation extracts S-parameters at both ports, reconstructing the full wavelength-dependent coupling spectrum. Field animations are generated for a selected subset of parameter combinations.',
    ],
    toolstack: ['Tidy3D', 'Lumerical', 'Python'],
    codeSnippet: `import tidy3d as td
import numpy as np

# ── Geometry ────────────────────────────────────────────
WG_WIDTH  = 0.45   # µm
WG_HEIGHT = 0.22   # µm
GAP       = 0.20   # µm  (edge-to-edge)
LENGTH    = 10.0   # µm  coupling length

# ── Materials ───────────────────────────────────────────
si   = td.Medium(permittivity=3.48**2)
sio2 = td.Medium(permittivity=1.44**2)

centre_y_top = (WG_WIDTH + GAP) / 2
centre_y_bot = -(WG_WIDTH + GAP) / 2

wg_top = td.Structure(
    geometry=td.Box(
        center=[0, centre_y_top, WG_HEIGHT / 2],
        size=[LENGTH, WG_WIDTH, WG_HEIGHT],
    ),
    medium=si,
)

wg_bot = td.Structure(
    geometry=td.Box(
        center=[0, centre_y_bot, WG_HEIGHT / 2],
        size=[LENGTH, WG_WIDTH, WG_HEIGHT],
    ),
    medium=si,
)

sim = td.Simulation(
    size=[LENGTH + 4, 3.0, 2.0],
    grid_spec=td.GridSpec.auto(min_steps_per_wvl=20),
    structures=[wg_top, wg_bot],
    sources=[
        td.ModeSource(
            center=[-LENGTH / 2 - 1, centre_y_top, WG_HEIGHT / 2],
            size=[0, 2.0, 1.5],
            source_time=td.GaussianPulse(freq0=1.934e14, fwidth=5e12),
            mode_spec=td.ModeSpec(num_modes=1),
            direction="+",
        )
    ],
    monitors=[
        td.ModeMonitor(
            center=[LENGTH / 2 + 1, centre_y_top, WG_HEIGHT / 2],
            size=[0, 2.0, 1.5],
            freqs=np.linspace(1.88e14, 1.98e14, 100),
            mode_spec=td.ModeSpec(num_modes=1),
            name="thru",
        ),
        td.ModeMonitor(
            center=[LENGTH / 2 + 1, centre_y_bot, WG_HEIGHT / 2],
            size=[0, 2.0, 1.5],
            freqs=np.linspace(1.88e14, 1.98e14, 100),
            mode_spec=td.ModeSpec(num_modes=1),
            name="cross",
        ),
    ],
    run_time=1e-12,
    medium=sio2,
)`,
    imageGallery: [],
    latex: [
      '\\kappa(\\lambda) = \\sin^2\\!\\left(\\frac{\\pi\\,\\Delta n_{\\text{eff}}(\\lambda)\\, L}{\\lambda}\\right)',
      'L_{\\pi} = \\frac{\\lambda}{2\\,\\Delta n_{\\text{eff}}}',
      'T_{\\text{cross}} = \\kappa, \\quad T_{\\text{thru}} = 1 - \\kappa \\quad (\\text{lossless})',
    ],
    status: 'coming-soon',
  },

  {
    id: 'parametric-filter-library',
    title: 'Project 3',
    type: 'Routing Script',
    cardVisual: 'code',
    cardBadge: 'GDSFactory',
    preview: 'Placeholder text',
    description: [
      'High-order optical filters require precise control of coupling between a chain of resonators. Designing and laying out these structures by hand is error-prone and slow; a parametric library that generates both the GDSII geometry and the corresponding circuit model from a single set of arguments is far more practical.',
      'Built for the Axiomatic AI PIC Designer benchmark suite, this library wraps GDSFactory\'s component primitives to produce N-th order coupled-resonator optical waveguide (CROW) filters. Each call returns a DRC-clean GDS component alongside a SAX circuit model, enabling co-optimisation of geometry and spectral response through automatic differentiation.',
    ],
    toolstack: ['GDSFactory', 'Python', 'SAX'],
    codeSnippet: `import gdsfactory as gf
import sax
import jax.numpy as jnp
from typing import Callable

def ring_model(
    wl: float = 1.55,
    radius: float = 10.0,
    gap: float = 0.20,
) -> dict:
    """Analytical SAX model for a single-ring resonator."""
    neff, ng = 2.44, 4.18          # effective / group index (220 nm SOI)
    L   = 2 * jnp.pi * radius      # roundtrip length (µm)
    phi = 2 * jnp.pi * neff * L / wl
    kappa = jnp.sin(jnp.pi * gap / 0.5) * 0.35  # simplified coupling
    t     = jnp.sqrt(1 - kappa**2)
    H_drop = -kappa**2 / (1 - t**2 * jnp.exp(1j * phi))
    return {"in,drop": H_drop, "in,thru": t * (1 - kappa**2 * ... )}


@gf.cell
def crow_filter(
    order: int = 3,
    gaps: list[float] | None = None,
    radius: float = 10.0,
    wg_width: float = 0.45,
) -> gf.Component:
    """
    N-th order CROW filter.

    Args:
        order:    Number of ring resonators.
        gaps:     List of order+1 coupling gaps (bus→ring, ring→ring, ring→bus).
        radius:   Ring radius in µm.
        wg_width: Waveguide width in µm.
    """
    if gaps is None:
        gaps = [0.20] * (order + 1)
    assert len(gaps) == order + 1, "Need order+1 gap values"

    c  = gf.Component()
    xs = gf.cross_section.strip(width=wg_width)

    rings = [
        c << gf.components.ring_single(
            gap=gaps[i],
            radius=radius,
            cross_section=xs,
        )
        for i in range(order)
    ]

    # Space rings and connect bus waveguides
    for i, ring in enumerate(rings):
        ring.xmin = i * (2 * radius + 4.0)

    gf.routing.add_fiber_array(c, with_loopback=False)
    return c


def build_library(
    orders: list[int] = [1, 2, 3, 4],
    radius: float = 10.0,
) -> dict[str, gf.Component]:
    return {
        f"crow_order{n}": crow_filter(order=n, radius=radius)
        for n in orders
    }`,
    imageGallery: [],
    latex: [
      'H_{N}(\\omega) = \\prod_{k=1}^{N} \\frac{-\\kappa_k^2}{1 - t_k^2\\, e^{j\\phi_k}}',
      'BW_{3\\,\\text{dB}} \\propto \\frac{\\kappa}{\\pi} \\cdot \\Delta\\omega_{\\text{FSR}}',
    ],
    status: 'coming-soon',
  },
];
