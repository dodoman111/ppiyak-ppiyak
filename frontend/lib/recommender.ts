import {
  NUTRIENT_DESCRIPTION,
  PRODUCTS,
  SYMPTOM_TO_NUTRIENT,
  type Product,
} from "./data";

export type RecommendedNutrient = { name: string; description: string };
export type RecommendedProduct = Product & { nutrient: string };
export type RecommendResult = {
  nutrients: RecommendedNutrient[];
  products: RecommendedProduct[];
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

export function recommend(symptoms: string[]): RecommendResult {
  const nutrients = collectNutrients(symptoms);
  return {
    nutrients: nutrients.map((name) => ({
      name,
      description: NUTRIENT_DESCRIPTION[name] ?? "",
    })),
    products: collectProducts(nutrients),
  };
}

export function listSymptoms(): string[] {
  return Object.keys(SYMPTOM_TO_NUTRIENT);
}
