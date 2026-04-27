import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-between bg-gradient-to-b from-brand-50 via-white to-white px-6 pb-10 pt-16">
      <section className="space-y-6">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          <span aria-hidden>🐥</span> 삐약삐약
        </span>
        <div className="text-7xl leading-none">🐥</div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900">
          오늘도 무럭무럭,
          <br />
          삐약이가 골라줄게!
        </h1>
        <p className="text-base leading-relaxed text-slate-600">
          요즘 컨디션 한 줄이면 충분해요. 삐약이가 딱 맞는 영양소와 제품을
          쏙쏙 뽑아드려요. 30초면 끝!
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <ul className="space-y-3">
          {[
            { emoji: "🩺", text: "증상별 맞춤 영양소 매칭" },
            { emoji: "🛒", text: "바로 구매 가능한 제품 링크" },
            { emoji: "⚡", text: "30초면 끝나는 간편 설문" },
          ].map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-slate-700"
            >
              <span className="text-lg">{item.emoji}</span>
              {item.text}
            </li>
          ))}
        </ul>

        <Link
          href="/survey"
          className="block w-full rounded-2xl bg-brand-400 py-4 text-center text-base font-semibold text-slate-900 shadow-lg shadow-brand-400/40 transition active:scale-[0.98] hover:bg-brand-500"
        >
          삐약! 추천 받기 🐥
        </Link>
        <p className="text-center text-xs text-slate-400">
          * 의료 행위가 아닌 일반적인 정보 제공 목적입니다.
        </p>
      </section>
    </main>
  );
}
