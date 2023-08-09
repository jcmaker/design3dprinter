"use client";
import { useEffect, useState } from "react";
import { db } from "fbManager";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, HardHat } from "lucide-react";

function Room315() {
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("printers")
      .where("roomNumber", "==", "315")
      .onSnapshot((snapshot) => {
        const printerData = [];
        snapshot.forEach((doc) => {
          printerData.push({ id: doc.id, ...doc.data() });
        });

        printerData.sort((a, b) =>
          parseInt(a.serialNumber) > parseInt(b.serialNumber) ? 1 : -1
        );
        setPrinters(printerData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const diffInMilliseconds = endTime - now;

    if (diffInMilliseconds <= 0) {
      return { hours: 0, minutes: 0 };
    }

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    return { hours, minutes };
  };

  return (
    <div className="p-4 pt-[80px]">
      <h1 className="font-bold text-xl mb-8">315호 프린터</h1>
      {/* 프린터 정보 표시 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {printers.map((printer) => {
          const remainingTime =
            printer.status === "사용 중"
              ? calculateRemainingTime(printer.endTime.toDate())
              : null;

          const progressValue =
            printer.status === "사용 중"
              ? Math.max(
                  0,
                  ((printer.printingTime -
                    remainingTime.hours * 60 -
                    remainingTime.minutes) /
                    printer.printingTime) *
                    100
                )
              : 0;

          return (
            <Card key={printer.id} className="flex flex-col h-[350px]">
              <CardHeader className="bg-slate-100 w-full h-3/5 flex items-center justify-center">
                {printer.status === "사용가능" && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <Progress value={0} className="bg-white" />
                    <span className="text-slate-500 absolute text-sm">
                      비어있음
                    </span>
                  </div>
                )}
                {printer.status === "고장남" && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <Progress value={0} className="bg-white" />
                    <AlertTriangle className="h-14 w-14 fill-rose-500 absolute" />
                  </div>
                )}
                {printer.status === "수리중" && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <Progress value={0} className="bg-white" />
                    <HardHat className="h-14 w-14 fill-yellow-300 absolute" />
                  </div>
                )}

                {printer.status === "사용 중" && (
                  <div className="flex flex-col items-center justify-center w-full">
                    <Progress value={progressValue} className="bg-white" />
                    <span className="text-black absolute text-sm">
                      {parseInt(progressValue)} %
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <h2 className="text-lg font-medium">
                  번호: {printer.serialNumber}
                </h2>
                <h3 className="">{printer.company}</h3>
                <p className="text-gray-500">
                  상태: {printer.status} - {printer.userName}
                </p>
                <p className="text-gray-500">
                  사용 시간: {Math.floor(printer.printingTime / 60)}시간{" "}
                  {printer.printingTime % 60}분
                </p>
                {remainingTime ? (
                  <p className="text-gray-500">
                    남은 시간: {remainingTime?.hours}시간{" "}
                    {remainingTime?.minutes}분
                  </p>
                ) : (
                  <p className="text-gray-500">남은 시간: 0시간 0분</p>
                )}

                {printer.status === "사용가능" ? (
                  <Link
                    className="w-full flex flex-col  justify-end mt-4"
                    href={`/room315/${printer.serialNumber}`}
                  >
                    <Button className="font-bold">이용하기</Button>
                  </Link>
                ) : printer.status === "사용 중" ? (
                  <Link
                    className="w-full flex flex-col  justify-end mt-4"
                    href={`/room315/${printer.serialNumber}`}
                  >
                    {remainingTime.hours <= 0 && remainingTime.minutes <= 0 ? (
                      <Button className="font-bold">이용하기</Button>
                    ) : (
                      <Button variant="secondary">수정하기</Button>
                    )}
                  </Link>
                ) : (
                  <div className="w-full flex flex-col  justify-end mt-4">
                    <Button disabled={true} variant="destructive">
                      사용금지
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}

export default Room315;
