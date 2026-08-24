import { EmailIcon, LinkedInIcon, ResumeIcon } from '@/components/icons';

export function ContactRow({ className }: { className?: string }) {
  const cls = className ? `contact-row ${className}` : 'contact-row';
  return (
    <div className={cls}>
      <a className="contact-link" href="/assets/resume/Anthony_Romero_Resume.docx" download>
        <ResumeIcon />
        Résumé
      </a>
      <a className="contact-link" href="https://www.linkedin.com/in/anromerk" target="_blank" rel="noopener">
        <LinkedInIcon />
        LinkedIn
      </a>
      <a className="contact-link" href="mailto:anromero@proton.me">
        <EmailIcon />
        Email
      </a>
    </div>
  );
}
