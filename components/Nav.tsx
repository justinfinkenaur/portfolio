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
    "nav",
    !isLight ? "dark-bg" : "",
    scrolled ? "scrolled" : "",
  ].filter(Boolean).join(" ");

  return (
    <header className={navClass}>
      <Link href="/" className={`nav-logo ${isLight && !scrolled ? "dark" : isLight ? "dark" : scrolled ? "dark" : "light"}`}>
        Justin Finkenaur
      </Link>
      <nav>
        <ul className="nav-links">
          {[
            { href: "/", label: "Work" },
            { href: "/about", label: "About" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${isLight || scrolled ? "dark" : "light"} ${p === href ? "active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
