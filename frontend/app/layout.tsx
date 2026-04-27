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
        </div>
      </body>
    </html>
  );
}
