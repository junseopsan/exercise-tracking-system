-- 기존 테이블이 있으면 삭제
DROP TABLE IF EXISTS member;

-- 테이블 생성
CREATE TABLE member (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  distance DECIMAL(10, 2) NOT NULL,
  rank INTEGER NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 함수 생성: 테이블이 존재하면 삭제하는 함수
CREATE OR REPLACE FUNCTION drop_table_if_exists(table_name TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE format('DROP TABLE IF EXISTS %I CASCADE', table_name);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 함수 생성: member 테이블 생성 함수
CREATE OR REPLACE FUNCTION create_member_table()
RETURNS VOID AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS member (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    distance DECIMAL(10, 2) NOT NULL,
    rank INTEGER NOT NULL,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS(Row Level Security) 정책 설정
ALTER TABLE member ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 member 테이블을 읽을 수 있도록 정책 추가
CREATE POLICY "Allow public read access" ON member
  FOR SELECT USING (true);

-- 샘플 데이터 삽입
INSERT INTO member (id, name, department, distance, rank, avatar)
VALUES
  ('1', '김철수', '개발팀', 42.5, 1, '/images/avatars/avatar1.svg'),
  ('2', '이영희', '마케팅팀', 38.2, 2, '/images/avatars/avatar2.svg'),
  ('3', '박지민', '디자인팀', 45.7, 3, '/images/avatars/avatar3.svg'),
  ('4', '최민수', '인사팀', 30.1, 4, '/images/avatars/avatar4.svg'),
  ('5', '정다은', '영업팀', 35.8, 5, '/images/avatars/avatar5.svg'),
  ('6', '강현우', '개발팀', 28.3, 6, '/images/avatars/avatar6.svg'),
  ('7', '윤서연', '마케팅팀', 33.6, 7, '/images/avatars/avatar7.svg'),
  ('8', '임준호', '디자인팀', 40.2, 8, '/images/avatars/avatar8.svg'),
  ('9', '한지원', '영업팀', 25.9, 9, '/images/avatars/avatar9.svg'),
  ('10', '송민아', '인사팀', 31.4, 10, '/images/avatars/avatar10.svg'); 