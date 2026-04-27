# 📱 NutriPick - 건강식품 추천 앱 (Fullstack App Concept)

---

## 1. 🎯 Product Overview

### 서비스명 (가칭)

NutriPick

### 한 줄 설명

사용자의 증상과 생활 습관을 기반으로 영양소와 건강식품을 추천하고 구매까지 연결하는 서비스

---

## 2. 🧱 System Architecture

```
[Frontend (Next.js)]
        ↓
[Backend (FastAPI)]
        ↓
[PostgreSQL]

(초기에는 제품 데이터는 코드에 하드코딩)
```

---

## 3. 🚀 MVP Scope (2주 목표)

### 핵심 목표

* 설문 → 추천 → 제품 확인 → 구매 링크
* 실제 사용자 테스트 가능 상태

---

## 4. 👤 User Flow

```
홈 → 설문 입력 → 추천 결과 → 제품 선택 → 구매 링크 이동
```

---

## 5. 🖥️ Frontend (Next.js)

### 주요 페이지

#### 1) Home

* 버튼: "추천 받기"

---

#### 2) Survey Page

* 증상 선택 (checkbox)

  * 피로
  * 눈건강
  * 면역력
  * 수면문제

* 제출 버튼

---

#### 3) Result Page

* 추천 영양소 리스트
* 추천 제품 리스트

---

### 프론트 요구사항

* Next.js 사용
* 간단한 UI (Tailwind CSS)
* API 호출로 데이터 가져오기

---

## 6. ⚙️ Backend (FastAPI)

### 기능

#### 1) 추천 API

POST /recommend

요청:

```
{
  "symptoms": ["피로", "눈건강"]
}
```

응답:

```
{
  "nutrients": ["비타민B", "마그네슘", "루테인"],
  "products": [
    {
      "name": "고려은단 비타민C",
      "price": 12000,
      "link": "https://..."
    }
  ]
}
```

---

## 7. 🧠 Recommendation Logic

### 구조

User Input → Symptom → Nutrient → Product

---

### 예시 룰

```python
SYMPTOM_TO_NUTRIENT = {
    "피로": ["비타민B", "마그네슘"],
    "눈건강": ["루테인"],
    "면역력": ["비타민C", "아연"],
    "수면": ["마그네슘"]
}
```

---

### 처리 로직

1. 증상 기반 영양소 수집
2. 중복 제거
3. 제품 매핑

---

## 8. 📦 Product Data (초기 전략)

### 중요

* 제품 20~30개만 사용
* 코드에 하드코딩

---

### 예시

```python
PRODUCTS = {
    "비타민C": [
        {
            "name": "고려은단 비타민C",
            "price": 12000,
            "link": "https://..."
        }
    ],
    "루테인": [
        {
            "name": "종근당 루테인",
            "price": 15000,
            "link": "https://..."
        }
    ]
}
```

---

## 9. 🗄️ Database (Optional - Phase 1에서는 생략 가능)

초기에는 DB 없이도 가능

추후 추가:

### User

* id
* age
* gender

---

## 10. 🧩 Claude Code Development Steps

---

### Step 1: Backend 생성

요청:

"FastAPI로 건강식품 추천 API 만들어줘
입력: symptoms
출력: nutrients + products
추천 로직 포함"

---

### Step 2: 추천 로직 개선

요청:

"증상 기반 영양소 추천 로직을 함수로 분리하고 테스트 코드 작성해줘"

---

### Step 3: Frontend 생성

요청:

"Next.js로 설문 입력하고 결과 보여주는 웹 만들어줘
Tailwind CSS 사용"

---

### Step 4: API 연결

요청:

"Next.js에서 FastAPI API 호출해서 결과 화면에 표시하도록 수정해줘"

---

### Step 5: UX 개선

요청:

"모바일 친화적인 UI로 개선해줘"

---

## 11. 📈 Future Roadmap

### Phase 2

* DB 도입
* 사용자 저장
* 추천 기록

---

### Phase 3

* 개인화 추천 (ML)
* 복용 스케줄

---

### Phase 4

* 자동 구매
* 구독 모델

---

## 12. 💰 Monetization

* 쿠팡 파트너스 / iHerb 제휴
* 프리미엄 추천
* 건강 리포트

---

## 13. ⚠️ 개발 원칙

* 제품 DB 만들려고 하지 말 것
* 추천 로직 먼저 완성할 것
* 빠르게 배포할 것
* UI는 단순하게

---

## 14. 🧠 핵심 전략

이 서비스는

"영양제를 추천하는 앱"이 아니라

👉 **사용자의 선택을 쉽게 만들어주는 도구**

이다.
