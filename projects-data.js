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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    toolstack: ['GDSFactory', 'KLayout', 'Cornerstone PDK'],
    codeSnippet: `import gdsfactory as gf

@gf.cell
def straight_waveguide(
    length: float = 10.0,
    width: float = 0.45,
) -> gf.Component:
    """Placeholder — straight waveguide on 220 nm SOI."""
    c = gf.Component()

    wg = c << gf.components.straight(
        length=length,
        cross_section=gf.cross_section.strip(width=width),
    )

    c.add_ports(wg.get_ports_list())
    return c


if __name__ == "__main__":
    c = straight_waveguide()
    c.show()
    c.write_gds("straight_wg.gds")`,
    imageGallery: [],
    latex: ['x = y'],
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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    toolstack: ['Tidy3D', 'Lumerical', 'Python'],
    codeSnippet: `import gdsfactory as gf

@gf.cell
def straight_waveguide(
    length: float = 10.0,
    width: float = 0.45,
) -> gf.Component:
    """Placeholder — straight waveguide on 220 nm SOI."""
    c = gf.Component()

    wg = c << gf.components.straight(
        length=length,
        cross_section=gf.cross_section.strip(width=width),
    )

    c.add_ports(wg.get_ports_list())
    return c


if __name__ == "__main__":
    c = straight_waveguide()
    c.show()
    c.write_gds("straight_wg.gds")`,
    imageGallery: [],
    latex: ['x = y'],
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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    toolstack: ['GDSFactory', 'Python', 'SAX'],
    codeSnippet: `import gdsfactory as gf

@gf.cell
def straight_waveguide(
    length: float = 10.0,
    width: float = 0.45,
) -> gf.Component:
    """Placeholder — straight waveguide on 220 nm SOI."""
    c = gf.Component()

    wg = c << gf.components.straight(
        length=length,
        cross_section=gf.cross_section.strip(width=width),
    )

    c.add_ports(wg.get_ports_list())
    return c


if __name__ == "__main__":
    c = straight_waveguide()
    c.show()
    c.write_gds("straight_wg.gds")`,
    imageGallery: [],
    latex: ['x = y'],
    status: 'coming-soon',
  },
];
