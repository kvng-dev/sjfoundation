import CountUp from "react-countup";
import { Doodle } from "./Doodles.jsx";
import { heroStats } from "../data/content.js";

function StatValue({ value }) {
  if (value == null || value === "") return "—";

  const text = String(value).trim();
  const match = text.match(/^([\d,]+(?:\.\d+)?)(.*)$/);

  if (!match) return text;

  const [, number, suffix] = match;
  const end = Number(number.replace(/,/g, ""));

  if (!Number.isFinite(end)) return text;

  return (
    <CountUp start={0} end={end} duration={4} separator="," suffix={suffix} />
  );
}

export default function StatsBand() {
  return (
    <section
      className="stats-band lp-relative"
      aria-label="Foundation at a glance"
    >
      <Doodle
        name="sparkle"
        fill="currentColor"
        className="lp-abs lp-float lp-c-sun lp-edge"
        style={{ top: 10, right: 22, width: 24 }}
      />
      <div className="container">
        <dl className="stats-band__list">
          {heroStats.map((s) => (
            <div className="stats-band__item" key={s.label}>
              <dt className="sr-only">{s.label}</dt>

              <dd className="stats-band__value">
                <StatValue value={s.value} />
              </dd>

              <dd className="stats-band__label" aria-hidden="true">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
