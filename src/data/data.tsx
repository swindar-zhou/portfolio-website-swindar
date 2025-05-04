import {IconHome, IconUser, IconMessage, IconBrandGithub, IconWorld} from "@tabler/icons-react"

export const experienceData = [
  {
    image: "/saic_logo.png",
    company: "SAIC",
    role: "Software Engineer Intern | Team Lead",
    date: "Feb 2020 - Jun 2021",
    description:
      "Hello asdfasdf a Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam itaque obcaecati, odio blanditiis ullam iste tempora commodi quidem ea incidunt, sint officia voluptatum accusantium, dolorem sunt expedita veritatis atque. Amet?",
    location: "Hanscom Air Force Base, MA",
    skills: ["Microsoft Azure", "Powershell", "Azure DevOps", "CI/CD"],
  },
  {
    image: "/orbitahealth_logo.jpeg",
    company: "Orbita",
    role: "Software Engineer Intern",
    date: "Feb 2020 - Jun 2021",
    description:
      "Hello asdfasdf a Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam itaque obcaecati, odio blanditiis ullam iste tempora commodi quidem ea incidunt, sint officia voluptatum accusantium, dolorem sunt expedita veritatis atque. Amet?",
    location: "Boston, MA",
    skills: ["HTML", "CSS", "Angular", "Node.js", "Express", "MongoDB" , "TypeScript"],

  },
  {
    image: "/umasslowell_logo.jpg",
    company: "University of Massachusetts Lowell",
    role: "Resident Advisor",
    date: "Feb 2020 - Jun 2021",
    description:
      "Hello asdfasdf a Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam itaque obcaecati, odio blanditiis ullam iste tempora commodi quidem ea incidunt, sint officia voluptatum accusantium, dolorem sunt expedita veritatis atque. Amet?",
    location: "Lowell, MA",
    skills: ["Leadership", "Conflict Resolution", "Event Planning"],
  },
];

export const projectData = [
  {
    title: "Bread Box | Personal Finance Analytics Dashboard",
    href: "asdfasdfds",
    dates: "Feb 2024 - May 2024",
    active: false,
    type: "Web Application",
    technologies: [ "React", "Javascript", "HTML", "TailwindCSS", "Plaid", "MUI", "MongoDB", "NodeJS", "express"],
    description: "AI integrated personal financial dashboard enabling users to connect multiple accounts and analyze their entire financial landscape.",
    video: "/bread_box.mp4",
    links: [
      {
        type: "Source",
        href: "https://github.com",
        icon: <IconBrandGithub className="size-3" />,
      },
    ],
    github: "github.link",
  },
  {
    title: "SeedPlanter | Gardening Assistant",
    href: "asdfasdfds",
    dates: "Feb 2024 - May 2024",
    active: false,
    type: "Mobile Application",
    technologies: [ "React Native", "Javascript", "Expo", "PerenualAPI", "MongoDB", "NodeJS", "Express"],
    description: "A unified solution for planters to journal, garden, track planting schedules, and learn about gardening using an AI chatbot.",
    video: "/SeedPlanter.mp4",
    links: [
      {
        type: "Source",
        href: "https://github.com",
        icon: <IconBrandGithub className="size-3" />,
      },
    ],
    },
  {
    title: "Cyfra | Secure Messaging Platform",
    href: "asdfasdfds",
    dates: "Feb 2024 - May 2024",
    active: false,
    type: "Mobile and Desktop App",
    technologies: [ "Vue", "Typescript", "HTML", "TailwindCSS", "Tauri", "Rust", "SQL"],
    description: "Decentralized communication platform with e2e encryption, ensuring user privacy without third party interference.",
    image: "/cyfra.jpg",
    links: [
      {
        type: "Source",
        href: "https://github.com",
        icon: <IconBrandGithub className="size-3" />,
      },
      {
        type: "Article",
        href: "https://github.com",
        icon: <IconWorld className="size-3" />,
      },
    ],
  },
]

export const contactData = [
    {
        email: "shivypat02@gmail.com",
        github: "https",
        linkedIn: "adfa",
        instagram: "instagram"
    }
]

export const navData = [
  {
    name: "Experience",
    link: "experience",
    icon: <IconHome className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
  },
  {
    name: "Dashboard",
    link: "dashboard",
    icon: <IconUser className="subpixel-antialiased h-5 w-5 text-zinc-500 dark:text-zinc-300 hover:text-zinc-950 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
  },
  {
    name: "Projects",
    link: "/projects",
    icon: <IconMessage className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />

  },
];