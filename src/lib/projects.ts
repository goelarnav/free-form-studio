import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import materials from "@/assets/materials.jpg";
import hero from "@/assets/hero.jpg";

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: "Residential" | "Commercial";
  location: string;
  year: string;
  scope: string;
  cover: string;
  intro: string;
  body: string[];
  gallery: { src: string; caption: string; tall?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "bayfront-residence",
    index: "01",
    title: "Bayfront Residence",
    category: "Residential",
    location: "Edgewater, Miami",
    year: "2025",
    scope: "Full house design · Turnkey",
    cover: hero,
    intro:
      "A waterfront apartment reconsidered as one continuous, light-washed room — quiet materials, long sightlines, and furniture arranged around the horizon.",
    body: [
      "Placeholder narrative. The brief asked for a home that could hold both stillness and gathering. We opened the plan toward the bay, lowered the datum of the joinery, and let travertine run uninterrupted from entry to terrace.",
      "Oak battens temper the western light; linen, boucle and unlacquered brass carry the warmth. Every specification was chosen for how it would age rather than how it would photograph.",
    ],
    gallery: [
      { src: hero, caption: "Living room, looking west" },
      { src: project3, caption: "Principal bedroom", tall: true },
      { src: materials, caption: "Material study" },
    ],
  },
  {
    slug: "coral-way-house",
    index: "02",
    title: "Coral Way House",
    category: "Residential",
    location: "Coral Gables, Miami",
    year: "2024",
    scope: "Interior design · Custom kitchen",
    cover: project2,
    intro:
      "A 1940s house returned to its proportions, with a kitchen conceived as the calm centre of family life.",
    body: [
      "Placeholder narrative. Existing partitions were removed to recover the original enfilade, and new millwork was drawn to the height of the door casings so the architecture reads as one piece.",
      "The palette holds to limestone, pale oak and chalk plaster — restrained enough to disappear behind daily use.",
    ],
    gallery: [
      { src: project2, caption: "Kitchen and island" },
      { src: project1, caption: "Entry arch", tall: true },
      { src: materials, caption: "Stone and oak" },
    ],
  },
  {
    slug: "north-bay-pied-a-terre",
    index: "03",
    title: "North Bay Pied-à-Terre",
    category: "Residential",
    location: "North Bay Village",
    year: "2024",
    scope: "Space planning · Furniture shopping",
    cover: project1,
    intro: "A compact residence resolved through proportion, shadow and a single warm register of colour.",
    body: [
      "Placeholder narrative. Curved plaster reveals soften the circulation, and each opening was framed to borrow light from the room beyond.",
      "Furniture was sourced slowly, over a season, with an emphasis on hand-made and vintage pieces.",
    ],
    gallery: [
      { src: project1, caption: "Hallway" },
      { src: project3, caption: "Bedroom", tall: true },
      { src: hero, caption: "Living area" },
    ],
  },
  {
    slug: "design-district-lounge",
    index: "04",
    title: "Design District Lounge",
    category: "Commercial",
    location: "Miami Design District",
    year: "2025",
    scope: "New construction · Turnkey interior",
    cover: project4,
    intro:
      "A hospitality interior built around one curved banquette — hushed, tactile, and legible from the street.",
    body: [
      "Placeholder narrative. The plan sets a soft island of seating against a long service wall, so the room reads as generous even at capacity.",
      "Plaster, travertine and dark-stained timber were detailed to weather visibly over time.",
    ],
    gallery: [
      { src: project4, caption: "Banquette" },
      { src: project1, caption: "Threshold", tall: true },
      { src: materials, caption: "Finish palette" },
    ],
  },
  {
    slug: "brickell-workplace",
    index: "05",
    title: "Brickell Workplace",
    category: "Commercial",
    location: "Brickell, Miami",
    year: "2023",
    scope: "Consultation · Interior design",
    cover: project3,
    intro: "A private office suite designed with the softness of a residence and the discipline of a workplace.",
    body: [
      "Placeholder narrative. Acoustic linen, warm task lighting and a restrained joinery system replace conventional office language.",
      "Meeting rooms are treated as rooms in a house — each with its own light and material character.",
    ],
    gallery: [
      { src: project3, caption: "Quiet room" },
      { src: project2, caption: "Pantry", tall: true },
      { src: project4, caption: "Lounge" },
    ],
  },
];

export const services = [
  { n: "01", name: "Space planning", note: "Plan studies, circulation and proportion set before anything is specified." },
  { n: "02", name: "Consultation", note: "Focused sessions for clients who need direction rather than a full engagement." },
  { n: "03", name: "Interior design", note: "Concept, detailing, specification and site coordination through completion." },
  { n: "04", name: "Full house design", note: "A whole-home scheme resolved as one continuous material argument." },
  { n: "05", name: "Turnkey interior service", note: "Delivered, installed and styled — the door opens on a finished home." },
  { n: "06", name: "Custom kitchen & bathroom", note: "Bespoke joinery, stone and fittings drawn to the millimetre." },
  { n: "07", name: "New construction", note: "Interior architecture coordinated with the build team from the first drawing." },
  { n: "08", name: "Furniture shopping", note: "Sourcing, procurement and placement, including vintage and commissioned work." },
];

export const processSteps = [
  { n: "I", title: "Enquiry & fit", copy: "A conversation about the site, the brief and how you intend to live in it." },
  { n: "II", title: "Concept", copy: "Spatial studies, reference imagery and a first material direction." },
  { n: "III", title: "Development", copy: "Drawings, joinery detail, lighting and full specification." },
  { n: "IV", title: "Execution", copy: "Procurement, site coordination and construction oversight." },
  { n: "V", title: "Reveal", copy: "Installation, styling and handover of the completed interior." },
];