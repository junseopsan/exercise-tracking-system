'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMembers, Member } from '@/lib/supabase';

// 사용자 타입 정의
interface User {
  id: string;
  name: string;
  department: string;
  avatar: string;
  stats: {
    distance: number;
    missions: number;
    points: number;
    steps: number;
  };
}

export default function LeaderboardPage() {
  // 랭킹 필터 상태
  const [rankingType, setRankingType] = useState<'distance' | 'missions' | 'points' | 'steps'>('distance');
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'all_time'>('weekly');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Supabase에서 데이터 가져오기
  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true);
        console.log('데이터 로딩 시작...');
        const data = await getMembers();
        console.log('가져온 데이터:', data);
        setMembers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMembers();
  }, []);
  
  // 샘플 사용자 데이터
  const users: User[] = [
    {
      id: 'u1',
      name: '김철수',
      department: '개발팀',
      avatar: '/images/avatars/avatar1.svg',
      stats: {
        distance: 42.5,
        missions: 8,
        points: 12500,
        steps: 65000,
      },
    },
    {
      id: 'u2',
      name: '이영희',
      department: '마케팅팀',
      avatar: '/images/avatars/avatar2.svg',
      stats: {
        distance: 38.2,
        missions: 10,
        points: 15000,
        steps: 58000,
      },
    },
    {
      id: 'u3',
      name: '박지민',
      department: '디자인팀',
      avatar: '/images/avatars/avatar3.svg',
      stats: {
        distance: 45.7,
        missions: 7,
        points: 11000,
        steps: 70000,
      },
    },
    {
      id: 'u4',
      name: '최민수',
      department: '인사팀',
      avatar: '/images/avatars/avatar4.svg',
      stats: {
        distance: 30.1,
        missions: 5,
        points: 8000,
        steps: 45000,
      },
    },
    {
      id: 'u5',
      name: '정다은',
      department: '영업팀',
      avatar: '/images/avatars/avatar5.svg',
      stats: {
        distance: 35.8,
        missions: 6,
        points: 9500,
        steps: 52000,
      },
    },
    {
      id: 'u6',
      name: '강현우',
      department: '개발팀',
      avatar: '/images/avatars/avatar6.svg',
      stats: {
        distance: 28.3,
        missions: 4,
        points: 7000,
        steps: 40000,
      },
    },
    {
      id: 'u7',
      name: '윤서연',
      department: '마케팅팀',
      avatar: '/images/avatars/avatar7.svg',
      stats: {
        distance: 33.6,
        missions: 9,
        points: 13000,
        steps: 48000,
      },
    },
    {
      id: 'u8',
      name: '임준호',
      department: '디자인팀',
      avatar: '/images/avatars/avatar8.svg',
      stats: {
        distance: 40.2,
        missions: 11,
        points: 16000,
        steps: 62000,
      },
    },
    {
      id: 'u9',
      name: '한지원',
      department: '영업팀',
      avatar: '/images/avatars/avatar9.svg',
      stats: {
        distance: 25.9,
        missions: 3,
        points: 6000,
        steps: 38000,
      },
    },
    {
      id: 'u10',
      name: '송민아',
      department: '인사팀',
      avatar: '/images/avatars/avatar10.svg',
      stats: {
        distance: 31.4,
        missions: 5,
        points: 8500,
        steps: 47000,
      },
    },
  ];

  // 랭킹 타입에 따라 정렬
  const sortedUsers = [...users].sort((a, b) => b.stats[rankingType] - a.stats[rankingType]);

  // 랭킹 타입에 따른 단위 및 포맷
  const formatValue = (value: number, type: 'distance' | 'missions' | 'points' | 'steps') => {
    switch (type) {
      case 'distance':
        return `${value.toFixed(1)}km`;
      case 'missions':
        return `${value}개`;
      case 'points':
        return `${value.toLocaleString()}P`;
      case 'steps':
        return `${value.toLocaleString()}보`;
      default:
        return value.toString();
    }
  };

  // 랭킹 타입에 따른 제목
  const rankingTypeTitle = {
    distance: '총 거리',
    missions: '미션 달성',
    points: '포인트',
    steps: '걸음 수',
  };

  // 시간 프레임에 따른 제목
  const timeFrameTitle = {
    weekly: '주간',
    monthly: '월간',
    all_time: '전체',
  };

  // 기본 아바타 이미지 경로 생성 함수
  const getAvatarPath = (index: number) => {
    return `/images/avatars/avatar${(index % 10) + 1}.svg`;
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
              <Link href="/missions" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                미션
              </Link>
              <Link href="/rewards" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                보상
              </Link>
              <Link href="/leaderboard" className="text-blue-600 font-medium dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">
                랭킹
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">랭킹</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Supabase 멤버 랭킹
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  거리 기준 랭킹입니다.
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">데이터를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : members.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">Supabase에 데이터가 없습니다. 샘플 데이터를 확인해주세요.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      순위
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      사용자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      부서
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      거리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {members.map((member, index) => (
                    <tr key={member.id} className={index < 3 ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <span className={`
                              flex items-center justify-center w-8 h-8 rounded-full text-white font-bold
                              ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'}
                            `}>
                              {member.rank}
                            </span>
                          ) : (
                            <span className="text-gray-600 dark:text-gray-400 font-medium ml-2">
                              {member.rank}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image 
                              className="rounded-full"
                              src={member.avatar || getAvatarPath(index)}
                              alt={member.name}
                              fill
                              sizes="40px"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {member.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-400">{member.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {member.distance.toFixed(1)}km
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {timeFrameTitle[timeFrame]} {rankingTypeTitle[rankingType]} 랭킹
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {timeFrame === 'weekly' ? '이번 주' : timeFrame === 'monthly' ? '이번 달' : '전체 기간'} 동안의 {rankingTypeTitle[rankingType]} 기준 랭킹입니다.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex rounded-md overflow-hidden">
                  <button
                    onClick={() => setTimeFrame('weekly')}
                    className={`px-4 py-2 text-sm ${
                      timeFrame === 'weekly'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                    }`}
                  >
                    주간
                  </button>
                  <button
                    onClick={() => setTimeFrame('monthly')}
                    className={`px-4 py-2 text-sm ${
                      timeFrame === 'monthly'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border-t border-b border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                    }`}
                  >
                    월간
                  </button>
                  <button
                    onClick={() => setTimeFrame('all_time')}
                    className={`px-4 py-2 text-sm ${
                      timeFrame === 'all_time'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                    }`}
                  >
                    전체
                  </button>
                </div>

                <select
                  value={rankingType}
                  onChange={(e) => setRankingType(e.target.value as 'distance' | 'missions' | 'points' | 'steps')}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-600 text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                >
                  <option value="distance">총 거리</option>
                  <option value="missions">미션 달성</option>
                  <option value="points">포인트</option>
                  <option value="steps">걸음 수</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    순위
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    부서
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {rankingTypeTitle[rankingType]}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedUsers.map((user, index) => (
                  <tr key={user.id} className={index < 3 ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <span className={`
                            flex items-center justify-center w-8 h-8 rounded-full text-white font-bold
                            ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'}
                          `}>
                            {index + 1}
                          </span>
                        ) : (
                          <span className="text-gray-600 dark:text-gray-400 font-medium ml-2">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image 
                            className="rounded-full"
                            src={user.avatar}
                            alt={user.name}
                            fill
                            sizes="40px"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{user.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatValue(user.stats[rankingType], rankingType)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">부서별 랭킹</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">개발팀</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">70.8km</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">마케팅팀</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">71.8km</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">디자인팀</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">85.9km</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">영업팀</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">61.7km</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">인사팀</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">61.5km</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">최다 미션 달성자</h3>
            <div className="space-y-4">
              {sortedUsers
                .sort((a, b) => b.stats.missions - a.stats.missions)
                .slice(0, 5)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-5">
                        {index + 1}
                      </span>
                      <div className="h-8 w-8 relative ml-2">
                        <Image 
                          className="rounded-full"
                          src={user.avatar}
                          alt={user.name}
                          fill
                          sizes="32px"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-white ml-2">
                        {user.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.stats.missions}개
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">최다 포인트 획득자</h3>
            <div className="space-y-4">
              {sortedUsers
                .sort((a, b) => b.stats.points - a.stats.points)
                .slice(0, 5)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-5">
                        {index + 1}
                      </span>
                      <div className="h-8 w-8 relative ml-2">
                        <Image 
                          className="rounded-full"
                          src={user.avatar}
                          alt={user.name}
                          fill
                          sizes="32px"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-white ml-2">
                        {user.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.stats.points.toLocaleString()}P
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">최다 걸음 수</h3>
            <div className="space-y-4">
              {sortedUsers
                .sort((a, b) => b.stats.steps - a.stats.steps)
                .slice(0, 5)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-5">
                        {index + 1}
                      </span>
                      <div className="h-8 w-8 relative ml-2">
                        <Image 
                          className="rounded-full"
                          src={user.avatar}
                          alt={user.name}
                          fill
                          sizes="32px"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800 dark:text-white ml-2">
                        {user.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.stats.steps.toLocaleString()}보
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 