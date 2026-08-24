import { ContactRow } from '@/components/ContactRow';

// The ladder-simulator page uses a bare copyright-only footer (no CTA or
// contact row) — matches the legacy ladder-simulator.html markup.
export function Footer({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container">
        {!minimal && (
          <>
            <p className="footer-cta">Think I&apos;d be a good fit? I&apos;d love to talk.</p>
            <ContactRow className="footer-contact-row" />
          </>
        )}
        <p>&copy; {new Date().getFullYear()} Anthony Romero</p>
      </div>
    </footer>
  );
}
