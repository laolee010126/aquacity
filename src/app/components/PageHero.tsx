interface PageHeroProps {
  title: string;
  description: string;
  gradient?: string;
}

export function PageHero({
  title,
  description,
  gradient = "from-blue-600 to-cyan-600"
}: PageHeroProps) {
  return (
    <section className={`py-12 md:py-20 bg-gradient-to-r ${gradient} text-white`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl opacity-95">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
