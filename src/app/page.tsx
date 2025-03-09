import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">운동 챌린지</h1>
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
            <Link href="/leaderboard" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              랭킹
            </Link>
          </nav>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">사내 운동 챌린지에 참여하세요</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            운동을 기록하고, 미션을 달성하여 다양한 보상을 받아보세요. 동료들과 함께 건강한 습관을 만들어 나가요!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tracking" className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              운동 시작하기
            </Link>
            <Link href="/missions" className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700">
              미션 확인하기
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">GPS 기반 운동 기록</h3>
            <p className="text-gray-600 dark:text-gray-300">
              거리, 시간, 페이스, 이동 경로를 정확하게 기록하고 분석하세요.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">다양한 미션 도전</h3>
            <p className="text-gray-600 dark:text-gray-300">
              일일 미션, 누적 미션, 그룹 미션 등 다양한 챌린지에 참여하세요.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">보상 및 랭킹</h3>
            <p className="text-gray-600 dark:text-gray-300">
              미션 달성 시 현금, 배지, 쿠폰 등 다양한 보상을 받고 랭킹에 도전하세요.
            </p>
          </div>
        </section>

        <section className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">주간 인기 미션</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-800 dark:text-white">오늘 5,000보 걷기</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">쉬움</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">하루 동안 5,000보를 걸어 기초 체력을 기르세요.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">참여자: 42명</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">30% 할인 쿠폰</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-800 dark:text-white">3km 달리기</h3>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-200">중간</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">3km를 달려 심폐 지구력을 향상시키세요.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">참여자: 28명</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">5,000원 상당 포인트</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-800 dark:text-white">한 달 50km 달성</h3>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded dark:bg-red-900 dark:text-red-200">도전</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">한 달 동안 총 50km를 달성하여 꾸준함을 증명하세요.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">참여자: 15명</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">10,000원 상당 포인트</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/missions" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              모든 미션 보기 →
            </Link>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">지금 시작하세요</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            건강한 습관을 만들고 다양한 보상을 받으며 동료들과 함께 성장하세요.
          </p>
          <Link href="/register" className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            가입하기
          </Link>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">© 2024 운동 챌린지. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                이용약관
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                개인정보처리방침
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
