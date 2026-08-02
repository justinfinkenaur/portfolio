import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";

const GLANCE = [
  {
    title: "Complex Systems & Agentic AI",
    desc: "Designing service layers that interpret context and guide people to confident decisions without exposing the machinery underneath.",
    meta: "Google",
  },
  {
    title: "Smart Home & Devices",
    desc: "Experiences that extend beyond the screen, from first out-of-box setup to the quiet daily interactions that follow.",
    meta: "Amazon",
  },
  {
    title: "E-Commerce & Retail",
    desc: "Merchant and shopper experiences that consolidate fragmented tools and reduce friction at scale.",
    meta: "Amazon, Capital One",
  },
  {
    title: "Finance & Enterprise Tools",
    desc: "Bringing clarity to dense, high-stakes interfaces so non-expert users can act without second-guessing themselves.",
    meta: "Capital One, Google",
  },
];

const COMPANIES = ["Google", "Amazon", "Capital One"];

export default function About() {
  return (
    <div className="about">
      <Nav theme="light" />

      {/* Hero */}
      <section className="about-hero page-load-1">
        <h1 className="about-headline">
          Design that gives people clarity, earns their trust, and lets them act with confidence.
        </h1>
        <p className="about-sub">
          I'm Justin, a product designer with 9+ years simplifying complex systems so people feel confident in unfamiliar technology.
        </p>
      </section>

      {/* Portrait */}
      <div className="about-portrait-wrap page-load-2">
        <div className="about-portrait">
          <img src="/about-photo.jpg" alt="Justin Finkenaur" />
        </div>
      </div>

      {/* Companies */}
      <div className="about-companies reveal">
        <p className="about-companies-label">Where I've worked</p>
        <div className="about-companies-row">
          {COMPANIES.map(c => (
            <span key={c} className="about-company">{c}</span>
          ))}
        </div>
      </div>

      {/* At a glance table */}
      <section className="about-glance reveal">
        <p className="about-section-eyebrow">Focus</p>
        <h2 className="about-section-title">Where I do my best work</h2>

        <div className="about-glance-table">
          <div className="about-glance-head">
            <span>Area</span>
            <span>What that looks like</span>
            <span>Where</span>
          </div>
          {GLANCE.map(row => (
            <div key={row.title} className="about-glance-row">
              <div className="about-glance-title">{row.title}</div>
              <div className="about-glance-desc">{row.desc}</div>
              <div className="about-glance-meta">{row.meta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bio */}
      <section className="about-bio-section reveal">
        <p className="about-section-eyebrow">Background</p>
        <h2 className="about-section-title">A bit more context</h2>
        <div className="about-bio">
          <p>
            I'm a product designer with 9+ years of experience simplifying complex systems and integrating AI to improve clarity, trust, and decision-making. My work spans smart home, e-commerce, retail, and agentic AI, with a focus on experiences that extend beyond the screen. That thinking traces back to Carnegie Mellon, where I earned a BFA in Industrial Design and learned to treat products as systems rather than screens, shaped as much by physical form and context of use as by the interface itself.
          </p>
          <p>
            I'm drawn to problems where the stakes are personal, where a confusing flow means someone second-guesses a purchase, loses trust in a device in their home, or hesitates to act on a recommendation meant to help them. Whether I'm designing for an AI agent making decisions on someone's behalf or a first-time setup experience in someone's living room, I start from the same place: what does this person need to feel confident in this moment?
          </p>
          <p>
            I've spent my career at Capital One, Amazon, and Google shipping products that millions of people reach for daily, and that closeness to everyday life has shaped how I navigate ambiguity, align cross-functional teams, and design within technical constraints without losing sight of the human on the other end.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta reveal">
        <div className="about-cta-card">
          <p className="about-cta-eyebrow">Get in touch</p>
          <h2 className="about-cta-title">Let's talk about your product.</h2>
          <p className="about-cta-sub">
            Currently open to new opportunities.
          </p>
          <div className="about-cta-actions">
            <a href="mailto:justin.finkenaur@gmail.com" className="btn btn-primary">
              justin.finkenaur@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/justin-finkenaur/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-copy">© {new Date().getFullYear()} Justin Finkenaur</span>
        <ul className="footer-links">
          <li><a href="mailto:justin.finkenaur@gmail.com">Email</a></li>
          <li><a href="https://www.linkedin.com/in/justin-finkenaur/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://drive.google.com/file/d/1fU0IhtrdjhIjHEJbuyPuMbxksmt2uXUN/view?usp=sharing" target="_blank">Resume</a></li>
        </ul>
      </footer>
      <Reveal />
    </div>
  );
}
