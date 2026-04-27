from app.recommender import collect_nutrients, collect_products, recommend


def test_single_symptom_returns_mapped_nutrients():
    nutrients = collect_nutrients(["눈건강"])
    assert "루테인" in nutrients
    assert "오메가3" in nutrients


def test_duplicate_nutrients_are_removed():
    # 피로와 수면문제는 둘 다 마그네슘을 포함한다.
    nutrients = collect_nutrients(["피로", "수면문제"])
    assert nutrients.count("마그네슘") == 1


def test_unknown_symptom_is_ignored():
    assert collect_nutrients(["없는증상"]) == []


def test_empty_input_returns_empty_response():
    result = recommend([])
    assert result == {"nutrients": [], "products": []}


def test_products_have_required_fields():
    products = collect_products(["비타민C"])
    assert products, "비타민C 매핑 제품이 비어 있으면 안 됨"
    for product in products:
        assert {"name", "brand", "price", "link", "nutrient"} <= set(product.keys())
        assert product["nutrient"] == "비타민C"


def test_recommend_full_payload_shape():
    payload = recommend(["면역력"])
    assert {"nutrients", "products"} == set(payload.keys())
    assert all("description" in n for n in payload["nutrients"])
