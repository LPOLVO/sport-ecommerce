'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/lib/store/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { isAuthenticated, user, logout } = useUser();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="bg-white rounded-lg p-6 h-fit shadow-md">
              <div className="text-center mb-6">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <div className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full text-white text-sm font-bold inline-block">
                  {user?.tier?.toUpperCase()} TIER
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/dashboard" className="block px-4 py-2 bg-secondary text-white rounded-lg">
                  Dashboard
                </Link>
                <Link href="/dashboard/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Order History
                </Link>
                <Link href="/dashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Profile Settings
                </Link>
                <Link href="/rewards" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Spin the Wheel
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-left"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Reward Points */}
              <div className="bg-gradient-to-r from-secondary to-orange-500 text-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-2">Reward Points</h2>
                <p className="text-4xl font-bold">{user?.rewardPoints}</p>
                <p className="text-sm mt-4 opacity-90">Points can be redeemed for discounts on future purchases</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-600 text-sm mb-1">Total Spent</p>
                  <p className="text-3xl font-bold">$1,299.95</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-600 text-sm mb-1">Items Wishlist</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold">Order #12345</p>
                        <p className="text-sm text-gray-600">Oct 25, 2026</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Delivered</span>
                    </div>
                    <p className="text-gray-700">Pro Running Shoes + 2 more items</p>
                    <p className="font-bold text-lg mt-2">$349.97</p>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold">Order #12344</p>
                        <p className="text-sm text-gray-600">Oct 18, 2026</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Shipped</span>
                    </div>
                    <p className="text-gray-700">Adjustable Dumbbells Set</p>
                    <p className="font-bold text-lg mt-2">$199.99</p>
                  </div>
                </div>

                <Link href="/dashboard/orders" className="btn-secondary block text-center mt-6 w-full">
                  View All Orders
                </Link>
              </div>

              {/* Loyalty Program */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">SportHub Loyalty Program</h2>
                <p className="text-gray-700 mb-6">
                  You're a valued {user?.tier?.toUpperCase()} member! Enjoy exclusive benefits:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Free shipping on all orders
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Early access to new products
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> 2x reward points on all purchases
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Exclusive birthday discount
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
