import { RichText } from '@/components/RichText';
import { FaqIcon } from '@/components/icons';
import { faqs } from '@/content/site';

export function Faq() {
  return (
    <section className="section section-alt" id="faq">
      <div className="container">
        <h2 className="section-title">
          <FaqIcon />
          Things You Might Be Wondering
        </h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <div className="faq-item" key={item.q}>
              <h3>{item.q}</h3>
              <p>
                <RichText text={item.a} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
