import Button from './Button.jsx';
import { LuArrowRight } from 'react-icons/lu';
import { involveOptions } from '../data/content.js';

export default function GetInvolved() {
  return (
    <section id="get-involved" className="section involve">
      <div className="container involve__grid">
        <div className="involve__copy">
          <p className="eyebrow">Get involved</p>
          <h2 className="h2">Be part of the change.</h2>
          <p>
            Your support helps us reach more children, mothers and communities.
          </p>
          <Button href="#get-involved" variant="outline-orange" arrow>Ways to Help</Button>
        </div>

        <ul className="involve__options">
          {involveOptions.map(({ title, text, cta, href, icon: Icon }) => (
            <li className="involve__option" key={title} id={title === 'Donate' ? 'donate' : undefined}>
              <Icon className="involve__icon" aria-hidden="true" />
              <div>
                <h3 className="involve__title">{title}</h3>
                <p>{text}</p>
                <a className="text-link" href={href}>
                  {cta} <LuArrowRight aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
