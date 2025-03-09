'use client';

import { useState } from 'react';
import Link from 'next/link';

// 미션 타입 정의
interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'daily' | 'weekly' | 'monthly' | 'group';
  target: number;
  unit: string;
  reward: {
    type: 'cash' | 'coupon' | 'badge';
    value: string;
  };
  participants: number;
  progress?: number;
  status: 'available' | 'in_progress' | 'completed';
}

export default function MissionsPage() {
  // 미션 필터 상태
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // 샘플 미션 데이터
  const missions: Mission[] = [
    {
      id: 'm1',
      title: '오늘 5,000보 걷기',
      description: '하루 동안 5,000보를 걸어 기초 체력을 기르세요.',
      difficulty: 'easy',
      type: 'daily',
      target: 5000,
      unit: '보',
      reward: {
        type: 'coupon',
        value: '30% 할인 쿠폰',
      },
      participants: 42,
      progress: 45,
      status: 'in_progress',
    },
    {
      id: 'm2',
      title: '3km 달리기',
      description: '3km를 달려 심폐 지구력을 향상시키세요.',
      difficulty: 'medium',
      type: 'daily',
      target: 3,
      unit: 'km',
      reward: {
        type: 'cash',
        value: '5,000원 상당 포인트',
      },
      participants: 28,
      status: 'available',
    },
    {
      id: 'm3',
      title: '한 달 50km 달성',
      description: '한 달 동안 총 50km를 달성하여 꾸준함을 증명하세요.',
      difficulty: 'hard',
      type: 'monthly',
      target: 50,
      unit: 'km',
      reward: {
        type: 'cash',
        value: '10,000원 상당 포인트',
      },
      participants: 15,
      progress: 12,
      status: 'in_progress',
    },
    {
      id: 'm4',
      title: '주간 10km 달성',
      description: '일주일 동안 총 10km를 달성하세요.',
      difficulty: 'medium',
      type: 'weekly',
      target: 10,
      unit: 'km',
      reward: {
        type: 'coupon',
        value: '20% 할인 쿠폰',
      },
      participants: 35,
      progress: 30,
      status: 'in_progress',
    },
    {
      id: 'm5',
      title: '팀 챌린지: 300km 달성',
      description: '팀원들과 함께 한 달 동안 총 300km를 달성하세요.',
      difficulty: 'hard',
      type: 'group',
      target: 300,
      unit: 'km',
      reward: {
        type: 'cash',
        value: '팀원당 15,000원 상당 포인트',
      },
      participants: 8,
      progress: 25,
      status: 'in_progress',
    },
    {
      id: 'm6',
      title: '아침 운동 5일 연속',
      description: '5일 연속으로 오전 9시 이전에 30분 이상 운동하세요.',
      difficulty: 'medium',
      type: 'daily',
      target: 5,
      unit: '일',
      reward: {
        type: 'badge',
        value: '얼리버드 배지',
      },
      participants: 12,
      progress: 60,
      status: 'in_progress',
    },
    {
      id: 'm7',
      title: '첫 마라톤 완주',
      description: '42.195km를 완주하세요.',
      difficulty: 'hard',
      type: 'monthly',
      target: 42.195,
      unit: 'km',
      reward: {
        type: 'badge',
        value: '마라토너 배지 + 20,000원 상당 포인트',
      },
      participants: 5,
      status: 'available',
    },
    {
      id: 'm8',
      title: '회사 주변 산책로 완주',
      description: '회사 주변 지정된 산책로를 완주하세요.',
      difficulty: 'easy',
      type: 'daily',
      target: 2.5,
      unit: 'km',
      reward: {
        type: 'coupon',
        value: '커피 쿠폰',
      },
      participants: 50,
      status: 'available',
    },
  ];

  // 필터링된 미션 목록
  const filteredMissions = activeFilter === 'all' 
    ? missions 
    : missions.filter(mission => {
        if (activeFilter === 'in_progress') return mission.status === 'in_progress';
        if (activeFilter === 'available') return mission.status === 'available';
        if (activeFilter === 'completed') return mission.status === 'completed';
        return mission.type === activeFilter;
      });

  // 난이도에 따른 스타일 및 텍스트
  const difficultyStyles = {
    easy: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      darkBg: 'dark:bg-green-900',
      darkText: 'dark:text-green-200',
      label: '쉬움',
    },
    medium: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      darkBg: 'dark:bg-yellow-900',
      darkText: 'dark:text-yellow-200',
      label: '중간',
    },
    hard: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      darkBg: 'dark:bg-red-900',
      darkText: 'dark:text-red-200',
      label: '도전',
    },
  };

  // 상태에 따른 스타일 및 텍스트
  const statusStyles = {
    available: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      darkBg: 'dark:bg-yellow-900',
      darkText: 'dark:text-yellow-200',
      label: '도전 가능',
    },
    in_progress: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      darkBg: 'dark:bg-blue-900',
      darkText: 'dark:text-blue-200',
      label: '진행 중',
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      darkBg: 'dark:bg-green-900',
      darkText: 'dark:text-green-200',
      label: '완료',
    },
  };

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
              <Link href="/missions" className="text-blue-600 font-medium dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">
                미션
              </Link>
              <Link href="/rewards" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">미션</h1>
          
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
              onClick={() => setActiveFilter('in_progress')}
              className={`px-4 py-2 rounded-full text-sm ${
                activeFilter === 'in_progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            >
              진행 중
            </button>
            <button
              onClick={() => setActiveFilter('available')}
              className={`px-4 py-2 rounded-full text-sm ${
                activeFilter === 'available'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            >
              도전 가능
            </button>
            <button
              onClick={() => setActiveFilter('daily')}
              className={`px-4 py-2 rounded-full text-sm ${
                activeFilter === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            >
              일일 미션
            </button>
            <button
              onClick={() => setActiveFilter('weekly')}
              className={`px-4 py-2 rounded-full text-sm ${
                activeFilter === 'weekly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            >
              주간 미션
            </button>
            <button
              onClick={() => setActiveFilter('monthly')}
              className={`px-4 py-2 rounded-full text-sm ${
                activeFilter === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            >
              월간 미션
            </button>
            <button
              onClick={() => setActiveFilter('group')}
              className={`px-4 py-2 rounded-full text-sm ${
                activeFilter === 'group'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            >
              그룹 미션
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <div key={mission.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">{mission.title}</h3>
                  <span className={`${difficultyStyles[mission.difficulty].bg} ${difficultyStyles[mission.difficulty].text} ${difficultyStyles[mission.difficulty].darkBg} ${difficultyStyles[mission.difficulty].darkText} text-xs px-2 py-1 rounded`}>
                    {difficultyStyles[mission.difficulty].label}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{mission.description}</p>
                
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">목표: {mission.target} {mission.unit}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">참여자: {mission.participants}명</span>
                </div>
                
                {mission.progress !== undefined && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" 
                        style={{ width: `${mission.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.round(mission.progress / 100 * mission.target)}/{mission.target} {mission.unit} ({mission.progress}%)
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {mission.reward.value}
                  </span>
                  <span className={`${statusStyles[mission.status].bg} ${statusStyles[mission.status].text} ${statusStyles[mission.status].darkBg} ${statusStyles[mission.status].darkText} text-xs px-2 py-1 rounded`}>
                    {statusStyles[mission.status].label}
                  </span>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                {mission.status === 'available' ? (
                  <button 
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => alert(`${mission.title} 미션에 참여했습니다!`)}
                  >
                    미션 참여하기
                  </button>
                ) : mission.status === 'in_progress' ? (
                  <Link 
                    href="/tracking" 
                    className="block w-full py-2 text-center bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    운동 기록하기
                  </Link>
                ) : (
                  <button 
                    className="w-full py-2 bg-gray-300 text-gray-700 rounded-md cursor-not-allowed dark:bg-gray-600 dark:text-gray-300"
                    disabled
                  >
                    완료된 미션
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 