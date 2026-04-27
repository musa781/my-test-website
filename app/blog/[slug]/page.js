import Link from 'next/link';

// Function async hona chahiye taake hum await use kar sakein
export default async function BlogPost({ params }) {
  // 1. URL se ID nikal rahe hain
  const resolvedParams = await params;
  const postId = resolvedParams.slug; 

  // 2. Us specific ID ki post API se mangwa rahe hain (REST API)
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await res.json();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans text-gray-100 py-20 px-6 sm:px-12">
      
      {/* Animated Background Blobs (Theme Consistency) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-600/40 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-rose-600/40 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-[20%] right-[10%] w-80 h-80 rounded-full bg-amber-500/30 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "4s" }}></div>
      <div className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full bg-teal-500/30 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "6s" }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-300">←</span> 
            Back to Articles
          </Link>
        </div>

        {/* Content Card (Glassmorphism) */}
        <div className="relative bg-white/5 p-10 md:p-16 rounded-[3rem] border border-white/10 backdrop-blur-xl shadow-2xl">
          
          {/* Subtle internal top glow for the card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-500/20 blur-[80px] pointer-events-none"></div>

          <div className="relative z-10">
            {/* Tag / Meta info */}
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 text-xs font-bold tracking-widest text-rose-300 uppercase bg-rose-500/10 border border-rose-500/20 rounded-full">
                Article #{postId}
              </span>
            </div>

            {/* API se aane wala title */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 mb-10 capitalize tracking-tight leading-tight">
              {post.title}
            </h1>
            
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-10"></div>

            {/* API se aane wala post ka body/content */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              {post.body}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}