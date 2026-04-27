import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "삐약삐약 — 오늘도 무럭무럭",
  description:
    "오늘 내 컨디션에 딱 맞는 영양제를 삐약이가 골라드려요. 증상만 고르면 끝!",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#facc15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col bg-white shadow-sm">
          {children}
          <footer className="mt-auto border-t border-slate-100 px-6 py-5 text-[11px] leading-relaxed text-slate-400">
            <p>
              본 페이지의 일부 링크는 쿠팡 파트너스 활동의 일환으로, 이에 따른
              일정액의 수수료를 제공받습니다.
            </p>
            <p className="mt-1">
              영양제 정보는 의료 행위가 아닌 일반적인 정보 제공 목적이며,
              질환의 진단·치료를 대체하지 않습니다.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
