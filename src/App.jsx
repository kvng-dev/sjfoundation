import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImpactPage from "./pages/impact.jsx";
import GetInvolvedPage from "./pages/get-involved.jsx";
import Contact from "./pages/contact.jsx";
import Home from "./pages/home.jsx";
import OurWork from "./pages/our-work.jsx";
import About from "./pages/about.jsx";
import Layout from "./components/Layout.jsx";
import ChristmasOnTheStreets from "./pages/ChristmasInTheStreet.jsx";
import Donate from "./pages/donate.jsx";
import Project1000Ssmiles from "./pages/project-1000-smiles.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Landing page */}
          <Route path="/" element={<Home />} />

          {/* Inner pages */}
          <Route path="/about" element={<About />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/project-1000-smiles" element={<Project1000Ssmiles />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route
            path="/christmas-in-the-street"
            element={<ChristmasOnTheStreets />}
          />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
