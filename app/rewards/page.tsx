'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WHEEL_REWARDS } from '@/lib/mockData';
import { useUser } from '@/lib/store/userStore';
import Link from 'next/link';

export default function SpinTheWheel() {
  const { isAuthenticated, user } = useUser();
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState<typeof WHEEL_REWARDS[0] | null>(null);
  const [spinsRemaining, setSpinsRemaining] = useState(1);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (!isAuthenticated || isSpinning || spinsRemaining === 0) return;

    setIsSpinning(true);

    // Calculate random rotation
    const randomIndex = Math.floor(Math.random() * WHEEL_REWARDS.length);
    const reward = WHEEL_REWARDS[randomIndex];
    const rotation = randomIndex * (360 / WHEEL_REWARDS.length) + 3600 + Math.random() * 30;

    // Apply rotation
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }

    // Show result after animation
    setTimeout(() => {
      setSelectedReward(reward);
      setSpinsRemaining(spinsRemaining - 1);
      setIsSpinning(false);
    }, 3000);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-16">
          <div className="container-custom max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Spin to Win!</h1>
            <p className="text-gray-600 mb-8">Sign in to your account to spin the wheel and earn rewards.</p>
            <Link href="/login" className="btn-primary inline-block">
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Spin the Wheel!</h1>
          <p className="text-center text-gray-600 mb-8">Daily chance to win amazing rewards</p>

          {/* User Info */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
                <p className="text-2xl font-bold text-secondary">{user?.rewardPoints || 0} Reward Points</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Spins Remaining Today</p>
                <p className="text-3xl font-bold text-secondary">{spinsRemaining}</p>
              </div>
            </div>
          </div>

          {/* Wheel Container */}
          <div className="bg-white rounded-lg p-12 mb-8 flex justify-center">
            <div className="relative w-72 h-72">
              {/* Wheel */}
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full transition-transform duration-[3s] ease-out"
                style={{
                  background: `conic-gradient(
                    ${WHEEL_REWARDS.map((r) => `${r.color} 0deg ${360 / WHEEL_REWARDS.length}deg`).join(', ')}
                  )`,
                }}
              >
                {WHEEL_REWARDS.map((reward, idx) => {
                  const angle = (idx * 360) / WHEEL_REWARDS.length + (360 / WHEEL_REWARDS.length) / 2;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 85;
                  const y = Math.sin(rad) * 85;

                  return (
                    <div
                      key={reward.id}
                      className="absolute w-full h-full flex items-center justify-center"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    >
                      <div
                        className="text-center text-white font-bold text-xs max-w-16 absolute"
                        style={{
                          transform: `translateY(-110px) rotate(-${angle}deg)`,
                        }}
                      >
                        {reward.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Circle */}
              <div className="absolute inset-0 rounded-full border-8 border-white m-8 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎁</span>
                </div>
              </div>

              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-secondary"></div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleSpin}
              disabled={isSpinning || spinsRemaining === 0}
              className={`px-12 py-4 text-xl font-bold rounded-lg transition-all ${
                isSpinning || spinsRemaining === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'btn-primary hover:shadow-lg'
              }`}
            >
              {isSpinning ? 'Spinning...' : spinsRemaining === 0 ? 'Come back tomorrow!' : 'SPIN THE WHEEL'}
            </button>
          </div>

          {/* Result */}
          {selectedReward && (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">🎉 Congratulations! You won:</p>
              <h3 className="text-3xl font-bold text-green-600 mb-4">{selectedReward.label}</h3>
              {selectedReward.type === 'coupon' && (
                <p className="text-lg font-mono bg-white p-3 rounded border-2 border-green-500 mb-4">
                  Code: {selectedReward.value}
                </p>
              )}
              {selectedReward.type === 'points' && (
                <p className="text-lg text-gray-700">+{selectedReward.value} Reward Points added to your account</p>
              )}
              {selectedReward.type === 'free_shipping' && (
                <p className="text-lg text-gray-700">Free shipping on your next order!</p>
              )}
            </div>
          )}

          {/* How It Works */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="font-bold mb-2">Sign In</h3>
                <p className="text-gray-600 text-sm">Create or sign into your SportHub account</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="font-bold mb-2">Spin Daily</h3>
                <p className="text-gray-600 text-sm">Get one free spin per day to win amazing prizes</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="font-bold mb-2">Claim Rewards</h3>
                <p className="text-gray-600 text-sm">Use your coupons or accumulate reward points</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
