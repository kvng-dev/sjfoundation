import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project1000Smiles from "./pages/project1k.jsx";
import ImpactPage from "./pages/impact.jsx";
import GetInvolvedPage from "./pages/get-involved.jsx";
import Contact from "./pages/contact.jsx";
import Home from "./pages/home.jsx";
import OurWork from "./pages/our-work.jsx";
import About from "./pages/about.jsx";
import Layout from "./components/Layout.jsx";
import ChristmasOnTheStreets from "./pages/christmasInTheStreet.jsx";

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
          <Route path="/project-1000-smiles" element={<Project1000Smiles />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route
            path="/christmas-in-the-streets"
            element={<ChristmasOnTheStreets />}
          />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
