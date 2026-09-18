import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="section-container footer-grid">
        <div>
          <div className="footer-brand">FlowtechAM</div>
          <p>Tecnologia aplicada à operação das empresas.</p>
          <p>Manaus — Amazonas</p>
        </div>
        <nav className="footer-links" aria-label="Links de contato">
          <Link href="/sites">Sites</Link>
          <Link href="/crm-whatsapp">CRM + WhatsApp</Link>
          <Link href="/sistemas">Sistemas</Link>
          <Link href="/#diagnostico">Diagnóstico</Link>
        </nav>
        <div className="copyright">© 2026 FlowtechAM</div>
      </div>
    </footer>
  );
}
