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
        {/* <div className="mt-4 w-36 h-4 relative">
          <Progress value={progress} className="h-full" />
          <span className="text-black absolute inset-0 flex items-center justify-center text-sm">
            로딩 중...
          </span>
        </div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-500 -500 1000 1000"
          className="w-full max-w-lg"
        >
          {/* Add your Tailwind styles for the SVG elements */}
          <style>
            {`
            .filament {
              stroke: #ED6B21;
            }
            .spool {
              stroke: #231F20;
              fill: none;
            }
            .filament line {
              stroke-linecap: round;
            }
          `}
          </style>

          {/* Your SVG content */}
          <defs>
            <pattern
              id="hexagon"
              className="spool"
              viewBox="-0.866025 -1.5 1.73205 3"
              width="57.735"
              height="100"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(0.875)"
            >
              <polygon
                points="0,1 0.866025,0.5 0.866025,-0.5 0,-1 -0.866025,-0.5 -0.866025,0.5"
                fill="none"
                strokeWidth="0.34"
              />
              <line x1="0" y1="1" x2="0" y2="1.5" strokeWidth="0.34" />
              <line x1="0" y1="-1" x2="0" y2="-1.5" strokeWidth="0.34" />
            </pattern>
          </defs>
          <g className="filament">
            {/* Filled range is from radius 80 to 210 */}
            <circle r="145" fill="none" strokeWidth="130">
              <animate
                attributeName="r"
                values="145;80;145"
                dur="6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                values="130;0;130"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
            <line x1="204" y1="0" x2="204" y2="245" strokeWidth="12">
              <animate
                attributeName="x1"
                values="204;74;204"
                dur="6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="204;74;204"
                dur="6s"
                repeatCount="indefinite"
              />
            </line>
          </g>
          <g className="spool">
            <circle
              r="157"
              fill="none"
              strokeWidth="171"
              stroke="url(#hexagon)"
            />
            <circle r="244" strokeWidth="12" />
            <circle r="71" strokeWidth="18" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;540;0"
              begin="0s"
              dur="6s"
              fill="freeze"
              repeatCount="indefinite"
            />
          </g>
        </svg>
        로딩중 . . .
      </div>
    </div>
  );
}
