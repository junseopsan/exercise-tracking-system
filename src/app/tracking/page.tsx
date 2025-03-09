'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Position {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface TrackingData {
  positions: Position[];
  startTime: number;
  endTime: number | null;
  distance: number;
  pace: number | null;
}

export default function TrackingPage() {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // 위치 권한 확인
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
          setError('위치 접근 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.');
        }
      });
    } else {
      setError('이 브라우저는 위치 기능을 지원하지 않습니다.');
    }
  }, []);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation && !error) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          });
        },
        (err) => {
          setError(`위치 정보를 가져오는데 실패했습니다: ${err.message}`);
        }
      );
    }
  }, [error]);

  // 운동 기록 시작
  const startTracking = () => {
    if (navigator.geolocation) {
      setIsTracking(true);
      setTrackingData({
        positions: [],
        startTime: Date.now(),
        endTime: null,
        distance: 0,
        pace: null,
      });

      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          };

          setCurrentPosition(newPosition);
          
          setTrackingData((prev) => {
            if (!prev) return null;
            
            const newPositions = [...prev.positions, newPosition];
            let newDistance = prev.distance;
            
            // 이전 위치가 있으면 거리 계산
            if (prev.positions.length > 0) {
              const lastPosition = prev.positions[prev.positions.length - 1];
              newDistance += calculateDistance(
                lastPosition.latitude,
                lastPosition.longitude,
                newPosition.latitude,
                newPosition.longitude
              );
            }
            
            // 페이스 계산 (분/km)
            const elapsedTimeInMinutes = (position.timestamp - prev.startTime) / 60000;
            const paceValue = newDistance > 0 ? elapsedTimeInMinutes / (newDistance / 1000) : null;
            
            return {
              ...prev,
              positions: newPositions,
              distance: newDistance,
              pace: paceValue,
            };
          });
        },
        (err) => {
          setError(`위치 추적 중 오류가 발생했습니다: ${err.message}`);
          stopTracking();
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  };

  // 운동 기록 종료
  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    
    setIsTracking(false);
    setTrackingData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        endTime: Date.now(),
      };
    });
  };

  // 두 지점 간의 거리 계산 (Haversine 공식)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // 지구 반경 (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // km 단위 거리
    return distance * 1000; // m 단위로 변환
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  // 시간 포맷팅 (mm:ss)
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 거리 포맷팅
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${meters.toFixed(0)}m`;
    } else {
      return `${(meters / 1000).toFixed(2)}km`;
    }
  };

  // 페이스 포맷팅 (분:초/km)
  const formatPace = (pace: number | null): string => {
    if (pace === null) return '--:--';
    
    const minutes = Math.floor(pace);
    const seconds = Math.floor((pace - minutes) * 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}/km`;
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
              <Link href="/tracking" className="text-blue-600 font-medium dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">
                운동 기록
              </Link>
              <Link href="/missions" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
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
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">운동 기록</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 dark:bg-red-900 dark:text-red-200 dark:border-red-800">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">위치 지도</h2>
              <div 
                ref={mapRef} 
                className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
              >
                {currentPosition ? (
                  <p className="text-gray-600 dark:text-gray-300">
                    현재 위치: {currentPosition.latitude.toFixed(6)}, {currentPosition.longitude.toFixed(6)}
                  </p>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">위치 정보를 불러오는 중...</p>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">운동 기록</h2>
              
              {!isTracking && !trackingData?.endTime && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    운동 기록을 시작하려면 아래 버튼을 클릭하세요.
                  </p>
                  <button
                    onClick={startTracking}
                    disabled={!!error}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    운동 시작하기
                  </button>
                </div>
              )}

              {isTracking && (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">시간</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {trackingData ? formatTime(Date.now() - trackingData.startTime) : '00:00'}
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">거리</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {trackingData ? formatDistance(trackingData.distance) : '0m'}
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">페이스</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {trackingData ? formatPace(trackingData.pace) : '--:--'}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={stopTracking}
                      className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      운동 종료하기
                    </button>
                  </div>
                </div>
              )}

              {!isTracking && trackingData?.endTime && (
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">운동 결과</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 시간</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {formatTime(trackingData.endTime - trackingData.startTime)}
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 거리</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {formatDistance(trackingData.distance)}
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">평균 페이스</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {formatPace(trackingData.pace)}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => setTrackingData(null)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors mr-4"
                    >
                      새 운동 시작하기
                    </button>
                    <button
                      onClick={() => {
                        // 운동 기록 저장 로직 (추후 구현)
                        alert('운동 기록이 저장되었습니다.');
                      }}
                      className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                    >
                      기록 저장하기
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">관련 미션</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 dark:text-white">오늘 5,000보 걷기</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">진행 중</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                    <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2,250/5,000보 (45%)</p>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 dark:text-white">3km 달리기</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-200">도전 가능</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">3km를 달려 심폐 지구력을 향상시키세요.</p>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 dark:text-white">한 달 50km 달성</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">진행 중</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                    <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: '12%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">6/50km (12%)</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link href="/missions" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  모든 미션 보기 →
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">최근 운동 기록</h2>
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">어제</p>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800 dark:text-white">걷기</p>
                    <p className="text-gray-600 dark:text-gray-300">3.2km</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">42분 12초 (13:10/km)</p>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">2일 전</p>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800 dark:text-white">달리기</p>
                    <p className="text-gray-600 dark:text-gray-300">5.0km</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">28분 45초 (5:45/km)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">3일 전</p>
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-800 dark:text-white">걷기</p>
                    <p className="text-gray-600 dark:text-gray-300">2.8km</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">35분 30초 (12:40/km)</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link href="/history" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  모든 기록 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 