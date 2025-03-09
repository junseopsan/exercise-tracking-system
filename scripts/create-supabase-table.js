import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
const supabaseUrl = 'https://lmdjcsabikytyynuxlfq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZGpjc2FiaWt5dHl5bnV4bGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MDMyMDUsImV4cCI6MjA1NzA3OTIwNX0.ECHMf0llbjfXHU6RY4DmZGRITUJLmmGiLX-AO6OXVBg';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 샘플 데이터
const sampleMembers = [
  {
    id: '1',
    name: '김철수',
    department: '개발팀',
    distance: 42.5,
    rank: 1,
    avatar: '/images/avatars/avatar1.svg',
  },
  {
    id: '2',
    name: '이영희',
    department: '마케팅팀',
    distance: 38.2,
    rank: 2,
    avatar: '/images/avatars/avatar2.svg',
  },
  {
    id: '3',
    name: '박지민',
    department: '디자인팀',
    distance: 45.7,
    rank: 3,
    avatar: '/images/avatars/avatar3.svg',
  },
  {
    id: '4',
    name: '최민수',
    department: '인사팀',
    distance: 30.1,
    rank: 4,
    avatar: '/images/avatars/avatar4.svg',
  },
  {
    id: '5',
    name: '정다은',
    department: '영업팀',
    distance: 35.8,
    rank: 5,
    avatar: '/images/avatars/avatar5.svg',
  },
  {
    id: '6',
    name: '강현우',
    department: '개발팀',
    distance: 28.3,
    rank: 6,
    avatar: '/images/avatars/avatar6.svg',
  },
  {
    id: '7',
    name: '윤서연',
    department: '마케팅팀',
    distance: 33.6,
    rank: 7,
    avatar: '/images/avatars/avatar7.svg',
  },
  {
    id: '8',
    name: '임준호',
    department: '디자인팀',
    distance: 40.2,
    rank: 8,
    avatar: '/images/avatars/avatar8.svg',
  },
  {
    id: '9',
    name: '한지원',
    department: '영업팀',
    distance: 25.9,
    rank: 9,
    avatar: '/images/avatars/avatar9.svg',
  },
  {
    id: '10',
    name: '송민아',
    department: '인사팀',
    distance: 31.4,
    rank: 10,
    avatar: '/images/avatars/avatar10.svg',
  },
];

// 테이블 생성 및 데이터 삽입 함수
async function createTableAndInsertData() {
  try {
    console.log('Supabase 테이블 생성 및 데이터 삽입 시작...');

    // 기존 테이블이 있으면 삭제
    console.log('기존 테이블 삭제 중...');
    await supabase.rpc('drop_table_if_exists', { table_name: 'member' });

    // 테이블 생성
    console.log('새 테이블 생성 중...');
    const { error: createError } = await supabase.rpc('create_member_table');
    
    if (createError) {
      console.error('테이블 생성 오류:', createError);
      return;
    }

    // 데이터 삽입
    console.log('데이터 삽입 중...');
    const { error: insertError } = await supabase
      .from('member')
      .insert(sampleMembers);
    
    if (insertError) {
      console.error('데이터 삽입 오류:', insertError);
      return;
    }

    console.log('테이블 생성 및 데이터 삽입 완료!');
  } catch (error) {
    console.error('오류 발생:', error);
  }
}

// 스크립트 실행
createTableAndInsertData(); 