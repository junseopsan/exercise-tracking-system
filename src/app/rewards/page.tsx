'use client';

import { useState } from 'react';
import Link from 'next/link';

// 보상 타입 정의
interface Reward {
  id: string;
  type: 'badge' | 'coupon' | 'cash';
  title: string;
  description: string;
  value?: string;
  image: string;
  expiryDate?: string;
  isUsed?: boolean;
}

export default function RewardsPage() {
  // 보상 필터 상태
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // 샘플 보상 데이터
  const rewards: Reward[] = [
    {
      id: 'r1',
      type: 'badge',
      title: '첫 운동 배지',
      description: '첫 운동을 기록한 것을 축하합니다!',
      image: '/images/badge-first-workout.svg',
    },
    {
      id: 'r2',
      type: 'coupon',
      title: '30% 할인 쿠폰',
      description: '오늘 5,000보 걷기 미션 달성 보상',
      value: '30% 할인',
      image: '/images/coupon-discount.svg',
      expiryDate: '2024-04-30',
    },
    {
      id: 'r3',
      type: 'cash',
      title: '5,000원 포인트',
      description: '3km 달리기 미션 달성 보상',
      value: '5,000P',
      image: '/images/points.svg',
    },
    {
      id: 'r4',
      type: 'badge',
      title: '꾸준함 배지',
      description: '5일 연속 운동 기록 달성',
      image: '/images/badge-consistency.svg',
    },
    {
      id: 'r5',
      type: 'coupon',
      title: '커피 쿠폰',
      description: '회사 주변 산책로 완주 미션 달성 보상',
      value: '아메리카노 1잔',
      image: '/images/coupon-coffee.svg',
      expiryDate: '2024-04-15',
      isUsed: true,
    },
    {
      id: 'r6',
      type: 'cash',
      title: '3,000원 포인트',
      description: '주간 걸음 수 목표 달성 보상',
      value: '3,000P',
      image: '/images/points.svg',
    },
    {
      id: 'r7',
      type: 'badge',
      title: '얼리버드 배지',
      description: '5일 연속 아침 운동 미션 달성',
      image: '/images/badge-early-bird.svg',
    },
    {
      id: 'r8',
      type: 'coupon',
      title: '20% 할인 쿠폰',
      description: '주간 10km 달성 미션 보상',
      value: '20% 할인',
      image: '/images/coupon-discount.svg',
      expiryDate: '2024-05-15',
    },
  ];

  // 필터링된 보상 목록
  const filteredRewards = activeFilter === 'all' 
    ? rewards 
    : rewards.filter(reward => {
        if (activeFilter === 'used') return reward.isUsed;
        if (activeFilter === 'unused') return !reward.isUsed && reward.type !== 'badge';
        return reward.type === activeFilter;
      });

  // 보상 타입에 따른 스타일 및 텍스트
  const rewardTypeStyles = {
    badge: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      darkBg: 'dark:bg-purple-900',
      darkText: 'dark:text-purple-200',
      label: '배지',
    },
    coupon: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      darkBg: 'dark:bg-green-900',
      darkText: 'dark:text-green-200',
      label: '쿠폰',
    },
    cash: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      darkBg: 'dark:bg-blue-900',
      darkText: 'dark:text-blue-200',
      label: '포인트',
    },
  };

  // 포인트 합계 계산
  const totalPoints = rewards
    .filter(reward => reward.type === 'cash')
    .reduce((sum, reward) => {
      const pointValue = parseInt(reward.value?.replace(/[^0-9]/g, '') || '0');
      return sum + pointValue;
    }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              운동 챌린지
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/tracking" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                운동 기록
              </Link>
              <Link href="/missions" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                미션
              </Link>
              <Link href="/rewards" className="text-blue-600 font-medium dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">
                보상
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                랭킹
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">보상</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">내 보상</h2>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeFilter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                    }`}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setActiveFilter('badge')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeFilter === 'badge'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                    }`}
                  >
                    배지
                  </button>
                  <button
                    onClick={() => setActiveFilter('coupon')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeFilter === 'coupon'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                    }`}
                  >
                    쿠폰
                  </button>
                  <button
                    onClick={() => setActiveFilter('cash')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeFilter === 'cash'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                    }`}
                  >
                    포인트
                  </button>
                  <button
                    onClick={() => setActiveFilter('unused')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeFilter === 'unused'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                    }`}
                  >
                    미사용
                  </button>
                  <button
                    onClick={() => setActiveFilter('used')}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeFilter === 'used'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                    }`}
                  >
                    사용완료
                  </button>
                </div>
              </div>

              {filteredRewards.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">해당하는 보상이 없습니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRewards.map((reward) => (
                    <div 
                      key={reward.id} 
                      className={`bg-white dark:bg-gray-800 border rounded-lg overflow-hidden ${
                        reward.isUsed 
                          ? 'border-gray-200 dark:border-gray-700 opacity-60' 
                          : 'border-blue-200 dark:border-blue-800 shadow-sm'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <img 
                              src={reward.image} 
                              alt={reward.title} 
                              className="w-12 h-12 mr-4 rounded-md"
                            />
                            <div>
                              <h3 className="font-bold text-gray-800 dark:text-white">{reward.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{reward.description}</p>
                            </div>
                          </div>
                          <span className={`${rewardTypeStyles[reward.type].bg} ${rewardTypeStyles[reward.type].text} ${rewardTypeStyles[reward.type].darkBg} ${rewardTypeStyles[reward.type].darkText} text-xs px-2 py-1 rounded`}>
                            {rewardTypeStyles[reward.type].label}
                          </span>
                        </div>
                        
                        {reward.value && (
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {reward.value}
                          </p>
                        )}
                        
                        {reward.expiryDate && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            유효기간: {reward.expiryDate}까지
                          </p>
                        )}
                        
                        {reward.type !== 'badge' && (
                          <div className="mt-4">
                            {reward.isUsed ? (
                              <button 
                                className="w-full py-2 bg-gray-300 text-gray-700 rounded-md cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                                disabled
                              >
                                사용완료
                              </button>
                            ) : (
                              <button 
                                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                onClick={() => alert(`${reward.title}을(를) 사용했습니다!`)}
                              >
                                사용하기
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">포인트 현황</h2>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {totalPoints.toLocaleString()}P
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  사용 가능한 포인트
                </p>
              </div>
              <div className="mt-6">
                <button 
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => alert('포인트 사용 페이지로 이동합니다.')}
                >
                  포인트 사용하기
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">배지 컬렉션</h2>
              <div className="grid grid-cols-3 gap-4">
                {rewards
                  .filter(reward => reward.type === 'badge')
                  .map(badge => (
                    <div key={badge.id} className="text-center">
                      <img 
                        src={badge.image} 
                        alt={badge.title} 
                        className="w-16 h-16 mx-auto mb-2"
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate" title={badge.title}>
                        {badge.title}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/badges" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                  모든 배지 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">다가오는 보상</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            현재 진행 중인 미션을 완료하면 받을 수 있는 보상입니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-dashed border-blue-300 dark:border-blue-700">
              <div className="flex items-center mb-4">
                <img 
                  src="/images/points.svg" 
                  alt="미션 보상" 
                  className="w-12 h-12 mr-4 rounded-md opacity-70"
                />
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">10,000원 상당 포인트</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">한 달 50km 달성 미션 보상</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '12%' }}></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">진행률: 12% (6/50km)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-dashed border-blue-300 dark:border-blue-700">
              <div className="flex items-center mb-4">
                <img 
                  src="/images/coupon-discount.svg" 
                  alt="미션 보상" 
                  className="w-12 h-12 mr-4 rounded-md opacity-70"
                />
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">20% 할인 쿠폰</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">주간 10km 달성 미션 보상</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '30%' }}></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">진행률: 30% (3/10km)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-dashed border-blue-300 dark:border-blue-700">
              <div className="flex items-center mb-4">
                <img 
                  src="/images/badge-early-bird.svg" 
                  alt="미션 보상" 
                  className="w-12 h-12 mr-4 rounded-md opacity-70"
                />
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">얼리버드 배지</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">아침 운동 5일 연속 미션 보상</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">진행률: 60% (3/5일)</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 