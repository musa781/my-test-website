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

  // 🌟 NAYA: Analytics Calculations 🌟
  const totalPledges = pledges.length;
  let totalRevenueCollected = 0;
  let pendingRevenue = 0;

  pledges.forEach((pledge) => {
    // Hum sirf $2 ka deposit consider kar rahe hain abhi. 
    // Agar future mein product price database mein save ki, toh total amount yahan aayegi.
    if (pledge.status === 'Completed') {
      totalRevenueCollected += pledge.depositPaid; 
    } else {
      pendingRevenue += pledge.depositPaid;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">PledgePop Dashboard</h1>
        </div>

        {/* 🌟 NAYA: Analytics Cards Section 🌟 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Total Pledges */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 border-l-4 border-l-purple-500">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Pledges</h3>
            <div className="text-3xl font-bold text-gray-800">{totalPledges}</div>
            <p className="text-sm text-gray-400 mt-2">Overall campaign participation</p>
          </div>

          {/* Card 2: Revenue Collected */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 border-l-4 border-l-green-500">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Deposit Collected</h3>
            <div className="text-3xl font-bold text-gray-800">${totalRevenueCollected.toFixed(2)}</div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Completed Payments
            </p>
          </div>

          {/* Card 3: Pending Revenue */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 border-l-4 border-l-yellow-500">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Pending Deposits</h3>
            <div className="text-3xl font-bold text-gray-800">${pendingRevenue.toFixed(2)}</div>
            <p className="text-sm text-yellow-600 mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Awaiting Balance Payment
            </p>
          </div>

        </div>
        {/* 🌟 ------------------------------ 🌟 */}

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6 text-center">Deposit</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Action</th>
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
                  <tr key={pledge._id.toString()} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-left font-medium text-gray-700">#{pledge.shopifyOrderId}</td>
                    <td className="py-4 px-6 text-left">{pledge.customerEmail}</td>
                    <td className="py-4 px-6 text-left truncate max-w-xs">{pledge.productTitle}</td>
                    <td className="py-4 px-6 text-center font-bold text-green-600">
                      ${pledge.depositPaid.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        pledge.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {pledge.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <a 
                        href={pledge.invoiceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
                      >
                        {pledge.status === 'Completed' ? 'View Receipt' : 'View Invoice'}
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