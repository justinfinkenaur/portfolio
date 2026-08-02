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

const AUTO_SPEED = 1.2;   // px per frame — the resting drift speed
const EASE       = 0.022; // how quickly a flick decays back toward AUTO_SPEED
const MAX_SPEED  = 70;    // clamp so a hard flick can't run away
const FRAME_MS   = 16.67;

export default function HomeCarousel({ projects, images }: Props) {
  const trackRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number | null>(null);
  const isHovered   = useRef(false);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const startScroll = useRef(0);
  const lastX       = useRef(0);
  const lastTime    = useRef(0);
  const didDrag     = useRef(false);
  const setWidth    = useRef(0);

  // Current scroll speed in px/frame. Eases toward a target every frame.
  const speed       = useRef(AUTO_SPEED);
  // Pointer velocity in px/ms, sampled during a drag.
  const pointerVel  = useRef(0);
  // After a flick we keep drifting even though the cursor is still over the
  // carousel — hover-pause only re-engages once the pointer leaves and returns.
  const postFlick   = useRef(false);

  // ── Clone cards for infinite loop ────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const origCards = Array.from(track.children) as HTMLElement[];

    const makeClone = (c: HTMLElement) => {
      const cl = c.cloneNode(true) as HTMLElement;
      cl.setAttribute("aria-hidden", "true");
      cl.querySelectorAll("a").forEach(a => a.setAttribute("tabindex", "-1"));
      return cl;
    };

    const clonesBefore = origCards.map(makeClone);
    const clonesAfter  = origCards.map(makeClone);

    clonesBefore.reverse().forEach(c => track.prepend(c));
    clonesAfter.forEach(c => track.append(c));

    const gap = 12;
    setWidth.current = origCards.reduce((sum, c) => sum + c.offsetWidth + gap, 0);

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

  // ── Single animation loop: drift, flick decay, hover pause ────
  useEffect(() => {
    const tick = () => {
      const track = trackRef.current;

      if (track && !isDragging.current) {
        // Where the speed wants to settle
        const target = (isHovered.current && !postFlick.current) ? 0 : AUTO_SPEED;

        // Ease current speed toward the target — this is what makes a flick
        // bleed off gradually instead of snapping back
        speed.current += (target - speed.current) * EASE;

        // Once we're close to the resting speed, hand control back to hover
        if (postFlick.current && Math.abs(speed.current - AUTO_SPEED) < 0.15) {
          postFlick.current = false;
        }

        if (Math.abs(speed.current) > 0.01) {
          track.scrollLeft += speed.current;
          checkLoop();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Shared drag start / move / end ────────────────────────────
  const dragStart = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current  = true;
    didDrag.current     = false;
    startX.current      = clientX;
    startScroll.current = track.scrollLeft;
    lastX.current       = clientX;
    lastTime.current    = performance.now();
    pointerVel.current  = 0;
    speed.current       = 0;
  };

  const dragMove = (clientX: number) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;

    const dx = clientX - startX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    track.scrollLeft = startScroll.current - dx;

    const now = performance.now();
    const dt  = now - lastTime.current;
    if (dt > 0) {
      // Blend samples so a single jittery frame doesn't define the throw
      const instant = (clientX - lastX.current) / dt;
      pointerVel.current = pointerVel.current * 0.7 + instant * 0.3;
      lastX.current    = clientX;
      lastTime.current = now;
    }
    checkLoop();
  };

  const dragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // If the pointer was resting when released, don't fling
    const stale = performance.now() - lastTime.current > 90;
    const v = stale ? 0 : pointerVel.current;

    // Pointer velocity (px/ms, positive = dragging right) becomes scroll
    // speed (px/frame, positive = scrolling right → content moves left)
    let launch = -v * FRAME_MS;
    launch = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, launch));

    if (Math.abs(launch) > AUTO_SPEED) {
      speed.current     = launch;
      postFlick.current = true;
    } else {
      speed.current     = AUTO_SPEED;
      postFlick.current = false;
    }
  };

  return (
    <div
      ref={trackRef}
      className="home-carousel"
      onMouseDown={e => { e.preventDefault(); dragStart(e.clientX); }}
      onMouseMove={e => dragMove(e.clientX)}
      onMouseUp={dragEnd}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => {
        isHovered.current = false;
        postFlick.current = false;
        dragEnd();
      }}
      onTouchStart={e => dragStart(e.touches[0].clientX)}
      onTouchMove={e => dragMove(e.touches[0].clientX)}
      onTouchEnd={dragEnd}
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
              <div className="home-carousel-meta">{p.industry}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
