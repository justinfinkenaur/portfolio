"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavProps { theme?: "light" | "dark"; }

export default function Nav({ theme = "dark" }: NavProps) {
  const p = usePathname();
  const isLight = theme === "light";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = [
    "nav-wrap",
    !isLight ? "dark-bg" : "",
    scrolled ? "scrolled" : "",
  ].filter(Boolean).join(" ");

  return (
    <header className={navClass}>
      <Link href="/" className="site-name">Justin Finkenaur</Link>

      <div className="nav-pill">
        <nav className="nav-center">
          <ul className="nav-links">
            {[
              { href: "/", label: "Work" },
              { href: "/about", label: "About" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={p === href ? "active" : ""}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <a href="mailto:justin.finkenaur@gmail.com" className="site-cta">
        Get in touch
      </a>
    </header>
  );
}
