import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <div className="about">
      <Nav theme="light" />

      {/* Hero */}
      <section className="about-hero fade-in">
        <div className="about-hero-inner">
          <div className="about-hero-text">
            <h1 className="about-name about-statement">Hi, I'm Justin. I believe great design gives people clarity, earns their trust, and lets them act with confidence. That's the work I care about.</h1>
          </div>
          <div className="about-hero-photo">
            <img src="/about-photo.png" alt="Justin Finkenaur" />
          </div>
        </div>
      </section>

      {/* Bio + sidebar */}
      <div className="about-grid reveal">
        <div className="about-bio">
          <p>
            I'm a product designer with 9+ years of experience simplifying complex systems and integrating AI to improve clarity, trust, and decision-making. My work spans smart home, e-commerce, retail, and agentic AI, with a focus on experiences that extend beyond the screen. I believe the best products aren't defined by any single feature, they're the result of well-orchestrated moments that feel intuitive, intentional, and connected.
          </p>
          <p>
            I'm drawn to problems where the stakes are personal, where a confusing flow means someone second-guesses a purchase, loses trust in a device in their home, or hesitates to act on a recommendation meant to help them. Whether I'm designing for an AI agent making decisions on someone's behalf or a first-time setup experience in someone's living room, I start from the same place: what does this person need to feel confident in this moment?
          </p>
          <p>
            I've spent my career at Capital One, Amazon, and Google shipping products that millions of people reach for daily, and that closeness to everyday life has shaped how I navigate ambiguity, align cross-functional teams, and design within technical constraints without losing sight of the human on the other end.
          </p>
        </div>

        <div className="about-sidebar">
          <div className="about-sidebar-group">
            <p className="about-sidebar-label">Currently</p>
            <p className="about-sidebar-val">
              Open to new opportunities
            </p>
          </div>
          <div className="about-sidebar-group">
            <p className="about-sidebar-label">Experience</p>
            <p className="about-sidebar-val">
              Capital One · Amazon · Google<br />
              9+ years in product design
            </p>
          </div>
          <div className="about-sidebar-group">
            <p className="about-sidebar-label">Focus Areas</p>
            <p className="about-sidebar-val">
              Agentic AI · Smart Home<br />
              E-Commerce · Finance · Education
            </p>
          </div>
          <div className="about-sidebar-group">
            <p className="about-sidebar-label">Résumé</p>
            <a href="https://drive.google.com/file/d/1fU0IhtrdjhIjHEJbuyPuMbxksmt2uXUN/view?usp=sharing" target="_blank" className="about-resume-link">
              Download PDF ↗
            </a>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="about-contact reveal" data-d="2">
        <p className="about-contact-label">Get in touch</p>
        <a href="mailto:justin.finkenaur@gmail.com" className="about-email">
          justin.finkenaur@gmail.com
        </a>
      </div>

      <footer className="footer">
        <span className="footer-copy">© {new Date().getFullYear()} Justin Finkenaur</span>
        <ul className="footer-links">
          <li><a href="mailto:justin.finkenaur@gmail.com">Email</a></li>
          <li><a href="https://www.linkedin.com/in/justin-finkenaur/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://drive.google.com/file/d/1fU0IhtrdjhIjHEJbuyPuMbxksmt2uXUN/view?usp=sharing" target="_blank">Résumé</a></li>
        </ul>
      </footer>
      <Reveal />
    </div>
  );
}
