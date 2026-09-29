import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { LuHeart, LuMenu, LuX } from "react-icons/lu";

import Logo from "./Logo.jsx";
import { navLinks } from "../data/content.js";

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" onClick={close} aria-label="Sanusi Jafar Foundation home">
          <Logo />
        </Link>

        <nav
          id="site-nav"
          className={`nav${open ? " nav--open" : ""}`}
          aria-label="Main"
        >
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `nav__link${isActive ? " is-active" : ""}`
                  }
                  end={link.href === "/"}
                  onClick={close}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/donate"
            className="btn btn--primary btn--sm nav__donate-mobile"
            onClick={close}
          >
            <LuHeart aria-hidden="true" />
            Donate
          </Link>
        </nav>

        <Link to="/donate" className="btn btn--primary btn--sm header__donate">
          <LuHeart aria-hidden="true" />
          Donate
        </Link>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
