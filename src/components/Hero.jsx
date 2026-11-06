import { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { Doodle } from "./Doodles.jsx";

import heroImg1 from "../assets/IMG_3112.JPG.jpeg";
import heroImg2 from "../assets/santa-baby.jpeg";
import heroImg3 from "../assets/IMG_3132.JPG.jpeg";
import heroImg4 from "../assets/IMG_3119.JPG.jpeg";
import heroImg5 from "../assets/IMG_3169.JPG.jpeg";
import heroImg6 from "../assets/IMG_3167.JPG.jpeg";
import heroImg7 from "../assets/IMG_3168.JPG.jpeg";
import heroImg8 from "../assets/IMG_3165.JPG.jpeg";
import healTheWorld from "../assets/heal-the-world.mp3";

const heroImages = [
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
  heroImg5,
  heroImg6,
  heroImg7,
  heroImg8,
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loaded, setLoaded] = useState(2); // how many slides are in the DOM
  const audioRef = useRef(null);

  // Mount slides progressively (current + next) instead of fetching all 8 up front.
  useEffect(() => {
    setLoaded((n) =>
      Math.max(n, Math.min(currentImage + 2, heroImages.length))
    );
  }, [currentImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Play / pause music
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Audio playback was blocked:", error);
      }
    }
  };

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src={healTheWorld}
        loop
        preload="auto"
        autoPlay={true}
      />
      <div className="hero__media">
        {heroImages.slice(0, loaded).map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Children and families supported by the Sanusi Jafar Foundation (photo ${
              index + 1
            })`}
            className={`hero__image ${
              index === currentImage ? "hero__image--active" : ""
            }`}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        ))}

        <p className="hero__tagline">
          <span>Stronger</span>
          <span>Families</span>
          <span>Brighter</span>
          <span>Communities</span>
        </p>

        {/* Carousel indicators */}
        <div className="hero__dots" aria-label="Hero image navigation">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`hero__dot ${
                index === currentImage ? "hero__dot--active" : ""
              }`}
              onClick={() => setCurrentImage(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === currentImage ? "true" : undefined}
            />
          ))}
        </div>

        {/* Music button */}
        <button
          type="button"
          className={`hero__music ${isPlaying ? "hero__music--playing" : ""}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          aria-pressed={isPlaying}
        >
          <span className="hero__music-icon" aria-hidden="true">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1.2" />
                <rect x="14" y="5" width="4" height="14" rx="1.2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </span>
          <span className="hero__music-label">
            {isPlaying ? "Pause music" : "Play music"}
          </span>
          <span className="hero__music-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow eyebrow">
            Women &amp; Children Charity in Lagos
          </p>
          <h1 id="hero-title" className="hero__title">
            Bringing hope, joy, and smiles to children, mothers, and communities
            in Lagos,{" "}
            <span className="lp-underline">
              <em>one life at a time.</em>
              <Doodle name="squiggle" />
            </span>
          </h1>

          <p className="hero__lead">
            We create lasting change through education, empowerment and
            community support, helping women, children and families across Lagos
            build brighter futures.
          </p>

          <div className="hero__actions">
            <Button href="/our-work" arrow>
              Explore Our Work
            </Button>

            <Button href="/get-involved" variant="outline">
              Partner With Us
            </Button>

            <Doodle
              name="heart"
              fill="currentColor"
              className="lp-abs lp-float lp-c-o lp-edge"
              style={{ bottom: "-30px", left: "2px", width: 24 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
