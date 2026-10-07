// src/data/celestialTargets.js

export const ISRO_CELESTIAL_TARGETS = {
  // =====================================================
  // SUN
  // =====================================================

  sun: {
    id: "sun",
    name: "The Sun (Sol)",
    isroMission: "Aditya-L1",
    category: "Stars",
    mass: "1.989 × 10³⁰ kg (1 Solar Mass)",
    distance: "0.0000158 Light-Years from Earth (1 AU)",
    description:
      "Primary target of ISRO's Aditya-L1 halo orbit mission studying coronal mass ejections, solar dynamics, and space weather.",
    color: "#ffaa00",
    position: [-18, 5, -10]
  },

  // =====================================================
  // MERCURY
  // =====================================================

  mercury: {
    id: "mercury",
    name: "Mercury",
    isroMission: "No dedicated ISRO mission",
    category: "Planets",
    mass: "3.301 × 10²³ kg",
    distance: "77 million km average from Earth",
    description:
      "The smallest and innermost planet of the Solar System. Mercury has an extreme temperature range and a heavily cratered surface.",
    color: "#8c8c8c",
    position: [-12, 1, -5]
  },

  // =====================================================
  // VENUS
  // =====================================================

  venus: {
    id: "venus",
    name: "Venus",
    isroMission: "Shukrayaan-1 (Planned)",
    category: "Planets",
    mass: "4.867 × 10²⁴ kg",
    distance: "41 million km at closest approach to Earth",
    description:
      "Earth's closest planetary neighbour and the hottest planet in the Solar System. ISRO's planned Shukrayaan-1 mission will study Venus's atmosphere, surface and geological processes.",
    color: "#d9a441",
    position: [-7, -1, 2]
  },

  // =====================================================
  // EARTH
  // =====================================================

  earth: {
    id: "earth",
    name: "Earth",
    isroMission: "Earth Observation Missions",
    category: "Planets",
    mass: "5.972 × 10²⁴ kg",
    distance: "1 AU from the Sun",
    description:
      "Our home planet and the only known world supporting life. ISRO operates numerous Earth-observation missions studying climate, oceans, land, atmosphere and natural resources.",
    color: "#2878c8",
    position: [0, 1, 7]
  },

  // =====================================================
  // MOON
  // =====================================================

  moon: {
    id: "moon",
    name: "The Moon (Lunar South Pole)",
    isroMission: "Chandrayaan-3 (Statio Shiv Shakti)",
    category: "Planets/Satellites",
    mass: "7.342 × 10²² kg",
    distance: "384,400 km from Earth",
    description:
      "Historic ISRO landing site near 69.36°S. Investigated by the Pragyan rover for water ice, seismic activity, and lunar soil composition.",
    color: "#cccccc",
    position: [2, 2, 9]
  },

  // =====================================================
  // MARS
  // =====================================================

  mars: {
    id: "mars",
    name: "Mars (Red Planet)",
    isroMission: "Mars Orbiter Mission (Mangalyaan)",
    category: "Planets",
    mass: "6.417 × 10²³ kg",
    distance: "0.52 AU to 2.52 AU from Earth",
    description:
      "Explored by India's first interplanetary mission in 2014. The Mars Orbiter Mission studied the Martian surface, atmosphere and mineral composition while demonstrating deep-space technologies.",
    color: "#ff4500",
    position: [10, -2, 12]
  },

  // =====================================================
  // JUPITER
  // =====================================================

  jupiter: {
    id: "jupiter",
    name: "Jupiter",
    isroMission: "No dedicated ISRO mission",
    category: "Planets",
    mass: "1.898 × 10²⁷ kg",
    distance: "628.7 million km average from Earth",
    description:
      "The largest planet in the Solar System. Jupiter is a massive gas giant dominated by hydrogen and helium and is famous for its Great Red Spot and extensive family of moons.",
    color: "#c99b6b",
    position: [20, 3, 8]
  },

  // =====================================================
  // SATURN
  // =====================================================

  saturn: {
    id: "saturn",
    name: "Saturn",
    isroMission: "No dedicated ISRO mission",
    category: "Planets",
    mass: "5.683 × 10²⁶ kg",
    distance: "1.28 billion km average from Earth",
    description:
      "The second-largest planet in the Solar System, famous for its spectacular system of icy rings. Saturn is a gas giant composed primarily of hydrogen and helium.",
    color: "#d8b878",
    position: [30, -2, 2]
  },

  // =====================================================
  // URANUS
  // =====================================================

  uranus: {
    id: "uranus",
    name: "Uranus",
    isroMission: "No dedicated ISRO mission",
    category: "Planets",
    mass: "8.681 × 10²⁵ kg",
    distance: "2.72 billion km average from Earth",
    description:
      "An ice giant with a distinctive blue-green appearance caused by methane in its atmosphere. Uranus rotates on its side with an extreme axial tilt of approximately 98 degrees.",
    color: "#7dd3df",
    position: [38, 6, -10]
  },

  // =====================================================
  // NEPTUNE
  // =====================================================

  neptune: {
    id: "neptune",
    name: "Neptune",
    isroMission: "No dedicated ISRO mission",
    category: "Planets",
    mass: "1.024 × 10²⁶ kg",
    distance: "4.35 billion km average from Earth",
    description:
      "The outermost major planet of the Solar System. Neptune is a deep-blue ice giant known for extremely powerful winds and its large moon Triton.",
    color: "#4169e1",
    position: [45, -4, -20]
  },

  // =====================================================
  // BLACK HOLES
  // =====================================================

  sagittariusA: {
    id: "sagittariusA",
    name: "Sagittarius A*",
    isroMission: "AstroSat / XPoSat X-Ray Observation",
    category: "BlackHoles",
    mass: "4.15 × 10⁶ Solar Masses",
    distance: "26,600 Light-Years (Galactic Center)",
    description:
      "Supermassive black hole at the heart of the Milky Way Galaxy. It provides a unique laboratory for studying extreme gravity and high-energy astrophysical processes.",
    color: "#00f0ff",
    position: [0, 0, 0]
  },

  cygnusX1: {
    id: "cygnusX1",
    name: "Cygnus X-1",
    isroMission: "XPoSat (X-ray Polarimeter Satellite)",
    category: "BlackHoles",
    mass: "21.2 Solar Masses",
    distance: "7,200 Light-Years",
    description:
      "A stellar-mass black hole in a high-mass X-ray binary system. X-ray observations provide important information about accretion, relativistic effects and high-energy radiation.",
    color: "#a020f0",
    position: [-35, 12, -18]
  }
};