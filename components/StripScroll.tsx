"use client";
import { useEffect, useRef } from "react";

/**
 * Adds click-and-drag scrolling + scroll wheel support to .cs-strip
 */
export default function StripScroll() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const strip = document.querySelector<HTMLElement>(".cs-strip");
    if (!strip) return;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;

    // ── Drag handlers ──────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startScrollLeft = strip.scrollLeft;
      lastX = e.clientX;
      lastTime = Date.now();
      velocity = 0;
      strip.style.cursor = "grabbing";
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      strip.scrollLeft = startScrollLeft - dx;

      // Track velocity for momentum
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastTime = now;
      e.preventDefault();
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      strip.style.cursor = "grab";
      // Apply momentum
      let v = velocity * 12;
      const momentum = () => {
        if (Math.abs(v) < 0.5) return;
        strip.scrollLeft -= v;
        v *= 0.92;
        rafRef.current = requestAnimationFrame(momentum);
      };
      rafRef.current = requestAnimationFrame(momentum);
    };

    const onMouseLeave = () => {
      if (isDragging) onMouseUp();
    };

    // ── Touch handlers (mobile drag) ───────────────────────────────
    let touchStartX = 0;
    let touchStartScroll = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartScroll = strip.scrollLeft;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX;
      strip.scrollLeft = touchStartScroll - dx;
    };

    strip.style.cursor = "grab";
    strip.style.userSelect = "none";

    strip.addEventListener("mousedown",  onMouseDown);
    strip.addEventListener("mousemove",  onMouseMove);
    strip.addEventListener("mouseup",    onMouseUp);
    strip.addEventListener("mouseleave", onMouseLeave);
    strip.addEventListener("touchstart", onTouchStart, { passive: true });
    strip.addEventListener("touchmove",  onTouchMove,  { passive: true });

    return () => {
      strip.removeEventListener("mousedown",  onMouseDown);
      strip.removeEventListener("mousemove",  onMouseMove);
      strip.removeEventListener("mouseup",    onMouseUp);
      strip.removeEventListener("mouseleave", onMouseLeave);
      strip.removeEventListener("touchstart", onTouchStart);
      strip.removeEventListener("touchmove",  onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}
