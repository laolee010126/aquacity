interface HeroSectionProps {}

export function HeroSection({}: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Design that
            <span className="block text-blue-600">makes sense</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            We create beautiful, functional designs that help your business grow. 
            From concept to completion, we bring your vision to life with precision and creativity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
              View Our Work
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-gray-400 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-lg mx-auto mb-6 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl"></div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Featured Project</h3>
                  <p className="text-gray-600">Modern design meets functionality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}