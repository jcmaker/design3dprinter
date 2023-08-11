"use client";

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

export function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 90); // 0.1초마다 프로그레스 업데이트

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const loadingPage = document.getElementById("loading-page");
      if (loadingPage) {
        loadingPage.style.display = "none";
      }
    }
  }, [progress]);

  return (
    <div
      id="loading-page"
      className="fixed inset-0 flex items-center justify-center bg-white text-whit z-[99]"
    >
      <div className="flex flex-col items-center justify-center w-full">
        {/* 로딩 아이콘 또는 원하는 내용 */}
        <div className="mt-4 w-36 h-4 relative">
          {" "}
          {/* relative 클래스 추가 */}
          <Progress value={progress} className="h-full" />
          <span className="text-black absolute inset-0 flex items-center justify-center text-sm">
            로딩 중...
          </span>
        </div>
      </div>
    </div>
  );
}
