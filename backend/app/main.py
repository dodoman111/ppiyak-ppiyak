"""FastAPI 엔트리포인트."""

from __future__ import annotations

from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .data import SYMPTOM_TO_NUTRIENT
from .recommender import recommend

app = FastAPI(title="삐약삐약 API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RecommendRequest(BaseModel):
    symptoms: List[str] = Field(
        default_factory=list,
        description="사용자가 선택한 증상 목록",
    )


class NutrientOut(BaseModel):
    name: str
    description: str


class ProductOut(BaseModel):
    name: str
    brand: str
    price: int
    link: str
    nutrient: str


class RecommendResponse(BaseModel):
    nutrients: List[NutrientOut]
    products: List[ProductOut]


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/symptoms")
def symptoms() -> dict:
    """프론트가 증상 목록을 동적으로 받을 수 있도록 노출."""
    return {"symptoms": list(SYMPTOM_TO_NUTRIENT.keys())}


@app.post("/recommend", response_model=RecommendResponse)
def recommend_endpoint(req: RecommendRequest) -> RecommendResponse:
    result = recommend(req.symptoms)
    return RecommendResponse(**result)
