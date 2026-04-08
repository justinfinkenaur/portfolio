import { PROJECTS } from "./data";
import Nav from "@/components/Nav";
import HomeCarousel from "@/components/HomeCarousel";

const IMAGES = [
  "/p1-home.png",       // 1. Google Marketing Advisor
  "/p2-home.png",       // 2. Amazon Echo Show 15 Out-of-Box Experience
  "/p5-home.png",       // 3. Google Endpoint Management
  "/p4-home.png",       // 4. Amazon Echo Show Picture-In-Picture
  "/p3-home-new.png",   // 5. Amazon Buy with Prime
];

export default function Home() {
  const carouselProjects = PROJECTS.map(p => ({
    id: p.id,
    title: p.title,
    year: p.year,
    industry: p.industry,
  }));

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav theme="light" />

      {/* Header */}
      <header className="home-intro page-load-1">
        <h1 className="home-intro-headline">
          Simplifying complexity to orchestrate meaningful product experiences.
        </h1>
        <p className="home-intro-sub">
          I design products that cut through complexity. From smart home devices to agentic AI experiences, I've had the privilege of working across a wide range of products and domains. My work brings clarity, trust, and smarter decisions to the places where people and technology meet.
        </p>
      </header>

      {/* Carousel */}
      <div className="page-load-2">
        <HomeCarousel projects={carouselProjects} images={IMAGES} />
      </div>

      {/* Footer */}
      <footer className="footer" style={{ marginTop: "auto" }}>
        <span className="footer-copy">© {new Date().getFullYear()} Justin Finkenaur</span>
        <ul className="footer-links">
          <li><a href="mailto:justin.finkenaur@gmail.com">Email</a></li>
          <li><a href="https://www.linkedin.com/in/justin-finkenaur/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://drive.google.com/file/d/1fU0IhtrdjhIjHEJbuyPuMbxksmt2uXUN/view?usp=sharing" target="_blank">Résumé</a></li>
        </ul>
      </footer>
    </div>
  );
}
