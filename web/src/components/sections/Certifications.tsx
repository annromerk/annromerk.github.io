import { CertIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { certifications } from '@/content/site';

export function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <h2 className="section-title">
          <CertIcon />
          Certifications &amp; Education
        </h2>
        <div className="cert-grid">
          {certifications.map((cert) => (
            <Card className="cert-card" key={cert.title}>
              <CardHeader className="p-0">
                <CardTitle className="text-[1rem] leading-tight font-semibold text-[var(--text)]">
                  {cert.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-[0.9rem] text-[var(--text-dim)]">{cert.org}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
