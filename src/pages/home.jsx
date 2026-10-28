import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import StatsBand from "../components/StatsBand.jsx";
import About from "../components/About.jsx";
import FeaturedInitiative from "../components/FeaturedInitiative.jsx";
import Impact from "../components/Impact.jsx";
import GetInvolved from "../components/GetInvolved.jsx";
import Partners from "../components/Partners.jsx";
import BeneficiaryStory from "../components/Stories.jsx";
import ChristmasFeature from "../components/ChristmasFeature.jsx";
import SEO, { orgSchema } from "../components/seo.jsx";

export default function Home() {
  return (
    <>
      <SEO
        title="Women & Children Charity in Lagos | Sanusi Jafar Foundation"
        description="We are a women and children charity in Lagos. As an NGO, we bring education, empowerment, and community support to families. Donate or volunteer."
        path="/"
        type="website"
        jsonLd={orgSchema}
      />
      <Hero />
      <StatsBand />
      <About />
      <ChristmasFeature />
      <FeaturedInitiative />
      <Impact />
      <GetInvolved />
      <BeneficiaryStory />
      <Partners />
    </>
  );
}
