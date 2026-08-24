import { ContactRow } from '@/components/ContactRow';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-cta">Think I&apos;d be a good fit? I&apos;d love to talk.</p>
        <ContactRow className="footer-contact-row" />
        <p>&copy; {new Date().getFullYear()} Anthony Romero</p>
      </div>
    </footer>
  );
}
