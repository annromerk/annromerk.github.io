import { EmailIcon, LinkedInIcon, ResumeIcon } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ContactRow({ className }: { className?: string }) {
  const cls = className ? `contact-row ${className}` : 'contact-row';
  return (
    <div className={cls}>
      <a
        className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'h-auto px-3.5 py-2 text-[0.85rem]')}
        href="/assets/resume/Anthony_Romero_Resume.docx"
        download
      >
        <ResumeIcon />
        Résumé
      </a>
      <a
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-auto px-3.5 py-2 text-[0.85rem]')}
        href="https://www.linkedin.com/in/anromerk"
        target="_blank"
        rel="noopener"
      >
        <LinkedInIcon />
        LinkedIn
      </a>
      <a
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-auto px-3.5 py-2 text-[0.85rem]')}
        href="mailto:anromero@proton.me"
      >
        <EmailIcon />
        Email
      </a>
    </div>
  );
}
