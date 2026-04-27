// Sab se oopar ye import lazmi likhna hai
import Link from 'next/link';

export default function Home() {
  return (
    <div className=" p-20">
      <h1 className="text-4xl font-bold">Salam! Ye Meri Pehli Next.js Site Hai 🚀</h1>
      <p className="mt-4 text-gray-600">Main abhi Next.js seekh raha hoon.</p>
      
      {/* Ye hamara naya button hai */}
      <div className='flex gap-6'>
      <div className="mt-8">

        <Link href="/about" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
          Mere Baare Mein Janiye ➡️
        </Link>
      </div>
      <div className="mt-8">
        <Link href="/products" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
          Products ➡️
        </Link>
      </div>
      </div>
    </div>
  );
}