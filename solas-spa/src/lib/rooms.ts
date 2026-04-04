import { images } from "@/lib/images";

export interface Room {
  slug: string;
  name: string;
  size: string;
  price: string;
  tagline: string;
  description: string;
  images: string[];
  features: string[];
  extendedFeatures: string[];
  highlights: { label: string; detail: string }[];
  bathroom: string;
  bedConfiguration: string;
  maxOccupancy: number;
  checkIn: string;
  checkOut: string;
}

export const rooms: Room[] = [
  {
    slug: "mountain-view-room",
    name: "Mountain View Room",
    size: "450 sq ft",
    price: "From $495 / night",
    tagline: "Where morning light meets the ridgeline",
    description:
      "Wake to the soft drama of Blue Ridge sunrises painting the valley in amber and rose. The Mountain View Room frames the landscape through floor-to-ceiling glass, bringing the outside in while cocooning you in refined comfort. Locally sourced white oak floors, hand-plastered walls, and artisan textiles create a sanctuary rooted in place. Every detail has been considered so the only thing left to do is breathe.",
    images: [images.hotelSuite, images.hotelBed, images.luxuryBath],
    features: [
      "King bed with organic linens",
      "Private balcony with valley views",
      "Rainfall shower, heated floors",
      "Nespresso machine & curated minibar",
    ],
    extendedFeatures: [
      "Matouk Egyptian cotton linens, 600-thread count",
      "Waterworks fixtures throughout",
      "Bang & Olufsen Bluetooth speaker",
      "Nespresso Vertuo machine with locally roasted capsules",
      "Curated minibar with Appalachian craft spirits",
      "Custom white oak millwork by local artisans",
      "Blackout motorized shades with dawn-simulation wake mode",
      "In-room Dyson air purifier with HEPA filtration",
      "Complimentary Solas Apothecary bath amenities",
      "Smart climate control with individual room sensors",
    ],
    highlights: [
      { label: "Sunrise View", detail: "East-facing floor-to-ceiling windows capture the morning glow across the Blue Ridge" },
      { label: "Private Balcony", detail: "Step outside to a furnished stone balcony with uninterrupted valley panorama" },
      { label: "Artisan Touches", detail: "Hand-thrown ceramic accents and original artwork by western NC artists" },
    ],
    bathroom: "Walk-in rainfall shower with dual shower heads, heated stone floors, backlit vanity mirror, and Solas Apothecary organic products",
    bedConfiguration: "One king bed with organic latex mattress topper",
    maxOccupancy: 2,
    checkIn: "4:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "forest-suite",
    name: "Forest Suite",
    size: "700 sq ft",
    price: "From $725 / night",
    tagline: "A private refuge woven into the woodland",
    description:
      "Tucked beneath a canopy of ancient hardwoods, the Forest Suite blurs the line between architecture and nature. A separate living area invites you to slow down with a book beside the wood-burning fireplace, while the bedroom opens onto a private garden terrace fragrant with native wildflowers. The deep soaking tub sits before a picture window, turning an evening bath into a meditation on the forest. This is stillness, elevated.",
    images: [images.hotelBed, images.forestPath, images.luxuryBath],
    features: [
      "King bed & separate living area",
      "Deep soaking tub with forest views",
      "Wood-burning fireplace",
      "Private garden terrace",
    ],
    extendedFeatures: [
      "Frette Italian bed linens, 800-thread count sateen",
      "Restored antique writing desk with leather journal",
      "Wood-burning stone fireplace with complimentary kindling",
      "Bespoke walnut cabinetry by Asheville woodworkers",
      "Separate living room with linen sofa and reading nook",
      "Private garden terrace with native plantings",
      "Waterworks freestanding soaking tub, 72 inches",
      "Bang & Olufsen Beoplay A9 speaker system",
      "Curated library of regional literature and poetry",
      "In-room espresso machine with artisan chocolate pairing",
    ],
    highlights: [
      { label: "Wood Fireplace", detail: "Authentic stone hearth with seasoned local hardwood for cool mountain evenings" },
      { label: "Garden Terrace", detail: "Private outdoor space surrounded by native ferns, mosses, and wildflower plantings" },
      { label: "Soaking Tub", detail: "Freestanding 72-inch tub positioned before a floor-to-ceiling forest window" },
    ],
    bathroom: "Freestanding soaking tub with forest views, separate glass-enclosed walk-in shower, double vanity with Carrara marble, heated floors",
    bedConfiguration: "One king bed with hand-tufted organic mattress",
    maxOccupancy: 2,
    checkIn: "4:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "mountain-suite",
    name: "Mountain Suite",
    size: "850 sq ft",
    price: "From $950 / night",
    tagline: "Panoramic stillness at the edge of the sky",
    description:
      "Perched at the highest point of the property, the Mountain Suite commands a 180-degree sweep of the Great Smokies that shifts with every hour of light. The oversized soaking tub is positioned to frame the ridgeline at sunset, while the wraparound terrace becomes your private observation deck for stargazing. A generous living area with fireplace anchors the space, making this suite ideal for those who want room to unfold. The Mountain Suite is not just a room — it is a vantage point.",
    images: [images.luxuryBath, images.hotelSuite, images.mountainSunrise],
    features: [
      "Panoramic 180-degree valley views",
      "Oversized soaking tub & walk-in shower",
      "Living area with fireplace",
      "Private wraparound terrace",
    ],
    extendedFeatures: [
      "Sferra Brothers Egyptian cotton linens, 1,020-thread count",
      "Wraparound terrace with teak loungers and dining for two",
      "Gas fireplace with hand-laid river stone surround",
      "Oversized freestanding copper soaking tub",
      "Walk-in shower with body jets and rain head",
      "Motorized floor-to-ceiling glass walls on three sides",
      "Bose home sound system with vinyl turntable",
      "Telescope for stargazing from the terrace",
      "Private bar with premium spirits and local wines",
      "Original oil paintings by Blue Ridge plein-air artists",
    ],
    highlights: [
      { label: "180° Panorama", detail: "Uninterrupted views of the Great Smokies from sunrise to the Milky Way" },
      { label: "Wraparound Terrace", detail: "Private outdoor living space with teak furniture and sunset dining" },
      { label: "Copper Soaking Tub", detail: "Hand-hammered oversized tub positioned before the panoramic view" },
    ],
    bathroom: "Hand-hammered copper freestanding soaking tub, separate walk-in shower with six body jets and rain head, heated Carrara marble floors, double vanity",
    bedConfiguration: "One California king bed with pillow-top organic mattress",
    maxOccupancy: 2,
    checkIn: "4:00 PM",
    checkOut: "12:00 PM",
  },
  {
    slug: "canopy-treehouse",
    name: "Canopy Treehouse",
    size: "620 sq ft",
    price: "From $1,200 / night",
    tagline: "Sleep among giants, dream without gravity",
    description:
      "Suspended thirty-five feet above the forest floor among ancient white oaks, the Canopy Treehouse is an engineering marvel wrapped in enchantment. A private rope bridge leads you to a space where glass floor panels reveal the canopy below and a retractable roof opens to the stars above. The outdoor rain shower lets you bathe in dappled sunlight, and at night the forest symphony becomes your only soundtrack. This is the childhood dream you never outgrew, realized with uncompromising luxury.",
    images: [images.treehouse, images.forestSunrays, images.forestMist],
    features: [
      "Suspended 35 feet among ancient oaks",
      "Glass floor panels & retractable roof",
      "Outdoor rain shower",
      "Private rope bridge entrance",
    ],
    extendedFeatures: [
      "Coyuchi organic cotton and wool bedding",
      "Structural glass floor panels over forest canopy",
      "Motorized retractable roof for open-sky sleeping",
      "Private rope bridge entrance with lantern lighting",
      "Outdoor rain shower with heated stone platform",
      "Custom rope-and-timber furniture by Appalachian craftsmen",
      "Integrated bird-watching station with field guide library",
      "Handwoven hammock on private observation deck",
      "Wireless charging surfaces built into live-edge nightstands",
      "Radiant floor heating powered by geothermal system",
    ],
    highlights: [
      { label: "Glass Floor Panels", detail: "Tempered structural glass reveals the living canopy thirty-five feet below" },
      { label: "Retractable Roof", detail: "Motorized ceiling opens completely for sleeping beneath the stars" },
      { label: "Rope Bridge Entrance", detail: "A lantern-lit suspension bridge makes every arrival an experience" },
    ],
    bathroom: "Open-air rain shower on heated stone platform, composting toilet with luxury finish, hand-carved stone basin vanity, organic Solas Apothecary products",
    bedConfiguration: "One queen bed with organic wool-and-cotton mattress, plus daybed",
    maxOccupancy: 2,
    checkIn: "4:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "creekside-cottage",
    name: "Creekside Cottage",
    size: "1,100 sq ft",
    price: "From $1,450 / night",
    tagline: "Where the water sings you to sleep",
    description:
      "Set just thirty feet from a mountain creek, this standalone cottage offers the privacy of a home with the service of a five-star resort. Two bedrooms make it ideal for families or friends traveling together, while the full kitchen invites leisurely mornings of cooking with farm-sourced ingredients. Step outside to your private hot spring-fed soaking pool, light the firepit as evening falls, and let the sound of rushing water become the rhythm of your days. The Creekside Cottage is where time forgets to hurry.",
    images: [images.cabin, images.cottageInterior, images.hotSpring],
    features: [
      "Private hot spring-fed soaking pool",
      "Two bedrooms, full kitchen",
      "Outdoor rain shower & firepit",
      "30 feet from mountain creek",
    ],
    extendedFeatures: [
      "Matouk percale linens in both bedrooms, 600-thread count",
      "Private hot spring-fed soaking pool with stone surround",
      "Full gourmet kitchen with Wolf range and Sub-Zero refrigerator",
      "Outdoor stone firepit with Adirondack seating for six",
      "Outdoor rain shower enclosed by river birch grove",
      "Covered porch with rocking chairs overlooking the creek",
      "Sonos whole-home audio system",
      "Stacked stone wood-burning fireplace in living room",
      "Washer and dryer concealed in custom cabinetry",
      "Welcome hamper of local preserves, bread, and seasonal fruit",
    ],
    highlights: [
      { label: "Hot Spring Pool", detail: "Natural mineral water piped to a private stone-lined soaking pool on the deck" },
      { label: "Creekside Setting", detail: "Fall asleep to the sound of rushing mountain water just thirty feet away" },
      { label: "Outdoor Firepit", detail: "Gather around a stone hearth beneath the stars with complimentary s'mores kit" },
    ],
    bathroom: "Primary: freestanding soaking tub, walk-in shower, double vanity. Second: walk-in shower with bench, single vanity. Both with heated floors",
    bedConfiguration: "Primary: one king bed. Second bedroom: two queen beds",
    maxOccupancy: 6,
    checkIn: "4:00 PM",
    checkOut: "11:00 AM",
  },
  {
    slug: "the-summit-residence",
    name: "The Summit Residence",
    size: "2,400 sq ft",
    price: "From $3,200 / night",
    tagline: "The pinnacle of mountain living, without compromise",
    description:
      "Our most expansive accommodation crowns the ridge with three bedrooms, each with its own en-suite bath, and a great room designed for gathering. The full gourmet kitchen and dining table for eight make entertaining effortless, while the private infinity pool appears to pour directly into the valley below. A dedicated butler anticipates every need, from pre-arrival provisioning to arranging private excursions. The Summit Residence is not merely a place to stay — it is a destination unto itself.",
    images: [images.cottageInterior, images.hotelSuite, images.spaPool],
    features: [
      "Three bedrooms, each with en-suite bath",
      "Full gourmet kitchen & dining for 8",
      "Private infinity pool overlooking valley",
      "Dedicated butler service",
    ],
    extendedFeatures: [
      "Sferra Brothers linens in all three bedrooms, 1,020-thread count",
      "Private heated infinity pool with automated cover",
      "Full gourmet kitchen: La Cornue range, Miele dishwasher, wine fridge",
      "Dining room with live-edge walnut table seating eight",
      "Dedicated butler and daily housekeeping, twice daily",
      "Home theater with 85-inch screen and Dolby Atmos surround",
      "Private wine cellar stocked with sommelier selections",
      "Outdoor kitchen with built-in grill and pizza oven",
      "Three-car heated garage with EV charging",
      "Private helipad for charter arrivals",
    ],
    highlights: [
      { label: "Infinity Pool", detail: "Heated vanishing-edge pool appears to merge with the valley a thousand feet below" },
      { label: "Butler Service", detail: "A dedicated professional anticipates every need from arrival to departure" },
      { label: "Home Theater", detail: "85-inch cinema with Dolby Atmos surround and curated film library" },
    ],
    bathroom: "Primary: freestanding Victoria + Albert soaking tub, dual rain showers, heated marble floors, TV mirror. Two additional en-suites with walk-in showers and soaking tubs",
    bedConfiguration: "Primary: one king bed. Second: one king bed. Third: two queen beds",
    maxOccupancy: 8,
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
  },
];
