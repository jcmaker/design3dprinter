"use client";
import React, { useEffect, useState } from "react";
import { db } from "fbManager";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { Toaster, toast } from "react-hot-toast";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

function Room315PrinterDetail() {
  const { printerId } = useParams();

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [printers, setPrinters] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      // user.uid가 유효한 경우에만 실행
      const unsubscribe = db
        .collection("users")
        .where("userId", "==", user.uid)
        .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            const userData = snapshot.docs[0]?.data();
            setName(userData?.name);
            setStudentId(userData?.studentId);
            setPhoneNumber(userData?.phoneNumber);
          }
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = db
      .collection("printers")
      .where("roomNumber", "==", "315")
      .where("serialNumber", "==", printerId)
      .onSnapshot((snapshot) => {
        const printerData = [];
        snapshot.forEach((doc) => {
          printerData.push({ id: doc.id, ...doc.data() });
        });
        setPrinters(printerData);
      });

    return () => {
      unsubscribe();
    };
  }, [printerId]);

  const handleNameChange = (e) => {
    const { value } = e.target;
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    if (value === "" || regex.test(value)) {
      setName(value);
    } else {
      toast.error("이름은 영문자, 한글, 공백만 입력 가능합니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || studentId.trim() === "") {
      toast.error("이름과 학번을 모두 입력해주세요.");
      return;
    }

    try {
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

      const now = new Date();
      const submissionTime = { hour: now.getHours(), minute: now.getMinutes() };
      const endTime = calculateEndTime(totalMinutes);

      const querySnapshot = await db
        .collection("printers")
        .where("roomNumber", "==", "315")
        .where("serialNumber", "==", printerId)
        .get();

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0]?.ref;
        await docRef.update({
          userName: name,
          userStudentId: studentId,
          phoneNumber: phoneNumber,
          printingTime: totalMinutes,
          submissionTime: submissionTime, // 제출 시간을 분 단위로 저장
          endTime: endTime, // 작동 종료 시간 저장
          status: "사용 중",
        });

        // alert("프린터 사용 정보가 업데이트되었습니다.");
        toast.success("프린터 사용 정보가 업데이트되었습니다.");

        // 리다이렉션
        router.push("/room315");
      } else {
        // alert("해당 프린터를 찾을 수 없습니다.");
        toast.dismiss("해당 프린터를 찾을 수 없습니다.");
        router.push("/room315");
      }
    } catch (error) {
      // alert("오류가 발생했습니다. 다시 시도해주세요.");
      toast.dismiss("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const calculateEndTime = (durationMinutes) => {
    const endTime = new Date();
    endTime.setTime(endTime.getTime() + durationMinutes * 60 * 1000);

    return endTime;
  };

  return (
    <div className="lg:flex">
      <Toaster />
      {printers[0]?.status === "사용가능" ||
      printers[0]?.status === "사용 중" ? (
        <>
          <Card
            key={printers[0]?.id}
            className="flex flex-col h-[300px] max-w-lg sm:mx-auto lg:w-1/4 mb-11 mt-10 lg:mt-40"
          >
            <CardHeader className="bg-white dark:bg-slate-300 rounded-t-md w-full h-3/5 flex flex-col items-center justify-center">
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
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <h2 className="text-lg font-medium">
                번호: {printers[0]?.serialNumber}
              </h2>
              <h3 className="">{printers[0]?.company}</h3>
              <p className="text-gray-500 dark:text-slate-200">
                상태: {printers[0]?.status} - {printers[0]?.userName}
              </p>
            </CardContent>
          </Card>
          <div className="max-w-lg mx-auto h-full bg-white dark:bg-slate-600 p-4 shadow-md rounded lg:mt-20">
            <h2 className="text-lg font-semibold mb-2">
              {printerId} 번 프린터
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="이름"
                value={name}
                // onChange={(e) => setName(e.target.value)}
                onChange={handleNameChange}
                className="border p-2 rounded w-full"
                disabled={
                  printers[0]?.status === "고장남" ||
                  printers[0]?.status === "수리중"
                }
              />
              <input
                type="text"
                placeholder="학번"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="border p-2 rounded w-full"
                disabled={
                  printers[0]?.status === "고장남" ||
                  printers[0]?.status === "수리중"
                }
              />
              <input
                type="text"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border p-2 rounded w-full"
                disabled={
                  printers[0]?.status === "고장남" ||
                  printers[0]?.status === "수리중"
                }
              />
              <div className="flex">
                <p className="flex flex-grow justify-start">시간</p>
                <p className="flex flex-grow justify-start">분</p>
              </div>
              <div className="flex">
                <input
                  type="number"
                  placeholder="시간"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="border p-2 rounded w-full mr-2"
                  disabled={
                    printers[0]?.status === "고장남" ||
                    printers[0]?.status === "수리중"
                  }
                />
                <input
                  type="number"
                  placeholder="분"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="border p-2 rounded w-full"
                  disabled={
                    printers[0]?.status === "고장남" ||
                    printers[0]?.status === "수리중"
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                disabled={
                  printers[0]?.status === "고장남" ||
                  printers[0]?.status === "수리중"
                }
              >
                제출
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          <AlertTriangle className="h-14 w-14 fill-rose-500 " />
          <h2 className="text-5xl text-black font-bold">이용 불가</h2>
          <span className="mt-8">{printers[0]?.status}</span>
        </div>
      )}
    </div>
  );
}

export default Room315PrinterDetail;
