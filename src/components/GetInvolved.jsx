import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import { LuArrowRight } from "react-icons/lu";
import { involveOptions } from "../data/content.js";

export default function GetInvolved() {
  return (
    <section id="get-involved" className="section involve">
      <div className="container involve__grid">
        <div className="involve__copy">
          <p className="eyebrow">Get involved</p>
          <h2 className="h2">Be part of the change in Lagos.</h2>
          <p>
            Your support helps us reach more women, children, and communities
            across Lagos.
          </p>
          <Button href="/get-involved" variant="outline-orange" arrow>
            Ways to Help
          </Button>
        </div>

        <ul className="involve__options">
          {involveOptions.map(({ title, text, cta, href, icon: Icon }) => (
            <li
              className="involve__option"
              key={title}
              id={title === "Donate" ? "donate" : undefined}
            >
              <Icon className="involve__icon" aria-hidden="true" />
              <div>
                <h3 className="involve__title">{title}</h3>
                <p>{text}</p>
                <Link className="text-link" to={href}>
                  {cta} <LuArrowRight aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
