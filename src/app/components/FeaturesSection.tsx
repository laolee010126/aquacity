interface FeaturesSectionProps {}

export function FeaturesSection({}: FeaturesSectionProps) {
  const features = [
    {
      title: "Creative Design",
      description: "Innovative designs that capture your brand's essence and engage your audience.",
      icon: "🎨"
    },
    {
      title: "User Experience",
      description: "Intuitive interfaces that provide seamless user experiences across all devices.",
      icon: "✨"
    },
    {
      title: "Brand Identity",
      description: "Comprehensive brand strategies that make your business stand out from the competition.",
      icon: "🚀"
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What we do best
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We specialize in creating digital experiences that drive results and inspire action.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}