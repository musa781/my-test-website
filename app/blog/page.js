import Link from 'next/link';

// Dekhein, humne component ko 'async' bana diya hai
export default async function BlogList() {
  
  // 1. API se data fetch kar rahe hain
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const allPosts = await res.json();
  
  // 2. Sirf pehli 5 posts nikal rahe hain taake list zyada lambi na ho
  const posts = allPosts.slice(0, 5);

  return (
    <div className="p-20">
      <h1 className="text-4xl font-bold mb-8">Demo API Blog 🌐</h1>
      
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-grey">
            <h2 className="text-2xl font-semibold text-indigo-600 capitalize">
              {/* API se aane wale data mein 'id' hoti hai, to hum slug ki jagah id pass kar rahe hain */}
              <Link href={`/blog/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-500 mt-2 line-clamp-2">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}