import { RichText } from '@/components/RichText';
import { FaqIcon } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '@/content/site';

const allOpen = faqs.map((_, i) => `faq-${i}`);

export function Faq() {
  return (
    <section className="section section-alt" id="faq">
      <div className="container">
        <h2 className="section-title">
          <FaqIcon />
          Things You Might Be Wondering
        </h2>
        <Accordion className="faq-accordion" multiple defaultValue={allOpen}>
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="faq-item">
              <AccordionTrigger className="faq-trigger">{item.q}</AccordionTrigger>
              <AccordionContent className="faq-content">
                <RichText text={item.a} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
