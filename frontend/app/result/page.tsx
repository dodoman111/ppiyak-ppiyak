"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  recommend,
  type Nutrient,
  type PairInsight,
  type Product,
  type RecommendResponse,
} from "@/lib/api";

function formatPrice(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

function ResultBody({ symptoms }: { symptoms: string[] }) {
  const [data, setData] = useState<RecommendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    recommend(symptoms)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [symptoms]);

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 px-4 py-6 text-center text-sm text-red-600">
        {error}
        <p className="mt-2 text-xs text-red-400">
          잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (data.nutrients.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        🐥 삐약... 못 찾았어요. 증상을 다시 골라줘!
      </div>
    );
  }

  return (
    <>
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">🌱 추천 영양소</h3>
        <ul className="space-y-2">
          {data.nutrients.map((n: Nutrient) => (
            <li
              key={n.name}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-semibold text-brand-700">
                  {n.name}
                </p>
                {n.timing && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                    <span aria-hidden>{n.timing.emoji}</span> {n.timing.slot}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {n.description}
              </p>
              {n.timing && (
                <p className="mt-2 text-xs text-slate-500">
                  💡 {n.timing.reason}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {data.synergies.length > 0 && (
        <section className="mt-8 space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            🤝 함께 먹으면 좋아요
          </h3>
          <ul className="space-y-2">
            {data.synergies.map((s: PairInsight) => (
              <li
                key={`${s.a}-${s.b}`}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
              >
                <p className="text-sm font-semibold text-emerald-800">
                  {s.a} <span className="text-emerald-500">＋</span> {s.b}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-900/80">
                  {s.reason}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.conflicts.length > 0 && (
        <section className="mt-8 space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            ⚠️ 시간 간격을 두세요
          </h3>
          <ul className="space-y-2">
            {data.conflicts.map((c: PairInsight) => (
              <li
                key={`${c.a}-${c.b}`}
                className="rounded-2xl border border-orange-200 bg-orange-50 p-4"
              >
                <p className="text-sm font-semibold text-orange-800">
                  {c.a} <span className="text-orange-500">↔</span> {c.b}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-orange-900/80">
                  {c.reason}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8 space-y-3">
        <h3 className="text-lg font-bold text-slate-900">🛒 추천 제품</h3>
        <ul className="space-y-3">
          {data.products.map((p: Product) => (
            <li
              key={p.name}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="inline-block rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                    {p.nutrient}
                  </span>
                  <p className="text-sm text-slate-500">{p.brand}</p>
                  <p className="text-base font-semibold text-slate-900">
                    {p.name}
                  </p>
                </div>
                <p className="shrink-0 text-base font-bold text-slate-900">
                  {formatPrice(p.price)}
                </p>
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer noopener"
                className="block rounded-xl bg-slate-900 py-3 text-center text-sm font-semibold text-white transition active:scale-[0.98] hover:bg-slate-800"
              >
                구매 링크 열기 →
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function ResultContent() {
  const params = useSearchParams();
  const symptoms = params.getAll("s");

  return (
    <main className="flex flex-1 flex-col px-6 pb-10 pt-10">
      <Link
        href="/survey"
        className="mb-6 inline-flex w-fit items-center gap-1 text-sm text-slate-500"
      >
        ← 다시 선택
      </Link>

      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">🐥 삐약! 가져왔어</p>
        <h2 className="text-2xl font-bold text-slate-900">
          너한테 딱 맞는
          <br />
          영양 한 그릇이야.
        </h2>
        {symptoms.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {symptoms.map((s) => (
              <span
                key={s}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                #{s}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-8">
        {symptoms.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            먼저 설문에서 증상을 선택해주세요.
          </p>
        ) : (
          <ResultBody symptoms={symptoms} />
        )}
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="block w-full rounded-2xl border border-slate-200 bg-white py-4 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          처음으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 flex-col gap-3 px-6 pt-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
