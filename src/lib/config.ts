import { BadgeInfoIcon, HandHeartIcon, HandshakeIcon, HomeIcon, MessageCircleQuestionIcon } from "lucide-react";
import { Discord, Instagram, Tiktok } from "react-bootstrap-icons"

export const socials = [
  {
    name: "Discord",
    href: "https://discord.gg/bkPs8BhG6B",
    icon: Discord
  },
  {
    name: "Instagram",
    href: "https://instagram.com/decode_hack2025",
    icon: Instagram
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@decode_hack",
    icon: Tiktok
  }
]

export const sections = [
  {
    title: "Home",
    href: "/#home",
    icon: HomeIcon,
  },
  {
    title: "About",
    href: "/#about",
    icon: BadgeInfoIcon
  },
  {
    title: "Vision & Mission",
    href: "/#vision-mission",
    icon: HandHeartIcon,
  },
  {
    title: "Sponsors",
    href: "/#sponsors",
    icon: HandshakeIcon
  },
  {
    title: "FAQ",
    href: "/#faq",
    icon: MessageCircleQuestionIcon,
  },
]

export const registrationEndDate = new Date("2025-07-27T19:00:00Z"); // Set your target date here

export const sponsors = [
  {
    name: "EDZEN",
    description: "EDZEN est une entreprise algérienne engagée pour l’environnement, l’éducation et l’entrepreneuriat vert. Elle accompagne la création de green business à travers des formations, des ateliers et des expériences d’apprentissage accessibles. EDZEN vise à transformer les consommateurs en producteurs responsables, tout en valorisant les savoir-faire artisanaux et les métiers durables.",
    logo: "/edzen-logo.png",
    url: "https://www.instagram.com/edzen.dz/"
  },
  {
    name: "DZHOSTER",
    description: "DZHOSTER, marque du groupe AYRADE, accompagne depuis plus de 7 ans les particuliers exigeants — startups, étudiants, agences, freelances. Avec plus de 4000 clients à son actif, leur réseau s’étend à travers toute l’Algérie, porté par une équipe engagée et des partenaires de confiance.",
    logo: "/dz-hoster-logo.png",
    url: "https://www.dzhoster.com/"
  },
  {
    name: "Well Career",
    description: "Well Career est un organisme qui vise a sélectionner, développer et accompagner les professionnels pour qu'ils s'épanouissent dans leur parcours. Grâce à des processus de Recrutement Rigoureux, des Formations Ciblées et un Accompagnement Personnalisé, Well Career aident chaque talent à trouver sa place dans un environnement où il pourra exceller.",
    logo: "/well-career-logo.png",
    url: "https://career.wellpharmagroup.com/"
  },
] 
