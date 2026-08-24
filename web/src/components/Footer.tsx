import { MessageCircleIcon } from 'lucide-react';
import { ContactRow } from '@/components/ContactRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// The ladder-simulator page uses a bare copyright-only footer (no CTA or
// contact row) — matches the legacy ladder-simulator.html markup.
export function Footer({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container">
        {!minimal && (
          <Card className="footer-cta-card">
            <CardHeader className="footer-cta-header">
              <div className="footer-cta-icon">
                <MessageCircleIcon />
              </div>
              <CardTitle className="footer-cta-title">
                Think I&apos;d be a good fit? I&apos;d love to talk.
              </CardTitle>
            </CardHeader>
            <CardContent className="footer-cta-content">
              <ContactRow />
            </CardContent>
          </Card>
        )}
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Anthony Romero</p>
      </div>
    </footer>
  );
}
