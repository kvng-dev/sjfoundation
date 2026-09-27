import { LuHeart, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";
import Logo from "./Logo.jsx";
import { contact, footerLinks, socials } from "../data/content.js";

const socialIcons = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__tagline">
            Bringing hope, joy &amp; smiles to children, mothers &amp;
            communities, one life at a time.
          </p>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h2 className="footer__heading">Quick Links</h2>
          <ul>
            {footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Contact</h2>
          <ul className="footer__contact">
            <li>
              <LuPhone aria-hidden="true" />
              <a href={contact.phoneHref}>{contact.phone}</a>
            </li>
            <li>
              <LuMail aria-hidden="true" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <LuMapPin aria-hidden="true" />
              <span>{contact.location}</span>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Follow Us</h2>
          <ul className="footer__social">
            {socials.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <li key={s.key}>
                  <a href={s.href} aria-label={s.label}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="footer__cta">
          <a href="#donate" className="btn btn--primary">
            <LuHeart aria-hidden="true" /> Donate
          </a>
          <p>Because kindness changes lives.</p>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>&copy; 2026 Sanusi Jafar Foundation. All Rights Reserved.</p>
          <p>Project 1,000 Smiles | Kinder People. Brighter Communities.</p>
        </div>
      </div>
    </footer>
  );
}
