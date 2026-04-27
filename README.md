# 🐥 삐약삐약

> 오늘도 무럭무럭 — 증상을 고르면 삐약이가 영양제를 골라주는 MVP.

```
frontend/   Next.js 14 (App Router) + Tailwind · UI + API Route (추천 로직)
backend/    (선택) FastAPI 버전 — 로컬 학습/실험용. 배포에는 사용하지 않음
```

배포는 **frontend** 한 폴더만으로 Vercel에 올라갑니다. 추천 로직이 `frontend/lib/recommender.ts` + `frontend/app/api/*`로 통합돼 있어 별도 백엔드 서버가 필요 없습니다.

---

## 로컬 실행

```bash
cd frontend
npm install
npm run dev
```

브라우저: http://localhost:3000

API도 같은 포트에서 동작:

- `GET  /api/symptoms`
- `POST /api/recommend`  (body: `{"symptoms":["피로","눈건강"]}`)

---

## Vercel 배포 (무료 티어)

### 한 줄 요약

```bash
cd frontend
npm i -g vercel    # 또는: npx vercel
vercel             # 첫 실행 시 브라우저 로그인 → 프로젝트 link 단계 → 미리보기 배포
vercel --prod      # 프로덕션 도메인으로 배포
```

### 단계별

1. **CLI 설치 및 로그인**
   ```bash
   npm i -g vercel
   vercel login        # 이메일로 인증 코드 → 브라우저 OAuth
   ```

2. **`frontend/`에서 `vercel` 실행**
   - `Set up and deploy? Y`
   - `Which scope?` → 본인 계정 선택
   - `Link to existing project?` → `N` (처음일 때)
   - `Project name?` → `ppiyak-ppiyak` (또는 원하는 이름)
   - `Directory?` → `./` (이미 frontend 안에서 실행했으므로)
   - 빌드 자동 감지 → 미리보기 URL이 출력됨

3. **프로덕션 배포**
   ```bash
   vercel --prod
   ```
   `https://nutripick.vercel.app` 같은 도메인이 출력됩니다.

4. **(선택) 도메인 연결**
   Vercel 대시보드 → 프로젝트 → Settings → Domains → 본인 도메인 추가.

### 배포 후 체크리스트

- [ ] `https://<your-app>.vercel.app/` 홈 진입
- [ ] `/api/symptoms` JSON 응답
- [ ] 설문 → 결과 페이지 추천 결과 표시
- [ ] 제품 카드 "구매 링크 열기" 작동

---

## 구조

### Frontend (배포 대상)

| 경로 | 역할 |
| --- | --- |
| `app/page.tsx` | 홈 (랜딩 + "추천 받기" CTA) |
| `app/survey/page.tsx` | 증상 다중 선택 설문 |
| `app/result/page.tsx` | 추천 영양소 + 제품 카드 + 구매 링크 |
| `app/api/symptoms/route.ts` | GET `/api/symptoms` (Edge Runtime) |
| `app/api/recommend/route.ts` | POST `/api/recommend` (Edge Runtime) |
| `lib/data.ts` | `SYMPTOM_TO_NUTRIENT`, `NUTRIENT_DESCRIPTION`, `PRODUCTS` 하드코딩 |
| `lib/recommender.ts` | 증상 → 영양소 → 제품 매핑 로직 |
| `lib/api.ts` | 클라이언트 fetch helper |

### Backend (선택, 배포에 미사용)

`backend/`에는 동일 로직의 FastAPI 구현이 남아 있습니다. Python 환경에서 실험/테스트가 필요할 때만 사용하세요.

패키지 매니저는 [uv](https://docs.astral.sh/uv/), 린트/포맷은 [ruff](https://docs.astral.sh/ruff/)를 씁니다.

```bash
brew install uv          # 처음 한 번만
cd backend
uv sync                  # .venv 생성 + 의존성 설치 (requirements.txt 대체)

uv run pytest                                # 테스트
uv run uvicorn app.main:app --reload         # 로컬 서버
uv run ruff format .                         # 포맷
uv run ruff check --fix .                    # 린트 + 자동 수정
```

> 의존성을 추가하려면 `uv add <pkg>` (런타임) 또는 `uv add --dev <pkg>` (개발용).

---

## 사용자 플로우

```
홈 → 설문(증상 선택) → 결과(영양소 설명 + 제품 카드) → 외부 구매 링크
```

---

## 다음 단계 (concept 문서 기준)

- Phase 2: PostgreSQL 도입 (Supabase 무료티어), 사용자 추천 기록 저장
- Phase 3: ML 기반 개인화 추천, 복용 스케줄
- Phase 4: 자동 구매, 구독 모델
- 수익화: 쿠팡 파트너스 / iHerb 제휴 링크 (현재 제품 링크는 검색 결과 페이지로 임시 연결)
- 배포 후: Vercel Analytics, 면책/약관 페이지, 카카오 공유, OG 이미지
