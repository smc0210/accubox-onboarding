export const ONBOARDING_STEPS = [
  {
    step: 1,
    title: '장비 및 개발 도구 준비',
    description: '업무에 필요한 장비와 개발 도구를 준비합니다.',
    isQuizRequired: false
  },
  {
    step: 2,
    title: '계정 생성 및 권한 부여',
    description: '필요한 서비스 계정을 생성하고 권한을 설정합니다.',
    isQuizRequired: false
  },
  {
    step: 3,
    title: '회사 및 프로젝트 이해',
    description: '회사와 프로젝트에 대해 학습합니다.',
    isQuizRequired: true
  }
] as const

export const CHECKLIST_ITEMS: ChecklistSection[] = [
  {
    id: 'equipment-and-tools',
    title: '장비 및 개발 도구 준비',
    step: 1,
    items: [
      { id: 'laptop', title: '노트북', completed: false },
      { id: 'ide', title: 'IDE', completed: false },
      { id: 'copilot', title: 'Copilot', completed: false }
    ]
  },
  {
    id: 'accounts',
    title: '계정 생성 및 권한 부여',
    step: 2,
    items: [
      { id: 'google', title: 'Google Workspace', completed: false },
      { id: 'slack', title: 'Slack', completed: false },
      { id: 'github', title: 'Github', completed: false },
      { id: 'aws', title: 'AWS', completed: false },
      { id: 'jira', title: 'Jira', completed: false },
      { id: 'confluence', title: 'Confluence', completed: false },
      { id: 'notion', title: 'Notion', completed: false }
    ]
  },
  {
    id: 'company',
    title: '회사 및 프로젝트 이해',
    step: 3,
    items: [
      { id: 'company-intro', title: '회사 소개', completed: false },
      {
        id: 'mortgage-los',
        title: '모기지 대출 및 LOS 이해',
        items: [
          { id: 'mortgage-process', title: '📑 모기지 대출 프로세스', completed: false, link: '#' },
          { id: 'los-workflow', title: '📑 LOS Workflow 내 각 담당자 역할', completed: false, link: '#' }
        ]
      },
      {
        id: 'project-tech',
        title: '프로젝트 및 기술 스택 개요',
        items: [
          {
            id: 'future-plans',
            title: '향후 계획 및 현재 상태',
            items: [
              { id: 'competition', title: '📑 경쟁력 확보 계획', completed: false, link: '#' }
            ]
          },
          {
            id: 'architecture',
            title: '주요 아키텍처 및 데이터 흐름',
            items: [
              { id: 'tech-stack', title: '📑 테크 스택', completed: false, link: '#' },
              { id: 'system-diagram', title: '📑 시스템 구성도 (draft)', completed: false, link: '#' },
              { id: 'service-list', title: '📑 Service & Server 목록', completed: false, link: '#' },
              { id: 'design-notes', title: '📑 ✏️ Design Notes', completed: false, link: '#' }
            ]
          }
        ]
      }
    ]
  }
]