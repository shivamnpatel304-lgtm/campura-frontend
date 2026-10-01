export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="hero-pattern border-b border-[#e7dcc5] px-6 py-20 text-center lg:py-28">
      <div className="mx-auto max-w-4xl reveal">
        <div className="mb-5 text-xs font-semibold tracking-[.35em] text-[#a2761d]">{eyebrow}</div>
        <h1 className="font-display text-5xl leading-none text-[#123d29] md:text-7xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#665d49] md:text-base">{description}</p>
      </div>
    </section>
  );
}