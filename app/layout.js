import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/authProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "3D 프린터 현황",
  description: "경기과학기술대학교 3D 프린터 현황 사이트",
  generator: "Next.js",
  applicationName: "디공프린터",
  referrer: "origin-when-cross-origin",
  keywords: ["경기과학기술대", "경기과기대", "3D프린터", "대학교"],
  colorScheme: "system",
  creator: "디자인공학과 조준형",
  publisher: "디자인공학과 조준형",
  themeColor: "#ffa500", // PWA 메타데이터 추가
  appleMobileWebAppCapable: "yes", // iOS PWA 설정
  appleMobileWebAppStatusBarStyle: "black-translucent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} bg-[#fafafa] h-full w-full dark:bg-slate-800`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar className="fixed top-0" />
            {children}
            <Analytics />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
