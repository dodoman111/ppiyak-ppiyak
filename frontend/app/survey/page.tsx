"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchSymptoms } from "@/lib/api";

const FALLBACK_SYMPTOMS = [
  "피로",
  "눈건강",
  "면역력",
  "수면문제",
  "관절",
  "장건강",
  "스트레스",
  "집중력",
];

const SYMPTOM_META: Record<string, { emoji: string; hint: string }> = {
  피로: { emoji: "😮‍💨", hint: "쉽게 지치고 무기력해요" },
  눈건강: { emoji: "👀", hint: "눈이 건조하고 침침해요" },
  면역력: { emoji: "🛡️", hint: "감기에 자주 걸려요" },
  수면문제: { emoji: "🌙", hint: "잠들기 어렵거나 깊지 않아요" },
  관절: { emoji: "🦴", hint: "무릎·관절이 뻐근해요" },
  장건강: { emoji: "🌀", hint: "소화·배변이 불규칙해요" },
  스트레스: { emoji: "😵‍💫", hint: "긴장감이 자주 들어요" },
  집중력: { emoji: "🎯", hint: "업무·공부 집중이 어려워요" },
};

export default function SurveyPage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<string[]>(FALLBACK_SYMPTOMS);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSymptoms()
      .then((list) => {
        if (list.length > 0) setSymptoms(list);
      })
      .catch(() => {
        // API 미가용 시 fallback 그대로 사용
      });
  }, []);

  const toggle = (symptom: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(symptom)) next.delete(symptom);
      else next.add(symptom);
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) {
      setError("증상을 1개 이상 선택해주세요.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const params = new URLSearchParams();
    Array.from(selected).forEach((s) => params.append("s", s));
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="flex flex-1 flex-col px-6 pb-10 pt-10">
      <Link
        href="/"
        className="mb-6 inline-flex w-fit items-center gap-1 text-sm text-slate-500"
      >
        ← 홈으로
      </Link>

      <header className="space-y-2">
        <p className="text-sm font-semibold text-brand-600">🐥 삐약! 한 가지만 물어볼게</p>
        <h2 className="text-2xl font-bold text-slate-900">
          요즘 가장 신경 쓰이는
          <br />
          증상이 뭐야?
        </h2>
        <p className="text-sm text-slate-500">여러 개 골라도 괜찮아요.</p>
      </header>

      <ul className="mt-8 grid grid-cols-2 gap-3">
        {symptoms.map((symptom) => {
          const meta = SYMPTOM_META[symptom] ?? { emoji: "✅", hint: "" };
          const active = selected.has(symptom);
          return (
            <li key={symptom}>
              <button
                type="button"
                onClick={() => toggle(symptom)}
                className={`flex h-full w-full flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition active:scale-[0.98] ${
                  active
                    ? "border-brand-400 bg-brand-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">{meta.emoji}</span>
                <span className="text-base font-semibold text-slate-900">
                  {symptom}
                </span>
                {meta.hint && (
                  <span className="text-xs text-slate-500">{meta.hint}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-10">
        {error && (
          <p className="mb-3 text-center text-sm text-red-500">{error}</p>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full rounded-2xl bg-brand-400 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-brand-400/40 transition active:scale-[0.98] hover:bg-brand-500 disabled:opacity-60"
        >
          {submitting
            ? "삐약이가 고민 중... 🐥"
            : `삐약! 결과 보기${selected.size > 0 ? ` (${selected.size})` : ""}`}
        </button>
      </div>
    </main>
  );
}
