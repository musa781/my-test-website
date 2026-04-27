import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-indigo-600 px-8 py-10 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">Muhammad Usama Sharif</h1>
          <p className="text-xl mt-2 text-indigo-200 font-semibold">Full Stack Developer</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-indigo-100">
            <span>📍 Johr Town, Lahore</span>
            <span>📧 sharifusama351@gmail.com</span>
            <span>📞 +923079600970</span>
          </div>
        </div>

        <div className="px-8 py-10 space-y-12">
          
          {/* Professional Summary */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-100 pb-2 mb-4">
              Professional Summary
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Computer Science graduate seeking a job opportunity in Full Stack Development. 
              Hands-on experience in building web-based and machine learning projects, integrating 
              frontend with backend services, and working with modern JavaScript frameworks i.e ReactJs, 
              Express, NodeJs, etc. Passionate about AI, NLP, and scalable full-stack systems.
            </p>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-100 pb-2 mb-6">
              Work Experience
            </h2>
            <div className="space-y-8">
              {/* Job 1 */}
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-indigo-600">Backend Development Intern</h3>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">July 2025 - Jan 2026</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 mt-1">Soft Pulse</p>
                <ul className="mt-3 list-disc list-inside text-gray-600 space-y-1">
                  <li>Worked on Shopify apps with React-Based user interface.</li>
                  <li>Created plugins with Remix (React-Router v7).</li>
                  <li>Contributed to the design of new features and improvements for existing products.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-indigo-600">Web Developer Intern</h3>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Jun 2024 - Aug 2024</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 mt-1">VisaBridge</p>
                <ul className="mt-3 list-disc list-inside text-gray-600 space-y-1">
                  <li>Worked on React-based user interfaces and component-driven development.</li>
                  <li>Integrated frontend components with backend APIs.</li>
                  <li>Improved UI responsiveness and code structure.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-100 pb-2 mb-6">
              University Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project 1 */}
              <div className="border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-600 text-lg">VisionFlow Plus (FYP)</h3>
                <p className="text-sm text-gray-500 mb-2">Apr 2024 - Dec 2024</p>
                <p className="text-gray-600 text-sm">Computer vision platform for training and testing custom ML models. Integrated multiple data formats using Python, OpenCV, FastAPI, and Node.js.</p>
              </div>
              
              {/* Project 2 */}
              <div className="border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-600 text-lg">Fake News Detection</h3>
                <p className="text-sm text-gray-500 mb-2">Feb 2024 - Apr 2024</p>
                <p className="text-gray-600 text-sm">Built deep learning models to classify fake vs genuine news using NLP preprocessing and text classification techniques in Python.</p>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-100 pb-2 mb-4">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Python', 'JavaScript', 'React.js', 'Node.js', 'Express', 'MongoDB', 'HTML/CSS/jQuery', 'Git & GitHub', 'Frontend & Backend Integration'].map((skill) => (
                <span key={skill} className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-100 pb-2 mb-4">
              Academic History
            </h2>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Bachelor of Computer Science</h3>
              <p className="text-indigo-600 font-medium">COMSATS University Islamabad, Wah Campus</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}