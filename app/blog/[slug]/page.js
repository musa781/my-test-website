// Function async hona chahiye taake hum await use kar sakein
export default async function BlogPost({ params }) {
  // 1. URL se ID nikal rahe hain (hamare folder ka naam [slug] hai isliye variable ka naam bhi slug hai)
  const resolvedParams = await params;
  const postId = resolvedParams.slug; 

  // 2. Us specific ID ki post API se mangwa rahe hain (REST API)
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await res.json();

  return (
    <div className="p-20 max-w-3xl mx-auto bg-grey min-h-screen">
      {/* API se aane wala title dikha rahe hain */}
      <h1 className="text-4xl font-bold text-indigo-700 capitalize mb-6">
        {post.title}
      </h1>
      
      {/* API se aane wala post ka body/content dikha rahe hain */}
      <p className="text-xl text-gray-700 leading-relaxed ">
        {post.body}
      </p>
    </div>
  );
}