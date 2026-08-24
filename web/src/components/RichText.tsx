// Renders `**bold**` markers (from content/site.ts) as <strong>, keeping
// content data free of JSX while preserving the resume-style emphasis.
export function RichText({ text }: { text: string }) {
  const parts = text.split('**');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  );
}
