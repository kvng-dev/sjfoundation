import {
  LuBaby,
  LuFlower2,
  LuGraduationCap,
  LuHeartHandshake,
  LuSparkles,
  LuMapPin,
  LuHandshake,
  LuUsers,
  LuHeart,
} from "react-icons/lu";

import story1 from "../assets/IMG_3209.JPG.jpeg";
import story2 from "../assets/IMG_3207.JPG.jpeg";
import story3 from "../assets/IMG-20260707-WA0031.jpg";

import planetLogo from "../assets/logos/planet.jpeg";
import infusionLogo from "../assets/logos/infusion.png";
import freshfixLogo from "../assets/logos/freshfix.jpeg";
import ideyhLogo from "../assets/logos/ideyh.jpeg";
import faanLogo from "../assets/logos/faan.jpeg";
import lagoshomeLogo from "../assets/logos/lagoshome.jpeg";
import metroLogo from "../assets/logos/metro.jpeg";
import ravenshrLogo from "../assets/logos/ravenshr.jpeg";
import hobLogo from "../assets/logos/hob.jpeg";
import runalpha from "../assets/logos/runalpha.png";

// Nav links point at sections on the landing page for now.
// Swap each href for a real route (e.g. "/about") once those pages exist.
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Christmas in the Streets", href: "/christmas-in-the-streets" },
  { label: "Project 1,000 Smiles", href: "/project-1000-smiles" },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
];

export const heroStats = [
  { value: "1,200+", label: "Children Reached" },
  { value: "250+", label: "Women Reached" },
  { value: "10,000", label: "Smiles We're Building Towards" },
  { value: "1", label: "Community at a Time" },
];

export const impactStats = [
  { value: "1.2k+", label: "Children Reached", icon: LuBaby },
  { value: "184+", label: "Women Reached", icon: LuFlower2 },
  { value: "10,000", label: "Smiles We're Building Towards", icon: LuSparkles },
  { value: "1", label: "Community at a Time", icon: LuMapPin },
];

export const focusAreas = [
  {
    title: "Child Welfare",
    text: "Creating safer, brighter futures for children.",
    icon: LuBaby,
  },
  {
    title: "Women Empowerment",
    text: "Supporting mothers and women to build stronger households and communities.",
    icon: LuFlower2,
  },
  {
    title: "Youth Development",
    text: "Creating pathways for young people to learn, grow and pursue opportunities.",
    icon: LuGraduationCap,
  },
  {
    title: "Community Outreach",
    text: "Responding to practical needs while building stronger community relationships.",
    icon: LuHeartHandshake,
  },
];

export const involveOptions = [
  {
    title: "Partner",
    text: "Work with us to create meaningful impact.",
    cta: "Learn More",
    href: "#contact",
    icon: LuHandshake,
  },
  {
    title: "Volunteer",
    text: "Share your time, skills and compassion.",
    cta: "Join Us",
    href: "#contact",
    icon: LuUsers,
  },
  {
    title: "Donate",
    text: "Your support helps us reach more children, mothers and communities.",
    cta: "Give Today",
    href: "#donate",
    icon: LuHeart,
  },
];

export const beneficiaryStories = [
  {
    name: "esther",
    text: "Five-year-old Esther attended Christmas in the Street. She enjoyed the games and activities. Upon receiving her gifts she said this the happiest day of her life.",
    image: story1,
    alt: "Esther",
  },
  {
    name: "amina",
    text: "Ten-year-old Amina attended Christmas in the Street for the first time. She said she didn't know Christmas could be this fun and wishes every Christmas could be like this",
    image: story2,
    alt: "Amina",
  },
  {
    name: "zainab",
    text: "Six-year-old Zainab arrived at Christmas in the Street shy and reserved, but by the end of the day she was laughing with new friends, proudly holding her gifts.",
    image: story3,
    alt: "Zainab",
  },
];

export const stories = [
  {
    title: "A Brighter Tomorrow",
    text: "How education is changing lives in our communities.",
    image: story1,
    alt: "A smiling girl in a red top",
    href: "#stories",
  },
  {
    title: "Stronger Together",
    text: "The power of support, from mothers to mothers.",
    image: story2,
    alt: "A mother and daughter smiling together",
    href: "#stories",
  },
  {
    title: "Building Opportunities",
    text: "Youth development creates new possibilities.",
    image: story3,
    alt: "A group of young people smiling in orange and yellow",
    href: "#stories",
  },
];

// Add a `logo` (imported image) to any partner to show their official logo.
// Without one, the partner name is shown as a text placeholder.

export const partners = [
  { name: "Planet", logo: planetLogo },
  { name: "Infusion", logo: infusionLogo },
  { name: "Fresh Fix", logo: freshfixLogo },
  { name: "I dey H", logo: ideyhLogo },
  { name: "FAAN", logo: faanLogo },
  { name: "Lagos Home", logo: lagoshomeLogo },
  { name: "Metroeyes", logo: metroLogo },
  { name: "RavensHR", logo: ravenshrLogo },
  { name: "HOB", logo: hobLogo },
  { name: "RunAlpha", logo: runalpha },
];

export const footerLinks = [
  { label: "About Us", href: "#about" },
  { label: "Christmas on the Street", href: "#focus" },
  { label: "Project 1,000 Smiles", href: "#project" },
  { label: "Impact", href: "#impact" },
  { label: "Get Involved", href: "#get-involved" },
  { label: "Contact", href: "#contact" },
];

export const contact = {
  phone: "+234 707 005 6736",
  phoneHref: "tel:+2347070056736",
  email: "info@sanusijafarfoundation.org",
  location: "Lagos, Nigeria",
};

// Replace the "#" placeholders with the foundation's real profile URLs.
export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sanusijafarfoundation?stkn=MXdzY2s2anQ0MDMzNw%3D%3D&utm_source=qr",
    key: "instagram",
  },
  { label: "LinkedIn", href: "#", key: "linkedin" },
  { label: "Facebook", href: "#", key: "facebook" },
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/@sanusijafarfoundation?_r=1&_t=ZS-9A05NRww5c9",
    key: "tiktok",
  },
];
