import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "../../data";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ExpandStory from "@/components/ExpandStory";
import StripScroll from "@/components/StripScroll";

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.id }));
}

const PH_CLASSES = ["ph1","ph2","ph3","ph4","ph5","ph6"];
const PH_ALT     = ["ph4","ph5","ph6","ph1","ph2","ph3"];

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const idx = PROJECTS.findIndex(p => p.id === params.slug);
  if (idx === -1) notFound();

  const p    = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const ph   = PH_CLASSES[idx];
  const phB  = PH_ALT[idx];

  return (
    <div className="cs">
      <Nav theme="light" />

      {/* Title block */}
      <section className="cs-top fade-in">
        <h1 className="cs-title">{p.title}</h1>
        <p className="cs-tagline">{p.tagline}</p>
      </section>

      {/* Horizontal scroll image strip — cursor drives scroll */}
      <div className="cs-strip-wrapper fade-in">
        <div className="cs-strip" style={p.images?.contain ? { alignItems: "flex-start" } : undefined}>
          {p.images ? (
            p.images.strip.map((src, i) => {
              const ratio = p.images!.stripRatios?.[i] ?? "16/9";
              const isContain = p.images!.contain || (p.images!.perCardContain?.[i] ?? false);
              if (p.images!.contain) {
                return (
                  <div key={i} className="cs-strip-card" style={{ width: "auto", height: "auto" }}>
                    <img src={src} alt={`${p.title} — ${i + 1}`} style={{height:"640px",width:"auto",objectFit:"contain",display:"block"}} />
                  </div>
                );
              }
              const w = `calc(640px * ${ratio.split("/")[0]} / ${ratio.split("/")[1]})`;
              return (
                <div key={i} className="cs-strip-card" style={{ width: w }}>
                  <img src={src} alt={`${p.title} — ${i + 1}`} style={{width:"100%",height:"100%",objectFit: isContain ? "contain" : "cover",display:"block",background: isContain ? "#f5f5f5" : "transparent"}} />
                </div>
              );
            })
          ) : (
            <>
              <div className="cs-strip-card"><div className={ph} style={{width:"100%",height:"100%"}} /></div>
              <div className="cs-strip-card"><div className={phB} style={{width:"100%",height:"100%"}} /></div>
              <div className="cs-strip-card"><div className={ph} style={{width:"100%",height:"100%",filter:"brightness(0.7)"}} /></div>
              <div className="cs-strip-card"><div className={phB} style={{width:"100%",height:"100%"}} /></div>
            </>
          )}
        </div>
        <div className="cs-strip-hint">Drag to explore →</div>
      </div>
      <StripScroll />

      {/* Metadata + body */}
      <div className="cs-info reveal">
        {/* Left: metadata */}
        <div className="cs-meta-block">
          <div>
            <p className="cs-meta-label">Industry</p>
            <p className="cs-meta-val">{p.industry}</p>
          </div>
          <div>
            <p className="cs-meta-label">Project Type</p>
            <p className="cs-meta-val">{p.stage}</p>
          </div>
          <div>
            <p className="cs-meta-label">Year</p>
            <p className="cs-meta-val">{p.year}</p>
          </div>
        </div>

        {/* Right: overview + expand */}
        <div className="cs-body-col">
          <div className="cs-body-big">
            {p.overview.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <ExpandStory>
            <h3>The Challenge</h3>
            {p.challenge.map((para, i) => <p key={i}>{para}</p>)}
            <h3>The Approach</h3>
            {p.approach.map((para, i) => <p key={i}>{para}</p>)}
            <h3>The Outcome</h3>
            {p.outcome.map((para, i) => <p key={i}>{para}</p>)}
          </ExpandStory>
        </div>
      </div>

      {/* 16:9 image or video below story */}
      {p.images?.video ? (
        <div style={{ padding: "0 40px 80px" }} className="reveal">
          <div className="cs-full-img" style={{background:"var(--cream)",overflow:"hidden"}}>
            <video src={p.images.video} autoPlay loop muted playsInline style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center bottom",display:"block",transform:"scale(1.03)",transformOrigin:"center bottom"}} />
          </div>
        </div>
      ) : p.images?.full ? (
        <div style={{ padding: "0 40px 80px" }} className="reveal">
          <div className="cs-full-img">
            <img src={p.images.full} alt={`${p.title} — detail`} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
          </div>
        </div>
      ) : !p.images && (
        <div style={{ padding: "0 40px 80px" }} className="reveal">
          <div className="cs-full-img">
            <div className={ph} style={{width:"100%",height:"100%"}} />
          </div>
        </div>
      )}

      {/* Next project */}
      <Link href={`/work/${next.id}`} className="cs-next reveal">
        <div>
          <p className="cs-next-label">Next Case Study</p>
          <div className="cs-next-title">{next.title}</div>
        </div>
        <div className="cs-next-arrow">→</div>
      </Link>

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
