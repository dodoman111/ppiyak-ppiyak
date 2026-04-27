export type Timing = {
  slot: string;
  emoji: string;
  reason: string;
};

export type Nutrient = {
  name: string;
  description: string;
  timing: Timing | null;
};

export type Product = {
  name: string;
  brand: string;
  price: number;
  link: string;
  nutrient: string;
};

export type PairInsight = {
  a: string;
  b: string;
  reason: string;
};

export type RecommendResponse = {
  nutrients: Nutrient[];
  products: Product[];
  synergies: PairInsight[];
  conflicts: PairInsight[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function fetchSymptoms(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/api/symptoms`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("증상 목록을 불러오지 못했습니다.");
  const data = (await res.json()) as { symptoms: string[] };
  return data.symptoms;
}

export async function recommend(
  symptoms: string[],
): Promise<RecommendResponse> {
  const res = await fetch(`${API_BASE_URL}/api/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("추천 결과를 가져오지 못했습니다.");
  return (await res.json()) as RecommendResponse;
}
