export type Lane = 'main' | 'conductor' | 'hr' | 'support'

export interface PipelinePackage {
  id: string
  name: string
  role: string
  loc: number
  lane: Lane
  step?: number
}

export interface HeroStat { value: number; suffix?: string; label: string; sub?: string }
export interface BentoCard { id: string; title: string; body: string; metric?: string; featured?: boolean }

/** 익명화 게이트 — 소스·산출물 공통 금지 패턴 (스펙 §2.1) */
export const BANNED_PATTERNS: RegExp[] = [
  /moggoji/i,
  /eventflow/i,
  /모꼬지/,
  /epika/i,
  /에피카/,
  /c_common/i,
  /fingate\.kr/i,
  /PG_[A-Z]/,
  /\bAIA\b/,
]

export const profile = {
  meta: {
    title: '이현수 — AX Lead · AI-Driven Development',
    description: 'AX Lead 이현수 — AI가 개발하는 조직을 설계합니다.',
  },

  nav: [
    { id: 'ax', label: 'AX' },
    { id: 'systems', label: 'Systems' },
    { id: 'data', label: 'Data' },
    { id: 'timeline', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ],

  rail: [
    { id: 'ax', num: '01', year: '2026' },
    { id: 'systems', num: '02', year: '2023–26' },
    { id: 'data', num: '03', year: '2021' },
  ],

  hero: {
    status: 'PRO · 개발책임 — PLATFORM AX',
    name: 'LEE HYEONSU',
    nameKo: '이현수',
    tagline: 'AI로 일하는 조직을 설계합니다.',
    breadcrumb: ['백엔드', '데이터', '풀스택', 'AX'],
    stats: [
      { value: 5, suffix: '+', label: 'Years', sub: '2021.02 — 현재' },
      { value: 3, label: 'Systems Built', sub: '금융·SaaS 프로덕션' },
      { value: 300, suffix: '+', label: 'AI 플러그인 자산', sub: 'agents · hooks · skills · docs' },
      { value: 90, suffix: '/mo', label: 'AI Sessions', sub: '멀티에이전트 상시 운용' },
    ] satisfies HeroStat[],
    nodes: [
      { label: 'MCP Knowledge Graph', metric: '8,126 nodes', href: '#ax' },
      { label: 'CI AI Review Gate', metric: 'MR auto-review', href: '#ax' },
      { label: 'AI Plugin Marketplace', metric: '325 assets', href: '#ax' },
    ],
    scrollCue: 'Scroll',
  },

  identity: {
    before: '35,000줄의 정산 로직을 직접 쓰던 개발자는',
    after: '이제는 코드가 아니라, 코드를 만드는 시스템을 설계합니다',
    accentWords: ['시스템을', '설계합니다'],
    years: [2021, 2026] as const,
  },

  ax: {
    chapter: 'CHAPTER 01',
    title: 'AX. NOW.',
    era: '2026 —',
    opening: '개인의 생산성이 아니라, 조직 전체가 AI로 개발하는 방식을 만들었습니다.',
    proof: '그 증거 — 직접 설계하고 운영하는 시스템',
    cards: [
      {
        id: 'marketplace',
        title: '사내 AI 플러그인 마켓플레이스',
        body: '레지스트리 주입식 코어 + 프로젝트 특화 플러그인 아키텍처. 신규 프로젝트는 커맨드 한 번으로 AI 개발 골격이 생성됩니다.',
        metric: '에이전트 문서 274 · 훅 34 · 스킬 17',
        featured: true,
      },
      {
        id: 'ci-gate',
        title: 'CI AI 코드리뷰 게이트',
        body: '모든 MR에 Claude가 자동 리뷰를 수행하고, BLOCK 판정 시 머지가 차단됩니다 — AI가 품질 게이트를 운영합니다.',
        metric: '전 MR 자동 리뷰',
      },
      {
        id: 'mcp',
        title: 'MCP 지식그래프 서버',
        body: '화면→API→서비스→테이블 영향도 추적을 개발자·기획자의 AI에 직접 서빙하는 로컬 MCP 서버를 구축했습니다.',
        metric: '8,126 nodes · 9,273 edges',
      },
      {
        id: 'hooks',
        title: 'Hook 거버넌스 자동화',
        body: '서버 경계·개인정보 어노테이션·권한·DDL 정합을 훅으로 강제합니다. 사람이 아니라 시스템이 규약을 지킵니다.',
        metric: '우회 불가 게이트',
      },
      {
        id: 'edu',
        title: '전사 AX 교육 플랫폼',
        body: '비개발직군까지 아우르는 2트랙 커리큘럼. 대본→TTS 내레이션 자동 생성, 발표 내용을 학습한 임베드 AI 챗봇(STT·실시간 TTS)까지.',
        metric: '31섹션 · 오디오 78개 자동 생성',
      },
      {
        id: 'saas',
        title: '행사관리 SaaS 플랫폼',
        body: '3서버 경계 아키텍처(Gateway·Application·Worker)를 설계하고 백엔드 전체와 인프라(19컨테이너·자동 TLS)를 총괄합니다.',
        metric: '백엔드 11만 LOC · 264 API · 63 tables',
      },
    ] satisfies BentoCard[],
    aiMetrics: '월 90 AI 세션 · 43h/월 AI 협업 · 멀티에이전트 워크플로우 상시 운용',
  },

  rewinds: [
    { from: 2026, to: 2023, mood: { intensity: [1.25, 0.85] as const, temperature: [1, 0.55] as const } },
    { from: 2023, to: 2021, mood: { intensity: [0.85, 0.7] as const, temperature: [0.55, 0.25] as const } },
  ],

  systems: {
    chapter: 'CHAPTER 02',
    title: 'SYSTEMS & FRAMEWORK',
    era: '2023 — 2026',
    narrative: 'AX 이전엔, 조직 전체가 올라탈 시스템의 뼈대를 만들었습니다.',
    framework: { name: '공통 프론트엔드 프레임워크', metric: '~30K LOC 단독 설계' },
    apps: [
      { name: '수수료', owned: true },
      { name: '인사', owned: true },
      { name: '평가', owned: true },
      { name: '리포트', owned: true },
      { name: '공통지원', owned: true },
      { name: '영업', owned: false },
      { name: '소득', owned: false },
      { name: '위촉', owned: false },
      { name: '인증', owned: false },
      { name: '관리자', owned: false },
      { name: '채용', owned: false },
      { name: '민원', owned: false },
      { name: '전자투표', owned: false },
      { name: '교육', owned: false },
      { name: 'RPA', owned: false },
      { name: '모바일 인증', owned: false },
    ],
    appsNote: '+ 공통 정적자산 서브모듈(폰트·아이콘·전역 스타일) 운영',
    cards: [
      {
        id: 'framework',
        title: '공통 프레임워크 단독 설계',
        body: '재사용 컴포넌트 58종, 3단계 RBAC, 선언형 메뉴 기반 라우팅 자동화 — 신규 모듈은 메뉴 선언만으로 부트스트랩됩니다.',
        metric: '16개 앱 · 935개 화면 지탱',
      },
      {
        id: 'msa',
        title: '백엔드 마이크로서비스',
        body: 'Java 17 · Spring Boot 3 기반 수수료·인사·리포트 서비스와 전사 재사용 WebFlux 게이트웨이 코어 라이브러리를 구축했습니다.',
        metric: '서비스 파일 1,748개',
      },
      {
        id: 'screens',
        title: '담당 5개 시스템 직접 구현',
        body: '수수료·인사·평가·리포트·공통지원 — 화면 410여 개와 Quartz 기반 월마감 배치 자동화까지 도메인 전체를 소유했습니다.',
        metric: '410+ 화면 · 월마감 배치',
      },
    ] satisfies BentoCard[],
    chips: ['Vue 3', 'TypeScript', 'Pinia', 'Spring Boot 3', 'MyBatis', 'Oracle'],
  },

  data: {
    chapter: 'CHAPTER 03',
    title: 'DATA & DOMAIN',
    era: '2021 —',
    narrative:
      '모든 것의 뿌리는 데이터였습니다. 금융 도메인의 돈이 걸린 월마감 — 굿리치에서 자동화를 시작해, 핀게이트에서 정산 전체 프로세스를 설계했습니다.',
    callback: '아까 그 35,000줄은, 이렇게 맞물려 돕니다.',
    packages: [
      { id: 'ctrl', name: '마감 총괄 오케스트레이터', role: '전체 단계를 순차 호출·트랜잭션 통제', loc: 5273, lane: 'conductor' },
      { id: 'risk', name: '리스크 계약 판별', role: '승환·자기계약 등 리스크 선별', loc: 1535, lane: 'main', step: 1 },
      { id: 'cntrc', name: '계약 마감', role: '신계약·집금 월도 마감', loc: 1210, lane: 'main', step: 2 },
      { id: 'base', name: '수수료 집계·환수 엔진', role: '지급/환수 · 부활·취소·감액·실효·연체', loc: 4987, lane: 'main', step: 3 },
      { id: 'ovrd', name: '오버라이드 수당 집계', role: '직급·조직분할·환수 처리', loc: 2368, lane: 'main', step: 4 },
      { id: 'subsidy', name: '성과급 산출 엔진', role: '소득 구간 목표·지급률·해촉 정산', loc: 7579, lane: 'main', step: 5 },
      { id: 'sts', name: '통계 기초 집계', role: '업적·생산성·가동인원 기초 데이터', loc: 1307, lane: 'main', step: 6 },
      { id: 'check', name: '마감 검증', role: '사전·사후 정합 체크', loc: 1256, lane: 'main', step: 7 },
      { id: 'apntm', name: '인사 발령 배치', role: '발령·조직 생성 일괄 처리', loc: 2616, lane: 'hr' },
      { id: 'prsnl', name: '인사·조직 마감', role: '인사마감·재정보증', loc: 1796, lane: 'hr' },
      { id: 'extpy', name: '조직 수수료유형', role: '조직별 유형 적용 조회', loc: 342, lane: 'hr' },
      { id: 'correct', name: '수기보정 처리', role: '지급·환수·오버라이드 보정 업로드', loc: 1749, lane: 'support' },
      { id: 'edctn', name: '교육지원비 정산', role: '위촉·해촉 지급/환수', loc: 407, lane: 'support' },
      { id: 'mig', name: '데이터 마이그레이션', role: '과거 데이터 이관·협력사 분리', loc: 3068, lane: 'support' },
    ] satisfies PipelinePackage[],
    laneLabels: { conductor: '지휘', main: '본선', hr: 'HR 선행', support: '지원' } as Record<Lane, string>,
    output: '지급 확정 · 통계 산출 — 월마감 완료',
    totals: { packages: 14, loc: 35_493, tables: 652, tablesShare: '68%' },
    legacy:
      '월마감 자동화의 시작점 — 굿리치 차세대 영업지원 시스템(Vue2 · Spring Boot)에서 HR·리포트 풀스택과 데이터 월마감을 담당했습니다.',
  },

  timeline: [
    {
      company: '핀게이트 · Platform AX',
      period: '2026.03 — 현재',
      role: 'Pro / 개발책임',
      points: [
        '행사관리 SaaS 백엔드·인프라 총괄 (3서버 아키텍처 · 11만 LOC · 19컨테이너)',
        '사내 AI 플러그인 마켓플레이스 · MCP 지식그래프 · CI AI 리뷰 게이트 구축',
        '전사 AX 교육 리드 — 2트랙 31섹션 · TTS 자동 생성 파이프라인',
      ],
      chips: ['Java 21', 'Spring Boot 3.5', 'Claude Code', 'MCP', 'Docker', 'Traefik'],
    },
    {
      company: '핀게이트',
      period: '2023.07 — 2026.02',
      role: 'Manager',
      points: [
        '보험 영업지원 통합 시스템 — 공통 프론트엔드 프레임워크(~30K LOC) 단독 설계',
        '수수료·인사·리포트 3개 핵심 도메인 총괄 (담당 테이블 652개 · 화면 410+)',
        'PL/SQL 정산 엔진 14패키지 35,493 LOC 설계·구현',
      ],
      chips: ['Vue 3', 'TypeScript', 'Spring Boot 3', 'Oracle PL/SQL', 'MyBatis'],
    },
    {
      company: '굿리치 ((구)리치앤코)',
      period: '2021.02 — 2023.07',
      role: '사원',
      points: [
        '차세대 영업지원 시스템 구축 — HR·리포트 백엔드/프론트 풀스택',
        '데이터 월마감 유지보수·자동화',
      ],
      chips: ['Vue 2', 'Java', 'Spring Boot', 'SQL'],
    },
  ],

  capabilities: [
    {
      category: 'AI Engineering',
      chips: [
        'Claude Code 플러그인·스킬·훅 아키텍처',
        'MCP 서버 구축',
        '멀티에이전트 오케스트레이션',
        'AI CI 리뷰 게이트',
        'TTS 콘텐츠 파이프라인',
      ],
    },
    {
      category: 'Backend',
      chips: ['Java 17·21', 'Spring Boot 3.x', 'Spring Cloud Gateway · WebFlux', 'MyBatis', 'RabbitMQ · Outbox', 'Redis', 'Quartz'],
    },
    {
      category: 'Frontend',
      chips: ['Vue 3', 'React 19', 'TypeScript', 'Vite', 'Pinia', 'Kendo UI'],
    },
    {
      category: 'Data & Infra',
      chips: ['Oracle PL/SQL (35K LOC)', 'MariaDB', 'Docker Compose', 'Traefik · 자동 TLS', 'GitLab CI', 'Prometheus', 'AWS'],
    },
  ],

  contact: {
    headline: "Let's build the way we build.",
    sub: '함께 조직의 개발 방식을 바꿔볼까요?',
    email: 'hyeonsu1013@naver.com',
    meta: '이 사이트는 Claude Code 페어링으로 설계·구현되었습니다 — 제가 일하는 방식 그대로.',
  },
} as const

export type Profile = typeof profile
