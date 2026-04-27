"""증상 입력을 받아 영양소와 제품을 추천하는 핵심 로직."""

from __future__ import annotations

from collections.abc import Iterable

from .data import (
    NUTRIENT_DESCRIPTION,
    PRODUCTS,
    SYMPTOM_TO_NUTRIENT,
    Product,
)


def collect_nutrients(symptoms: Iterable[str]) -> list[str]:
    """증상 리스트에서 중복 없이 영양소를 모은다.

    입력 순서를 유지하여 사용자가 처음 선택한 증상의 영양소가 먼저 노출되도록 한다.
    """
    seen: set[str] = set()
    ordered: list[str] = []
    for symptom in symptoms:
        for nutrient in SYMPTOM_TO_NUTRIENT.get(symptom, []):
            if nutrient not in seen:
                seen.add(nutrient)
                ordered.append(nutrient)
    return ordered


def collect_products(nutrients: Iterable[str]) -> list[Product]:
    """영양소 리스트에 매핑된 제품을 평탄화하여 반환한다."""
    seen: set[str] = set()
    result: list[Product] = []
    for nutrient in nutrients:
        for product in PRODUCTS.get(nutrient, []):
            key = product["name"]
            if key in seen:
                continue
            seen.add(key)
            result.append({**product, "nutrient": nutrient})  # type: ignore[typeddict-item]
    return result


def describe_nutrients(nutrients: Iterable[str]) -> list[dict]:
    return [
        {"name": n, "description": NUTRIENT_DESCRIPTION.get(n, "")} for n in nutrients
    ]


def recommend(symptoms: Iterable[str]) -> dict:
    nutrients = collect_nutrients(symptoms)
    products = collect_products(nutrients)
    return {
        "nutrients": describe_nutrients(nutrients),
        "products": products,
    }
