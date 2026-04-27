export type Product = {
  name: string;
  brand: string;
  price: number;
  link: string;
};

export const SYMPTOM_TO_NUTRIENT: Record<string, string[]> = {
  피로: ["비타민B", "마그네슘", "코엔자임Q10"],
  눈건강: ["루테인", "오메가3"],
  면역력: ["비타민C", "아연", "프로폴리스"],
  수면문제: ["마그네슘", "테아닌"],
  관절: ["MSM", "글루코사민"],
  장건강: ["프로바이오틱스", "식이섬유"],
  스트레스: ["테아닌", "비타민B"],
  집중력: ["오메가3", "비타민B"],
};

export const NUTRIENT_DESCRIPTION: Record<string, string> = {
  비타민B: "에너지 대사를 도와 피로 회복에 핵심적인 역할을 합니다.",
  마그네슘:
    "근육 이완과 신경 안정에 도움을 주어 수면과 피로 개선에 기여합니다.",
  코엔자임Q10: "세포 에너지 생성을 촉진하고 항산화 작용을 합니다.",
  루테인: "눈의 황반 색소를 보호하여 시력 건강을 지원합니다.",
  오메가3: "혈행 개선과 두뇌·눈 건강에 도움을 줍니다.",
  비타민C: "강력한 항산화 효과로 면역력 강화에 기여합니다.",
  아연: "면역 세포 활동에 필수적인 미네랄입니다.",
  프로폴리스: "천연 항균 성분으로 면역 보조에 활용됩니다.",
  테아닌: "심리적 안정과 수면의 질 개선에 도움을 줍니다.",
  MSM: "관절 건강과 연골 보호에 도움이 됩니다.",
  글루코사민: "연골 구성 성분으로 관절 움직임을 부드럽게 합니다.",
  프로바이오틱스: "장내 유익균을 늘려 장 건강을 개선합니다.",
  식이섬유: "장 운동을 도와 규칙적인 배변에 기여합니다.",
};

export type Timing = {
  slot: string;
  emoji: string;
  reason: string;
};

export const NUTRIENT_TIMING: Record<string, Timing> = {
  비타민B: { slot: "아침", emoji: "🌅", reason: "에너지 대사 활성화 — 하루 시작에" },
  비타민C: { slot: "아침 식후", emoji: "🍳", reason: "수용성, 위 부담 줄이려 식후 권장" },
  코엔자임Q10: { slot: "식사와 함께", emoji: "🥗", reason: "지용성 — 지방과 함께 흡수↑" },
  루테인: { slot: "식사와 함께", emoji: "🥗", reason: "지용성 — 지방과 함께 흡수↑" },
  오메가3: { slot: "식사와 함께", emoji: "🥗", reason: "지용성 — 식사 중 흡수율 ↑" },
  아연: { slot: "식간/언제든", emoji: "⏰", reason: "공복 권장, 위 자극 시 식후도 OK" },
  프로폴리스: { slot: "아침 공복", emoji: "🌅", reason: "공복 흡수율 좋음" },
  테아닌: { slot: "취침 전", emoji: "🌙", reason: "긴장 완화 → 잠들기 도움" },
  마그네슘: { slot: "취침 전", emoji: "🌙", reason: "근육 이완 + 수면 질 개선" },
  MSM: { slot: "식사와 함께", emoji: "🥗", reason: "위 부담 ↓" },
  글루코사민: { slot: "식사와 함께", emoji: "🥗", reason: "위 부담 ↓" },
  프로바이오틱스: {
    slot: "아침 공복",
    emoji: "🌅",
    reason: "위산 노출 ↓ → 유익균 생존율 ↑",
  },
  식이섬유: {
    slot: "식간/언제든",
    emoji: "⏰",
    reason: "충분한 물과 함께, 식간이 무난",
  },
};

export type SynergyEntry = { pair: [string, string]; reason: string };

export const NUTRIENT_SYNERGIES: SynergyEntry[] = [
  {
    pair: ["비타민C", "아연"],
    reason: "면역 시스템에 함께 작용 — 환절기에 강력한 콤비",
  },
  {
    pair: ["오메가3", "코엔자임Q10"],
    reason: "심혈관 보호 + 세포 에너지 생성을 동시에",
  },
  {
    pair: ["프로바이오틱스", "식이섬유"],
    reason: "유익균 + 먹이 = 장 건강 시너지 (식이섬유는 prebiotic)",
  },
  {
    pair: ["비타민B", "마그네슘"],
    reason: "에너지 대사를 함께 도와 피로 회복에 효과적",
  },
];

export type ConflictEntry = { pair: [string, string]; reason: string };

export const NUTRIENT_CONFLICTS: ConflictEntry[] = [
  {
    pair: ["식이섬유", "마그네슘"],
    reason: "식이섬유가 미네랄 흡수를 늦출 수 있어요. 2시간 간격 권장",
  },
  {
    pair: ["식이섬유", "아연"],
    reason: "식이섬유가 미네랄 흡수를 늦출 수 있어요. 2시간 간격 권장",
  },
];

export const PRODUCTS: Record<string, Product[]> = {
  비타민B: [
    {
      name: "고려은단 비타민B 컴플렉스",
      brand: "고려은단",
      price: 18000,
      link: "https://link.coupang.com/a/exIbhb",
    },
    {
      name: "나우푸드 B-50",
      brand: "Now Foods",
      price: 21000,
      link: "https://kr.iherb.com/search?kw=now+b-50",
    },
  ],
  마그네슘: [
    {
      name: "닥터스베스트 마그네슘 글리시네이트",
      brand: "Doctor's Best",
      price: 23000,
      link: "https://kr.iherb.com/search?kw=doctors+best+magnesium",
    },
    {
      name: "GNC 마그네슘 400",
      brand: "GNC",
      price: 19000,
      link: "https://link.coupang.com/a/exIc2b",
    },
  ],
  코엔자임Q10: [
    {
      name: "솔가 코엠자임Q10 100mg",
      brand: "Solgar",
      price: 38000,
      link: "https://kr.iherb.com/search?kw=solgar+coq10",
    },
  ],
  루테인: [
    {
      name: "종근당건강 아이클리어 루테인",
      brand: "종근당건강",
      price: 15000,
      link: "https://link.coupang.com/a/exIdqt",
    },
    {
      name: "안국건강 루테인 지아잔틴",
      brand: "안국건강",
      price: 21500,
      link: "https://link.coupang.com/a/exIdB7",
    },
  ],
  오메가3: [
    {
      name: "노르웨이 트리플 오메가3",
      brand: "Now Foods",
      price: 26000,
      link: "https://kr.iherb.com/search?kw=omega-3",
    },
    {
      name: "GNC 트리플 스트렝스 오메가3",
      brand: "GNC",
      price: 32000,
      link: "https://link.coupang.com/a/exIdRe",
    },
  ],
  비타민C: [
    {
      name: "고려은단 비타민C 1000",
      brand: "고려은단",
      price: 18000,
      link: "https://link.coupang.com/a/exIebe",
    },
    {
      name: "캘리포니아골드 비타민C 1000mg",
      brand: "California Gold",
      price: 14500,
      link: "https://kr.iherb.com/search?kw=california+gold+vitamin+c",
    },
  ],
  아연: [
    {
      name: "Now Foods 아연 50mg",
      brand: "Now Foods",
      price: 9500,
      link: "https://kr.iherb.com/search?kw=now+zinc",
    },
  ],
  프로폴리스: [
    {
      name: "뉴질랜드 프로폴리스 스프레이",
      brand: "Comvita",
      price: 17000,
      link: "https://www.coupang.com/np/search?q=%ED%94%84%EB%A1%9C%ED%8F%B4%EB%A6%AC%EC%8A%A4",
    },
  ],
  테아닌: [
    {
      name: "닥터스베스트 L-테아닌",
      brand: "Doctor's Best",
      price: 18500,
      link: "https://kr.iherb.com/search?kw=l-theanine",
    },
  ],
  MSM: [
    {
      name: "Now Foods MSM 1000mg",
      brand: "Now Foods",
      price: 16000,
      link: "https://kr.iherb.com/search?kw=now+msm",
    },
  ],
  글루코사민: [
    {
      name: "GNC 트리플플렉스 글루코사민",
      brand: "GNC",
      price: 23000,
      link: "https://link.coupang.com/a/exIePV",
    },
  ],
  프로바이오틱스: [
    {
      name: "락토핏 생유산균 골드",
      brand: "종근당건강",
      price: 22000,
      link: "https://link.coupang.com/a/exIe6w",
    },
    {
      name: "캘리포니아골드 LactoBif 30B",
      brand: "California Gold",
      price: 28000,
      link: "https://kr.iherb.com/search?kw=lactobif",
    },
  ],
  식이섬유: [
    {
      name: "차전자피 식이섬유",
      brand: "Now Foods",
      price: 14000,
      link: "https://kr.iherb.com/search?kw=psyllium+husk",
    },
  ],
};
