import Link from 'next/link';

export default async function BlogPage() {
  // REST API se fake blog posts fetch kar rahe hain (Limit: 6 posts)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6', {
    next: { revalidate: 3600 } // 1 ghante baad data refresh hoga
  });
  const posts = await res.json();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans text-gray-100 py-20 px-6 sm:px-12">
      
      {/* Animated Background Blobs (Theme Consistency) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-600/40 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-rose-600/40 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-[20%] right-[10%] w-80 h-80 rounded-full bg-amber-500/30 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "4s" }}></div>
      <div className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full bg-teal-500/30 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "6s" }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 text-sm font-medium text-purple-300 backdrop-blur-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-ping absolute"></span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-400 relative"></span>
            Latest Articles
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 mb-6 tracking-tighter drop-shadow-lg">
            Blog & Insights ✍️
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our latest thoughts, tutorials, and updates on backend development and headless commerce.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="group relative bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md overflow-hidden flex flex-col"
            >
              {/* Glossy overlay effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex-grow">
                {/* Title (Capitalized via CSS) */}
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-purple-300 transition-colors duration-300 capitalize">
                  {post.title}
                </h2>
                {/* Body (Truncated after 3 lines) */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                  {post.body}
                </p>
              </div>

              {/* Read More Link / Button Area */}
              <div className="relative z-10 mt-auto pt-5 border-t border-white/10">
                <Link 
                  href={`/blog/${post.id}`} 
                  className="inline-flex items-center text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Read Article 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}