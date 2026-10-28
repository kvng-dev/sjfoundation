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
  LuLinkedin,
} from "react-icons/lu";

import story1 from "../assets/IMG_3209.JPG.jpeg";
import story2 from "../assets/IMG-20260923-WA0092.jpg";
import story3 from "../assets/IMG-20260923-WA0089.jpg";

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
import sevenLogo from "../assets/logos/24Seven.png";
import chiefolu from "../assets/logos/chiefolu.jpeg";
import techarthon from "../assets/logos/techarthon.jpeg";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

// Nav links point at sections on the landing page for now.
// Swap each href for a real route (e.g. "/about") once those pages exist.
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const heroStats = [
  { value: "1,354+", label: "Children Reached" },
  { value: "273+", label: "Women Reached" },
  { value: "3", label: "Editions of Christmas in the Street" },
];

export const impactStats = [
  { value: "1,354+", label: "Children Reached", icon: LuBaby },
  { value: "273+", label: "Women Reached", icon: LuFlower2 },
  { value: "1,000", label: "Smiles We're Building Towards", icon: LuSparkles },
  { value: "3", label: "One Community at a Time", icon: LuMapPin },
];

export const focusAreas = [
  {
    title: "Child Welfare",
    text: "Creating safer, brighter futures for children in Lagos.",
    icon: LuBaby,
  },
  {
    title: "Women Empowerment",
    text: "Supporting women and mothers across Lagos to build stronger households and communities.",
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
    text: "Work with us to create meaningful impact for women and children in Lagos.",
    cta: "Become a Partner",
    href: "/get-involved",
    icon: LuHandshake,
  },
  {
    title: "Volunteer",
    text: "Share your time, skills, and compassion.",
    cta: "Volunteer With Us",
    href: "/get-involved",
    icon: LuUsers,
  },
  {
    title: "Donate",
    text: "Your gift helps us reach more children, women and communities in Lagos.",
    cta: "Donate Today",
    href: "/donate",
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
    title: "We Planned for 50. 150 Came.",
    text: "What began with a target of 50 people grew into a gathering of 150 in Edition 1.",
    image: story1,
    alt: "Community members gathered during Christmas in the Street Edition 1",
    href: "/christmas-in-the-street",
  },
  {
    title: "183 Women Went Home with Foodstuffs",
    text: "In Edition 3, 183 women received foodstuffs as part of our community support initiative.",
    image: story2,
    alt: "Women receiving foodstuffs during Christmas in the Street Edition 3",
    href: "/impact",
  },
  {
    title: "A Visit to the Mosque",
    text: "Edition 3 extended beyond the main event with a visit to the mosque, strengthening community connections.",
    image: story3,
    alt: "Community members during the mosque visit after Edition 3",
    href: "/christmas-in-the-street",
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
  { name: "24seven", logo: sevenLogo },
  { name: "Chief Olu lawanson", logo: chiefolu },
  { name: "Techarthon", logo: techarthon },
];

export const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const contact = {
  phone: "+234 707 005 6736",
  phoneHref: "tel:+234707005673",
  email: "info@sanusijafarfoundation.org",
  location: "Lagos, Nigeria",
};

// Replace the "#" placeholders with the foundation's real profile URLs.
export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sanusijafarfoundation?stkn=MXdzY2s2anQ0MDMzNw%3D%3D&utm_source=qr",
    key: "instagram",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sanusi-jafar-foundation/",
    key: "linkedin",
    icon: LuLinkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Bu62Em5P4/?mibextid=wwXIfr",
    key: "facebook",
  },
  {
    label: "Tiktok",
    href: "https://www.tiktok.com/@sanusijafarfoundation?_r=1&_t=ZS-9A05NRww5c9",
    key: "tiktok",
    icon: FaTiktok,
  },
];
