import Button from "./Button.jsx";
import { Doodle } from "./Doodles.jsx";
import impactVideo from "../assets/impact.mp4";

export default function Impact() {
  return (
    <section id="impact" className="section impact">
      <div className="container impact__grid">
        <div className="impact__copy">
          <p className="eyebrow">Our impact</p>
          <h2 className="h2">Real people. Real change.</h2>
          <p>
            Through your support, we&rsquo;re creating opportunities, nurturing
            hope in children, and helping families and communities thrive.
          </p>
          <Button href="#impact" variant="outline-orange" arrow>
            View Our Impact
          </Button>
        </div>

        <div className="impact__video lp-framed">
          <Doodle
            name="sun"
            className="lp-abs lp-spin lp-c-sun lp-edge"
            style={{ top: -30, right: 16, width: 58 }}
          />
          <video
            className="impact__video-media"
            src={impactVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Sanusi Jafar Foundation making an impact in the community"
          />
          <span className="lp-tag">See the impact in motion</span>
        </div>
      </div>
    </section>
  );
}
