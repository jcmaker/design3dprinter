import React from "react";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "react-hot-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const PrinterSubmitCard = ({
  printer,
  handleSubmit,
  handleNameChange,
  setStudentId,
  setPhoneNumber,
  setHours,
  setMinutes,
  name,
  studentId,
  phoneNumber,
  hours,
  minutes,
}) => {
  return (
    <div className="flex pt-[80px] h-screen justify-center">
      <Toaster />
      {printer?.status === "사용가능" || printer?.status === "사용 중" ? (
        <>
          <Card className="flex flex-col h-auto lg:max-h-[800px] max-w-lg sm:mx-auto lg:w-1/4">
            <CardHeader className="bg-white dark:bg-slate-300 rounded-t-md w-full h-1/6 lg:h-1/3 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000"
                className="w-full max-w-lg h-full"
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
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <h2 className="text-lg font-semibold mb-2">
                {printer?.serialNumber} 번 프린터
              </h2>
              <h3 className="mb-2">{printer?.company}</h3>
              <p className="text-gray-500 dark:text-slate-200">
                상태: {printer?.status} -{" "}
                {printer?.userName ? (
                  printer?.userName
                ) : (
                  <span className="text-slate-500">비어있음</span>
                )}
              </p>
              <Separator className="mt-5 mb-5" />
              <form onSubmit={handleSubmit} className="space-y-4">
                <Label
                  htmlFor="name"
                  className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <Input
                    type="text"
                    id="name"
                    placeholder="이름"
                    value={name}
                    onChange={handleNameChange}
                    className="border p-2 rounded w-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    disabled={
                      printer?.status === "고장남" ||
                      printer?.status === "수리중"
                    }
                  />
                  <span className="pointer-events-none bg-white dark:bg-slate-950 absolute start-2 top-0 -translate-y-1/2 p-0.5 text-md text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    이름 <span className="text-red-600 text-center">*</span>
                  </span>
                </Label>
                <Label
                  htmlFor="studentId"
                  className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <Input
                    type="text"
                    id="studentId"
                    placeholder="학번"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="border p-2 rounded w-full peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                    disabled={
                      printer?.status === "고장남" ||
                      printer?.status === "수리중"
                    }
                  />
                  <span className="pointer-events-none bg-white dark:bg-slate-950 absolute start-2 top-0 -translate-y-1/2 p-0.5 text-md text-slate-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    학번 <span className="text-red-600 text-center">*</span>
                  </span>
                </Label>
                <Input
                  type="text"
                  placeholder="전화번호"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border p-2 rounded w-full"
                  disabled={
                    printer?.status === "고장남" || printer?.status === "수리중"
                  }
                />
                <div className="flex">
                  <p className="flex flex-grow justify-start">시간</p>
                  <p className="flex flex-grow justify-start">분</p>
                </div>
                <div className="flex">
                  <Input
                    type="number"
                    placeholder="시간"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="border p-2 rounded w-full mr-2"
                    disabled={
                      printer?.status === "고장남" ||
                      printer?.status === "수리중"
                    }
                  />
                  <Input
                    type="number"
                    placeholder="분"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="border p-2 rounded w-full"
                    disabled={
                      printer?.status === "고장남" ||
                      printer?.status === "수리중"
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 mt-10"
                  disabled={
                    printer?.status === "고장남" || printer?.status === "수리중"
                  }
                >
                  제출
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          <AlertTriangle className="h-14 w-14 fill-rose-500 " />
          <h2 className="text-5xl text-black font-bold">이용 불가</h2>
          <span className="mt-8">{printer?.status}</span>
        </div>
      )}
    </div>
  );
};

export default PrinterSubmitCard;
