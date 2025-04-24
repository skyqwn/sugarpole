# 슈가폴 - 김병호

## 프로젝트 소개

이 프로젝트는 Cornerstone.js를 활용한 DICOM 의료 이미지 뷰어 애플리케이션입니다. React와 TypeScript, Tailwind CSS를 기반으로 만들어졌습니다.

## 주요 기능

- **DICOM 이미지 로드 및 표시**
- **이미지 회전, 반전, 확대 기능**
- **컬러맵 적용 및 명암 반전**
- **윈도우 레벨링(명암 조절)**
- **좌우 상하 반전**
- **페이지 탐색을 통한 여러 이미지 탐색**

### 프로젝트 구조

/src
/components
/common # 공통 UI 컴포넌트

- Button.tsx # 재사용 가능한 버튼 컴포넌트 - Header.tsx # 앱 헤더 컴포넌트

/dicom # DICOM 관련 컴포넌트

- PageNavigation.tsx # 이미지 페이지네이션 컴포넌트
- Toolbar.tsx # 이미지 조작 도구 모음
- Viewport.tsx # DICOM 이미지 표시 컴포넌트

/hooks

- useCornerstoneInitialization.ts # Cornerstone.js 초기화
- useDicomViewport.ts # 뷰포트 관리
- useImageUpdater.ts # 이미지 업데이트 관리
- useToolGroup.ts # Cornerstone 도구 설정
- useViewportActions.ts # 뷰포트 액션(회전, 확대/축소 등)
- useViewportSetup.ts # 뷰포트 초기 설정

/store # 상태 관리

- dicomViewerStore.ts # Zustand 기반 상태 저장소

/types # TypeScript 타입 정의

- dicom.ts # DICOM 관련 타입 정의
- App.tsx # 메인 앱 컴포넌트
- main.tsx # 앱 엔트리 포인트
- index.css # 전역 스타일 및 Tailwind CSS 설정
