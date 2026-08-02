import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "../../data";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import StripScroll from "@/components/StripScroll";

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.id }));
}

const PH_CLASSES = ["ph1","ph2","ph3","ph4","ph5","ph6"];

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const idx = PROJECTS.findIndex(p => p.id === params.slug);
  if (idx === -1) notFound();

  const p  = PROJECTS[idx];
  const ph = PH_CLASSES[idx];

  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const strip  = p.images?.strip ?? [];
  const ratios = p.images?.stripRatios ?? [];

  return (
    <div className="cs">
      <Nav theme="light" />

      {/* Hero */}
      <section className="cs-hero page-load-1">
        <h1 className="cs-title">{p.title}</h1>
        <p className="cs-tagline">{p.tagline}</p>

        <div className="cs-hero-tags">
          <span className="cs-tag">{p.industry}</span>
          {p.program.map(t => (
            <span key={t} className="cs-tag">{t}</span>
          ))}
        </div>
      </section>

      {/* Image carousel — drag to scroll */}
      <div className="cs-strip-wrapper page-load-2">
        <div className="cs-strip">
          {strip.length > 0 ? (
            strip.map((src, i) => {
              const ratio = ratios[i] ?? "16/9";
              const [rw, rh] = ratio.split("/");
              return (
                <div
                  key={i}
                  className="cs-strip-card"
                  style={{ aspectRatio: `${rw} / ${rh}` }}
                >
                  <img src={src} alt={`${p.title} — ${i + 1}`} draggable={false} />
                </div>
              );
            })
          ) : (
            <div className="cs-strip-card" style={{ aspectRatio: "16 / 9" }}>
              <div className={ph} style={{ width: "100%", height: "100%" }} />
            </div>
          )}
        </div>
        <div className="cs-strip-hint">Drag to explore</div>
      </div>
      <StripScroll />

      {/* Body */}
      <article className="cs-article">
        <div className="cs-lead reveal">
          {p.overview.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        <section className="cs-section reveal">
          <h2 className="cs-h2">The Challenge</h2>
          {p.challenge.map((para, i) => <p key={i} className="cs-p">{para}</p>)}
        </section>

        <section className="cs-section reveal">
          <h2 className="cs-h2">The Approach</h2>
          {p.approach.map((para, i) => <p key={i} className="cs-p">{para}</p>)}
        </section>

        <section className="cs-section reveal">
          <h2 className="cs-h2">The Outcome</h2>
          {p.outcome.map((para, i) => <p key={i} className="cs-p">{para}</p>)}
        </section>
      </article>

      {/* Video / closing image — centered */}
      {p.images?.video ? (
        <div className="cs-media reveal">
          <div className="cs-media-frame">
            <video
              src={p.images.video}
              autoPlay loop muted playsInline
              className="cs-media-el"
            />
          </div>
        </div>
      ) : p.images?.full ? (
        <div className="cs-media reveal">
          <div className="cs-media-frame">
            <img src={p.images.full} alt={`${p.title} — detail`} className="cs-media-el" />
          </div>
        </div>
      ) : null}

      {/* Next project */}
      <section className="cs-nextwrap reveal">
        <Link href={`/work/${next.id}`} className="cs-nextbtn">
          <span className="cs-nextbtn-label">Next project</span>
          <span className="cs-nextbtn-title">{next.title}</span>
        </Link>
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
