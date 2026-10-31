'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/lib/store/userStore';
import { useRouter } from 'next/navigation';

export default function ProfileSettings() {
  const { isAuthenticated, user, updateProfile } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    updateProfile({
      name: formData.name,
      email: formData.email,
    });
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            {/* User Avatar & Name */}
            <div className="text-center mb-8">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <div className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full text-white text-sm font-bold inline-block">
                {user?.tier?.toUpperCase()} TIER
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                ) : (
                  <p className="text-gray-700 py-2">{user?.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                ) : (
                  <p className="text-gray-700 py-2">{user?.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Reward Points</label>
                <p className="text-secondary font-bold text-lg py-2">{user?.rewardPoints} points</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 btn-primary"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                      });
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-bold mb-4">Account Information</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Member since: October 15, 2026</p>
                <p>Total Orders: 5</p>
                <p>Total Spent: $1,299.95</p>
                <p>
                  Account Status: <span className="text-green-600 font-semibold">Active</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
