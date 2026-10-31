import Reveal from "./Reveal";

export default function Section({
  id,
  title,
  eyebrow,
  children,
  className = "",
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-16 px-4 py-16 md:py-24 ${className}`}>
      <Reveal className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-caramel">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">{title}</h2>
        </div>
        {children}
      </Reveal>
    </section>
  );
}
