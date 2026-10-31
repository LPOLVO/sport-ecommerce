'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/lib/store/userStore';
import { useRouter } from 'next/navigation';

export default function OrderHistory() {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const orders = [
    {
      id: '12345',
      date: 'Oct 25, 2026',
      status: 'Delivered',
      statusColor: 'green',
      items: 3,
      total: 349.97,
    },
    {
      id: '12344',
      date: 'Oct 18, 2026',
      status: 'Shipped',
      statusColor: 'blue',
      items: 1,
      total: 199.99,
    },
    {
      id: '12343',
      date: 'Oct 10, 2026',
      status: 'Delivered',
      statusColor: 'green',
      items: 2,
      total: 249.98,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Order History</h1>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">Order ID</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">Items</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">Status</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-800">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold">#{order.id}</td>
                      <td className="px-6 py-4 text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 text-gray-600">{order.items} item(s)</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.statusColor === 'green'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold">${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
