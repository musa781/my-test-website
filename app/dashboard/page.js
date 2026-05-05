// app/dashboard/page.js
import connectToDatabase from '@/lib/mongodb';
import Pledge from '@/models/Pledge';

// 🌟 BASS YEH EK NAYI LINE ADD KARNI HAI 🌟
export const dynamic = 'force-dynamic';

// Next.js Server Component mein hum direct async function use kar sakte hain
export default async function DashboardPage() {
  // 1. Database se connect karein
  await connectToDatabase();

  // 2. Saare pledges fetch karein (Naye wale sab se oopar aayenge)
  const pledges = await Pledge.find({}).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">PledgePop Dashboard</h1>
          <div className="bg-black text-white px-4 py-2 rounded-lg font-semibold">
            Total Pledges: {pledges.length}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-center">Deposit</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              
              {pledges.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-500 text-lg">
                    Abhi tak koi pledge nahi aaya.
                  </td>
                </tr>
              ) : (
                pledges.map((pledge) => (
                  <tr key={pledge._id.toString()} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left font-medium">#{pledge.shopifyOrderId}</td>
                    <td className="py-3 px-6 text-left">{pledge.customerEmail}</td>
                    <td className="py-3 px-6 text-left truncate max-w-xs">{pledge.productTitle}</td>
                    <td className="py-3 px-6 text-center font-bold text-green-600">
                      ${pledge.depositPaid.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs font-semibold">
                        {pledge.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <a 
                        href={pledge.invoiceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 font-semibold underline"
                      >
                        View Invoice
                      </a>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}