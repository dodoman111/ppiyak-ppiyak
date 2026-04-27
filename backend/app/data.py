"""증상 → 영양소 매핑 + 영양소 → 제품 하드코딩 데이터.

MVP 단계에서는 DB 없이 코드 내 상수로 관리한다.
"""

from __future__ import annotations

from typing import TypedDict


class Product(TypedDict):
    name: str
    brand: str
    price: int
    link: str


SYMPTOM_TO_NUTRIENT: dict[str, list[str]] = {
    "피로": ["비타민B", "마그네슘", "코엔자임Q10"],
    "눈건강": ["루테인", "오메가3"],
    "면역력": ["비타민C", "아연", "프로폴리스"],
    "수면문제": ["마그네슘", "테아닌"],
    "관절": ["MSM", "글루코사민"],
    "장건강": ["프로바이오틱스", "식이섬유"],
    "스트레스": ["테아닌", "비타민B"],
    "집중력": ["오메가3", "비타민B"],
}


NUTRIENT_DESCRIPTION: dict[str, str] = {
    "비타민B": "에너지 대사를 도와 피로 회복에 핵심적인 역할을 합니다.",
    "마그네슘": "근육 이완과 신경 안정에 도움을 주어 수면과 피로 개선에 기여합니다.",
    "코엔자임Q10": "세포 에너지 생성을 촉진하고 항산화 작용을 합니다.",
    "루테인": "눈의 황반 색소를 보호하여 시력 건강을 지원합니다.",
    "오메가3": "혈행 개선과 두뇌·눈 건강에 도움을 줍니다.",
    "비타민C": "강력한 항산화 효과로 면역력 강화에 기여합니다.",
    "아연": "면역 세포 활동에 필수적인 미네랄입니다.",
    "프로폴리스": "천연 항균 성분으로 면역 보조에 활용됩니다.",
    "테아닌": "심리적 안정과 수면의 질 개선에 도움을 줍니다.",
    "MSM": "관절 건강과 연골 보호에 도움이 됩니다.",
    "글루코사민": "연골 구성 성분으로 관절 움직임을 부드럽게 합니다.",
    "프로바이오틱스": "장내 유익균을 늘려 장 건강을 개선합니다.",
    "식이섬유": "장 운동을 도와 규칙적인 배변에 기여합니다.",
}


PRODUCTS: dict[str, list[Product]] = {
    "비타민B": [
        {
            "name": "고려은단 비타민B 컴플렉스",
            "brand": "고려은단",
            "price": 18000,
            "link": "https://www.coupang.com/np/search?q=%EA%B3%A0%EB%A0%A4%EC%9D%80%EB%8B%A8+%EB%B9%84%ED%83%80%EB%AF%BCB",
        },
        {
            "name": "나우푸드 B-50",
            "brand": "Now Foods",
            "price": 21000,
            "link": "https://kr.iherb.com/search?kw=now+b-50",
        },
    ],
    "마그네슘": [
        {
            "name": "닥터스베스트 마그네슘 글리시네이트",
            "brand": "Doctor's Best",
            "price": 23000,
            "link": "https://kr.iherb.com/search?kw=doctors+best+magnesium",
        },
        {
            "name": "GNC 마그네슘 400",
            "brand": "GNC",
            "price": 19000,
            "link": "https://www.coupang.com/np/search?q=GNC+%EB%A7%88%EA%B7%B8%EB%84%A4%EC%8A%98",
        },
    ],
    "코엔자임Q10": [
        {
            "name": "솔가 코엠자임Q10 100mg",
            "brand": "Solgar",
            "price": 38000,
            "link": "https://kr.iherb.com/search?kw=solgar+coq10",
        },
    ],
    "루테인": [
        {
            "name": "종근당건강 아이클리어 루테인",
            "brand": "종근당건강",
            "price": 15000,
            "link": "https://www.coupang.com/np/search?q=%EC%A2%85%EA%B7%BC%EB%8B%B9+%EB%A3%A8%ED%85%8C%EC%9D%B8",
        },
        {
            "name": "안국건강 루테인 지아잔틴",
            "brand": "안국건강",
            "price": 17500,
            "link": "https://www.coupang.com/np/search?q=%EC%95%88%EA%B5%AD+%EB%A3%A8%ED%85%8C%EC%9D%B8",
        },
    ],
    "오메가3": [
        {
            "name": "노르웨이 트리플 오메가3",
            "brand": "Now Foods",
            "price": 26000,
            "link": "https://kr.iherb.com/search?kw=omega-3",
        },
        {
            "name": "GNC 트리플 스트렝스 오메가3",
            "brand": "GNC",
            "price": 32000,
            "link": "https://www.coupang.com/np/search?q=GNC+%EC%98%A4%EB%A9%94%EA%B0%803",
        },
    ],
    "비타민C": [
        {
            "name": "고려은단 비타민C 1000",
            "brand": "고려은단",
            "price": 12000,
            "link": "https://www.coupang.com/np/search?q=%EA%B3%A0%EB%A0%A4%EC%9D%80%EB%8B%A8+%EB%B9%84%ED%83%80%EB%AF%BCC",
        },
        {
            "name": "캘리포니아골드 비타민C 1000mg",
            "brand": "California Gold",
            "price": 14500,
            "link": "https://kr.iherb.com/search?kw=california+gold+vitamin+c",
        },
    ],
    "아연": [
        {
            "name": "Now Foods 아연 50mg",
            "brand": "Now Foods",
            "price": 9500,
            "link": "https://kr.iherb.com/search?kw=now+zinc",
        },
    ],
    "프로폴리스": [
        {
            "name": "뉴질랜드 프로폴리스 스프레이",
            "brand": "Comvita",
            "price": 25000,
            "link": "https://www.coupang.com/np/search?q=%ED%94%84%EB%A1%9C%ED%8F%B4%EB%A6%AC%EC%8A%A4",
        },
    ],
    "테아닌": [
        {
            "name": "닥터스베스트 L-테아닌",
            "brand": "Doctor's Best",
            "price": 18500,
            "link": "https://kr.iherb.com/search?kw=l-theanine",
        },
    ],
    "MSM": [
        {
            "name": "Now Foods MSM 1000mg",
            "brand": "Now Foods",
            "price": 16000,
            "link": "https://kr.iherb.com/search?kw=now+msm",
        },
    ],
    "글루코사민": [
        {
            "name": "GNC 트리플플렉스 글루코사민",
            "brand": "GNC",
            "price": 34000,
            "link": "https://www.coupang.com/np/search?q=%EA%B8%80%EB%A3%A8%EC%BD%94%EC%82%AC%EB%AF%BC",
        },
    ],
    "프로바이오틱스": [
        {
            "name": "락토핏 생유산균 골드",
            "brand": "종근당건강",
            "price": 22000,
            "link": "https://www.coupang.com/np/search?q=%EB%9D%BD%ED%86%A0%ED%95%8F",
        },
        {
            "name": "캘리포니아골드 LactoBif 30B",
            "brand": "California Gold",
            "price": 28000,
            "link": "https://kr.iherb.com/search?kw=lactobif",
        },
    ],
    "식이섬유": [
        {
            "name": "차전자피 식이섬유",
            "brand": "Now Foods",
            "price": 14000,
            "link": "https://kr.iherb.com/search?kw=psyllium+husk",
        },
    ],
}
