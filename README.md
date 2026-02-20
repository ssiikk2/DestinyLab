# DestinyLab

DestinyLab은 광고 수익형 영어 사이트를 목표로 만든 단일 Next.js 컨테이너 프로젝트입니다.
호환성(Compatibility)과 운명(Destiny) 도구를 중심으로 재방문, 공유, 점진적 SEO 확장을 노립니다.

## 프로젝트 구조

```text
.
├─ app
│  ├─ api
│  │  ├─ compatibility
│  │  ├─ destiny
│  │  └─ indexnow
│  ├─ blog/[slug]
│  ├─ compatibility/[pair]
│  ├─ reading/[id]
│  ├─ reading/[id]/[section]
│  ├─ og
│  ├─ privacy / terms / disclaimer / contact / about
│  └─ [indexnowKey].txt
├─ components
├─ content
├─ infra
│  └─ deploy-single.ps1
├─ lib
├─ providers
├─ scripts
│  └─ generate-content.ts
├─ keywords.csv
├─ Dockerfile
└─ .env.example
```

## 로컬 실행 방법

1. 의존성 설치

```bash
npm install
```

2. 환경 변수 파일 생성

```bash
cp .env.example .env.local
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 브라우저 접속

```text
http://localhost:3000
```

## 콘텐츠 생성 방법

`keywords.csv`를 입력으로 사용합니다.

1. 기본 생성

```bash
npm run generate:content
```

2. 생성 후 IndexNow 자동 핑

```bash
npm run generate:content:ping
```

생성 결과는 `content/blog.generated.json`에 저장됩니다.

## 점진적 SEO 확장 전략

1. 초기에는 20~50 페이지만 운영합니다.
2. `/blog/{slug}`는 키워드별 장문 문서(FAQ 6개 포함)로 유지합니다.
3. `/compatibility/{signA}-and-{signB}`는 우선 반응이 좋은 조합부터 확장합니다.
4. 내부 링크를 블로그 ↔ 도구 ↔ 호환성 페이지로 촘촘히 연결합니다.
5. 색인 및 유입 데이터를 보고 노출/클릭이 좋은 주제부터 추가 발행합니다.

## Docker 빌드 방법

1. 이미지 빌드

```bash
docker build -t destinylab:local .
```

2. 컨테이너 실행

```bash
docker run --rm -p 3000:3000 --env-file .env.local destinylab:local
```

## deploy-single.ps1 실행 방법

사전 조건:
- Azure CLI 설치
- `az login` 완료
- 대상 구독 선택 완료

실행 예시:

```powershell
./infra/deploy-single.ps1 `
  -ResourceGroup "destinylab-rg" `
  -Location "eastus" `
  -AcrName "destinylab12345" `
  -ContainerEnvName "destinylab-env"
```

스크립트는 아래를 자동 처리합니다.
- `containerapp` 확장 설치/업데이트
- 리소스 그룹 생성(없으면)
- ACR 생성(없으면)
- Container Apps 환경 생성(없으면)
- `az acr build`로 이미지 빌드
- 단일 앱 `destinylab-main` 배포
- 시스템 ID 활성화 + `AcrPull` 권한 부여
- 앱 이름/FQDN/리비전 출력

## FQDN으로 HTTPS 테스트

배포 스크립트 출력의 FQDN을 사용합니다.

1. 기본 접속

```text
https://<출력된-fqdn>
```

2. 핵심 라우트 확인
- `/`
- `/privacy`
- `/robots.txt`
- `/sitemap.xml`
- `/og?tool=compatibility&score=82&label=Aries%20%2B%20Scorpio`

## 애드센스 승인 체크리스트

1. 정책 페이지 5종(Privacy/Terms/Disclaimer/Contact/About) 공개
2. 쿠키 동의 배너 동작 확인
3. 콘텐츠 품질 우선(얕은 자동문서 대량 배포 금지)
4. 광고 과밀 배치 금지(첫 화면 광고 과도 배치 금지)
5. 모바일 가독성, 로딩 속도, 내부 링크 구조 점검
6. `ADS_ENABLED=true` 전환 전 테스트 환경에서 배너/레이아웃 검증

## IndexNow 설정 방법

1. 키 생성
- 임의의 긴 문자열을 키로 생성합니다.
- 예: `INDEXNOW_KEY=your_generated_key`

2. 환경 변수 설정
- `.env.local` 또는 배포 환경 변수에 `INDEXNOW_KEY` 추가

3. 키 파일 공개 확인
- `https://<도메인 또는 FQDN>/<INDEXNOW_KEY>.txt` 접속 시 키 문자열이 보여야 합니다.

4. Bing Webmaster 설정
- Bing Webmaster Tools에 사이트 등록
- 사이트맵 URL(`https://<도메인 또는 FQDN>/sitemap.xml`) 제출
- 색인/크롤링 상태 모니터링

5. 자동 핑 활성화
- 콘텐츠 생성 시 `npm run generate:content:ping` 사용
- 또는 `/api/indexnow`로 URL 목록을 직접 전송

## 운영 팁

1. 광고는 점진적으로 늘리고 사용자 체류 지표를 먼저 확인합니다.
2. 반응이 좋은 페이지를 기준으로 유사 주제를 확장합니다.
3. 툴 결과 공유율, 재방문율, 체류시간을 핵심 지표로 관리합니다.
4. 무리한 페이지 폭증보다 주간 단위의 안정적 발행이 장기적으로 유리합니다.
