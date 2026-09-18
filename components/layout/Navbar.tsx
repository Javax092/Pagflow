"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/#cases", label: "Cases" },
  { href: "/#metodo", label: "Método" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="section-container nav-inner">
        <Link className="brand" href="/" aria-label="FlowtechAM, início">
          <span>FLOWTECH</span><i aria-hidden="true" />AM
        </Link>
        <nav className="nav-links" aria-label="Navegação principal">
          <details className="solutions-menu"><summary>Soluções</summary><div><Link href="/sites">Sites</Link><Link href="/crm-whatsapp">CRM + WhatsApp</Link><Link href="/sistemas">Sistemas personalizados</Link></div></details>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Button href="/#diagnostico" className="nav-diagnostic">Analisar minha operação</Button>
        </div>
      </div>
    </header>
  );
}
