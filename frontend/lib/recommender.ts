import {
  NUTRIENT_CONFLICTS,
  NUTRIENT_DESCRIPTION,
  NUTRIENT_SYNERGIES,
  NUTRIENT_TIMING,
  PRODUCTS,
  SYMPTOM_TO_NUTRIENT,
  type Product,
  type Timing,
} from "./data";

export type RecommendedNutrient = {
  name: string;
  description: string;
  timing: Timing | null;
};
export type RecommendedProduct = Product & { nutrient: string };
export type PairInsight = { a: string; b: string; reason: string };

export type RecommendResult = {
  nutrients: RecommendedNutrient[];
  products: RecommendedProduct[];
  synergies: PairInsight[];
  conflicts: PairInsight[];
};

export function collectNutrients(symptoms: string[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const symptom of symptoms) {
    for (const nutrient of SYMPTOM_TO_NUTRIENT[symptom] ?? []) {
      if (seen.has(nutrient)) continue;
      seen.add(nutrient);
      ordered.push(nutrient);
    }
  }
  return ordered;
}

export function collectProducts(nutrients: string[]): RecommendedProduct[] {
  const seen = new Set<string>();
  const result: RecommendedProduct[] = [];
  for (const nutrient of nutrients) {
    for (const product of PRODUCTS[nutrient] ?? []) {
      if (seen.has(product.name)) continue;
      seen.add(product.name);
      result.push({ ...product, nutrient });
    }
  }
  return result;
}

function findPairsAmong(
  nutrients: string[],
  entries: Array<{ pair: [string, string]; reason: string }>,
): PairInsight[] {
  const set = new Set(nutrients);
  return entries
    .filter(({ pair }) => set.has(pair[0]) && set.has(pair[1]))
    .map(({ pair, reason }) => ({ a: pair[0], b: pair[1], reason }));
}

export function recommend(symptoms: string[]): RecommendResult {
  const nutrients = collectNutrients(symptoms);
  return {
    nutrients: nutrients.map((name) => ({
      name,
      description: NUTRIENT_DESCRIPTION[name] ?? "",
      timing: NUTRIENT_TIMING[name] ?? null,
    })),
    products: collectProducts(nutrients),
    synergies: findPairsAmong(nutrients, NUTRIENT_SYNERGIES),
    conflicts: findPairsAmong(nutrients, NUTRIENT_CONFLICTS),
  };
}

export function listSymptoms(): string[] {
  return Object.keys(SYMPTOM_TO_NUTRIENT);
}
