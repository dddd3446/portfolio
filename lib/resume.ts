export type EducationEntry = {
  title: string;
  org: string;
  period: string;
  description: string;
};

export const INTRO = {
  heading: "I AM CHAI GAI FOON",
  body: "I was born on November 25, 2006, and I studied in Johor to become a qualified designer. My ideal is that designs should be practical.",
};

export const EDUCATION: EducationEntry[] = [
  {
    title: "Secondary school",
    org: "SMK Taman Pelangi Indah",
    period: "2020 - 2025",
    description: "I spent my secondary school years until I graduated with my SPM.",
  },
  {
    title: "Diploma In Multimedia Design",
    org: "Southern University College",
    period: "2025 - 2027",
    description:
      "This is the university where I am studying multimedia design. I learned a lot of computer design software and skills from here.",
  },
];

export type SkillGroup = {
  heading: string;
  /** Width of the rule under the heading, straight from the Figma frame. */
  ruleWidth: number;
  items: string[];
};

export const SKILL_GROUPS: Record<"design" | "development" | "language" | "hobbies", SkillGroup> = {
  design: {
    heading: "My Skills",
    ruleWidth: 33,
    items: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Adobe Animation",
      "Adobe Audio",
      "Autodesk Maya",
      "Figma",
      "Blender",
      "Spline",
      "Godot",
    ],
  },
  development: {
    heading: "Development Skills",
    ruleWidth: 30,
    items: ["VS Code", "Node.js", "CodeSandbox.io", "Git", "GitHub", "Vercel", "Firebase"],
  },
  language: {
    heading: "Language",
    ruleWidth: 24,
    items: ["Chinese", "English", "Malay", "Cantonese"],
  },
  hobbies: {
    heading: "Hobbies",
    ruleWidth: 31,
    items: ["Music", "Reading", "Cycling", "Running"],
  },
};
