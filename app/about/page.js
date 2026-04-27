import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans text-gray-100 py-20 px-6 sm:px-12">
      {/* Animated Background Blobs (Same as Product page) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-600/40 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-rose-600/40 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-[20%] right-[10%] w-80 h-80 rounded-full bg-amber-500/30 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "4s" }}></div>
      <div className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full bg-teal-500/30 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "6s" }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 text-sm font-medium text-rose-300 backdrop-blur-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping absolute"></span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-400 relative"></span>
            Developer Portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-400 to-fuchsia-600 mb-6 tracking-tighter drop-shadow-lg">
            About Me 👨‍💻
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Building scalable backend systems and premium Next.js experiences.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          
          {/* Intro Card */}
          <div className="group relative bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white group-hover:text-amber-200 transition-colors duration-300">Muhammad Usama Sharif</h2>
              <p className="text-xl text-rose-300 mt-2 font-medium tracking-wide">Backend Developer</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1 bg-white/5 px-4 py-2 rounded-full border border-white/10">📍 Johr Town, Lahore</span>
                <span className="flex items-center gap-1 bg-white/5 px-4 py-2 rounded-full border border-white/10">📧 sharifusama351@gmail.com</span>
                <span className="flex items-center gap-1 bg-white/5 px-4 py-2 rounded-full border border-white/10">📞 +923079600970</span>
              </div>
              <p className="text-gray-300 mt-6 leading-relaxed font-light text-lg">
                Computer Science graduate seeking a job opportunity in Web Backend Development. Hands-on experience in building web-based and machine learning projects, integrating frontend with backend services, and working with modern JavaScript frameworks i.e ReactJs, Express, NodeJs, etc. Passionate about AI, NLP, and scalable full-stack systems.
              </p>
            </div>
          </div>

          {/* Experience Card */}
          <div className="group relative bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 mb-8">Work Experience 💼</h2>
            
            <div className="mb-10 relative pl-6 border-l-2 border-white/10">
              <div className="absolute w-3 h-3 bg-teal-400 rounded-full -left-[7px] top-2 shadow-[0_0_10px_#2dd4bf]"></div>
              <h3 className="text-xl font-bold text-white">Backend Development Intern @ Soft Pulse</h3>
              <p className="text-teal-200 text-sm mb-4 mt-1 tracking-wider">July 2025 - Jan 2026</p>
              <ul className="text-gray-400 space-y-2 font-light">
                <li>• Worked on Shopify apps with React-Based user interface.</li>
                <li>• Created plugins with Remix (React-Router v7).</li>
                <li>• Contributed to the design of new features.</li>
              </ul>
            </div>

            <div className="relative pl-6 border-l-2 border-white/10">
              <div className="absolute w-3 h-3 bg-emerald-400 rounded-full -left-[7px] top-2 shadow-[0_0_10px_#34d399]"></div>
              <h3 className="text-xl font-bold text-white">Web Developer Intern @ VisaBridge</h3>
              <p className="text-teal-200 text-sm mb-4 mt-1 tracking-wider">Jun 2024 - Aug 2024</p>
              <ul className="text-gray-400 space-y-2 font-light">
                <li>• Worked on React-based user interfaces and component-driven development.</li>
                <li>• Integrated frontend components with backend APIs.</li>
              </ul>
            </div>
          </div>

          {/* Projects & Skills Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-fuchsia-400 mb-6">Projects 🚀</h2>
              <div className="mb-6 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="font-bold text-white text-lg mb-2">VisionFlow Plus (FYP)</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">Computer vision platform integrating Python, OpenCV, FastAPI, and Node.js.</p>
              </div>
              <div className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="font-bold text-white text-lg mb-2">Fake News Detection</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">Deep learning models for NLP classification using Python.</p>
              </div>
            </div>

            <div className="group relative bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 mb-6">Skills 🛠️</h2>
              <div className="flex flex-wrap gap-3">
                 {['Python', 'React.js', 'Node.js', 'MongoDB', 'Git/GitHub', 'Express', 'Next.js', 'Tailwind CSS'].map(skill => (
                   <span key={skill} className="bg-white/5 px-4 py-2 rounded-xl text-gray-300 text-sm border border-white/10 hover:bg-white/20 hover:border-amber-300/50 hover:text-amber-200 transition-all cursor-default">
                     {skill}
                   </span>
                 ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}