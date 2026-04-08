"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  year: string;
  industry: string;
}

interface Props {
  projects: Project[];
  images: string[];
}

const AUTO_SPEED = 1.2; // px per frame

export default function HomeCarousel({ projects, images }: Props) {
  const trackRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number | null>(null);
  const isHovered   = useRef(false);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const startScroll = useRef(0);
  const velocity    = useRef(0);
  const lastX       = useRef(0);
  const lastTime    = useRef(0);
  const didDrag     = useRef(false);
  const setWidth    = useRef(0);

  // ── Clone cards for infinite loop ────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const origCards = Array.from(track.children) as HTMLElement[];

    const clonesBefore = origCards.map(c => {
      const cl = c.cloneNode(true) as HTMLElement;
      cl.setAttribute("aria-hidden", "true");
      cl.querySelectorAll("a").forEach(a => a.setAttribute("tabindex", "-1"));
      return cl;
    });
    const clonesAfter = origCards.map(c => {
      const cl = c.cloneNode(true) as HTMLElement;
      cl.setAttribute("aria-hidden", "true");
      cl.querySelectorAll("a").forEach(a => a.setAttribute("tabindex", "-1"));
      return cl;
    });

    clonesBefore.reverse().forEach(c => track.prepend(c));
    clonesAfter.forEach(c  => track.append(c));

    const gap = 12;
    const sw = origCards.reduce((sum, c) => sum + c.offsetWidth + gap, 0);
    setWidth.current = sw;

    const beforeWidth = clonesBefore.reduce((sum, c) => sum + c.offsetWidth + gap, 0);
    track.scrollLeft = beforeWidth;

    return () => {
      clonesBefore.forEach(c => c.remove());
      clonesAfter.forEach(c  => c.remove());
    };
  }, []);

  // ── Loop boundary check ───────────────────────────────────────
  const checkLoop = () => {
    const track = trackRef.current;
    if (!track || setWidth.current === 0) return;
    const gap = 12;
    const cardWidth = (track.scrollWidth / 3) / projects.length;
    const beforeWidth = projects.length * (cardWidth + gap);
    if (track.scrollLeft >= beforeWidth + setWidth.current) track.scrollLeft -= setWidth.current;
    if (track.scrollLeft <= 0) track.scrollLeft += setWidth.current;
  };

  // ── Auto-scroll loop ──────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      if (!isDragging.current && !isHovered.current) {
        const track = trackRef.current;
        if (track) {
          track.scrollLeft += AUTO_SPEED;
          checkLoop();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Drag handlers ─────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    didDrag.current    = false;
    startX.current     = e.clientX;
    startScroll.current = track.scrollLeft;
    lastX.current      = e.clientX;
    lastTime.current   = Date.now();
    velocity.current   = 0;
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    track.scrollLeft = startScroll.current - dx;
    const now = Date.now();
    const dt  = now - lastTime.current;
    if (dt > 0) velocity.current = (e.clientX - lastX.current) / dt;
    lastX.current  = e.clientX;
    lastTime.current = now;
    checkLoop();
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // Momentum fling — then auto-scroll resumes naturally via the tick loop
    let v = velocity.current * 14;
    const track = trackRef.current;
    if (!track || Math.abs(v) < 0.5) return;
    const fling = () => {
      if (Math.abs(v) < 0.5 || isHovered.current) return;
      track.scrollLeft -= v;
      v *= 0.92;
      checkLoop();
      requestAnimationFrame(fling);
    };
    requestAnimationFrame(fling);
  };

  // ── Touch ─────────────────────────────────────────────────────
  const touchStart  = useRef(0);
  const touchScroll = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current  = e.touches[0].clientX;
    touchScroll.current = trackRef.current?.scrollLeft ?? 0;
    isDragging.current  = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = touchScroll.current - (e.touches[0].clientX - touchStart.current);
    checkLoop();
  };
  const onTouchEnd = () => { isDragging.current = false; };

  return (
    <div
      ref={trackRef}
      className="home-carousel"
      style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseEnter={() => { isHovered.current = true;  }}
      onMouseLeave={() => { isHovered.current = false; onMouseUp(); }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {projects.map((p, i) => (
        <Link
          key={p.id}
          href={`/work/${p.id}`}
          className="home-carousel-card"
          onClick={e => { if (didDrag.current) e.preventDefault(); }}
          draggable={false}
        >
          <img src={images[i]} alt={p.title} className="home-carousel-img" draggable={false} />
          <div className="home-carousel-overlay">
            <div className="home-carousel-info">
              <div className="home-carousel-name">{p.title}</div>
              <div className="home-carousel-meta">{p.year} · {p.industry}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
