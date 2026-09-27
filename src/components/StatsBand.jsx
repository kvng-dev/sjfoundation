import CountUp from "react-countup";
import { Doodle } from "./Doodles.jsx";
import { heroStats } from "../data/content.js";

function StatValue({ value }) {
  const match = value.match(/^([\d,.]+)(.*)$/);

  if (!match) {
    return value;
  }

  const [, number, suffix] = match;

  const numericValue = parseFloat(number.replace(/,/g, ""));
  const hasDecimal = number.includes(".");
  const hasK = suffix.toLowerCase().includes("k");

  let end = numericValue;

  // 1.2k → 1200
  if (hasK) {
    end = numericValue * 1000;
  }

  let decimals = 0;

  if (hasDecimal) {
    decimals = 1;
  }

  return (
    <CountUp
      start={0}
      end={end}
      duration={4}
      decimals={decimals}
      separator=","
      suffix={suffix}
      enableScrollSpy
      scrollSpyOnce
    />
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
