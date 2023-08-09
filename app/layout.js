import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/authProvider";
import { LoadingPage } from "@/components/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "3D 프린터 현황",
  description: "경기과학기술대학교 3D 프린터 현황 사이트",
  generator: "Next.js",
  applicationName: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["경기과학기술대", "경기과기대", "3D프린터", "대학교"],
  colorScheme: "light",
  creator: "디자인공학과 조준형",
  publisher: "디자인공학과 조준형",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-[#fafafa] h-full w-full`}>
        <AuthProvider>
          <LoadingPage />
          <Navbar className="fixed top-0" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
