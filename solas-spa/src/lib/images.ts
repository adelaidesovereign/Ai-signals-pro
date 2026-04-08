// Unsplash image URLs for Solas Spa
// All images are free to use under the Unsplash License
// Format: https://images.unsplash.com/photo-{ID}?w={width}&h={height}&fit=crop&q=80

export const images = {
  // Hero & Landscape
  hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80",
  mountainMist: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop&q=80",
  blueRidge: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=1080&fit=crop&q=80",
  mountainSunrise: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop&q=80",

  // Forest & Nature
  forestMist: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&h=1080&fit=crop&q=80",
  forestSunrays: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&q=80",
  forestPath: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1400&h=900&fit=crop&q=80",
  autumnForest: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&h=900&fit=crop&q=80",

  // Spa & Wellness
  spaStones: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1400&h=900&fit=crop&q=80",
  spaTreatment: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&h=900&fit=crop&q=80",
  spaPool: "https://images.unsplash.com/photo-1540555700478-4be289fbec6a?w=1400&h=900&fit=crop&q=80",
  meditation: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1400&h=900&fit=crop&q=80",
  hotSpring: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=1400&h=900&fit=crop&q=80",

  // Dining
  fineDining: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=1750&fit=crop&q=80",
  platedFood: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=900&fit=crop&q=80",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&h=900&fit=crop&q=80",
  cocktail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1400&h=900&fit=crop&q=80",
  breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1400&h=900&fit=crop&q=80",

  // Accommodations
  hotelSuite: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&h=1750&fit=crop&q=80",
  hotelBed: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&h=1750&fit=crop&q=80",
  treehouse: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&h=1750&fit=crop&q=80",
  cabin: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1400&h=1750&fit=crop&q=80",
  cottageInterior: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1400&h=1750&fit=crop&q=80",
  luxuryBath: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&h=1750&fit=crop&q=80",

  // Experiences
  hiking: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&h=900&fit=crop&q=80",
  waterfall: "https://images.unsplash.com/photo-1467890947394-8171244e5410?w=1400&h=900&fit=crop&q=80",
  stargazing: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&h=900&fit=crop&q=80",
  pottery: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&h=900&fit=crop&q=80",
  cycling: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1400&h=900&fit=crop&q=80",
  kayaking: "https://images.unsplash.com/photo-1472745433479-4556f22e32c2?w=1400&h=900&fit=crop&q=80",

  // People / Team
  portrait1: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&q=80",
  portrait2: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&q=80",
  portrait3: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=1000&fit=crop&q=80",
  portrait4: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&h=1000&fit=crop&q=80",
  portrait5: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=80",
} as const;

export type ImageKey = keyof typeof images;
