interface WorkSectionProps {}

export function WorkSection({}: WorkSectionProps) {
  const projects = [
    {
      title: "E-commerce Platform",
      category: "Web Design",
      image: "bg-gradient-to-br from-pink-400 to-red-500"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Design",
      image: "bg-gradient-to-br from-blue-400 to-cyan-500"
    },
    {
      title: "Brand Identity",
      category: "Branding",
      image: "bg-gradient-to-br from-green-400 to-blue-500"
    },
    {
      title: "Dashboard Design",
      category: "UI/UX",
      image: "bg-gradient-to-br from-purple-400 to-pink-500"
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Recent work
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of our latest projects and creative solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className={`w-full h-64 ${project.image} rounded-2xl mb-6 transform group-hover:scale-105 transition-transform shadow-lg group-hover:shadow-xl`}>
                <div className="w-full h-full bg-black/20 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-8 h-8 bg-white rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-2">{project.category}</div>
              <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}