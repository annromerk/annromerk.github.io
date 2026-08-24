import { CertIcon } from '@/components/icons';
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
            <div className="cert-card" key={cert.title}>
              <h3>{cert.title}</h3>
              <p>{cert.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
