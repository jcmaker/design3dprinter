import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Wrench } from "lucide-react"; // adjust this import according to your icon library
import Link from "next/link"; // adjust this import according to your routing library
import { Button } from "./ui/button";

function PrinterCards({ printer }) {
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
  if (!printer) {
    return (
      <Card className="flex flex-col h-[350px]">
        <CardHeader className=" w-full h-3/5 flex items-center justify-center rounded-t-md">
          <Skeleton className="w-full h-full" />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Skeleton className="w-full h-[20px] mb-2" />
          <Skeleton className="w-full h-[20px] mb-2" />
          <Skeleton className="w-full h-[20px] mb-2" />
          <Skeleton className="w-full h-[20px] mb-2" />
        </CardContent>
      </Card>
    );
  }

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
      <CardHeader className="bg-slate-100 dark:bg-slate-600 w-full h-3/5 flex items-center justify-center rounded-t-md">
        {printer.status === "사용가능" && (
          <div className="flex flex-col items-center justify-center w-full">
            <Progress value={0} className="bg-white" />
            <span className="text-slate-500 absolute text-sm">비어있음</span>
          </div>
        )}
        {printer.status === "고장남" && (
          <div className="flex flex-col items-center justify-center w-full">
            <Progress value={0} className="bg-white" />
            <AlertTriangle
              className="h-14 w-14 fill-rose-500 absolute"
              stroke="black"
            />
          </div>
        )}
        {printer.status === "수리중" && (
          <div className="flex flex-col items-center justify-center w-full">
            <Progress value={0} className="bg-white" />
            <Wrench
              className="h-14 w-14 fill-slate-300 absolute"
              stroke="black"
            />
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
        <h2 className="text-lg font-medium">번호: {printer.serialNumber}</h2>
        <h3 className="">{printer.company}</h3>
        <p className="text-gray-500 dark:text-slate-400">
          상태: {printer.status} - {printer.userName}
        </p>
        <p className="text-gray-500 dark:text-slate-400">
          사용 시간: {Math.floor(printer.printingTime / 60)}시간{" "}
          {printer.printingTime % 60}분
        </p>
        {remainingTime ? (
          <p className="text-gray-500 dark:text-slate-400">
            남은 시간: {remainingTime?.hours}시간 {remainingTime?.minutes}분
          </p>
        ) : (
          <p className="text-gray-500">남은 시간: 0시간 0분</p>
        )}

        {printer.status === "사용가능" ? (
          <Link
            className="w-full flex flex-col justify-end mt-4"
            href={`/room${printer.room}/${printer.serialNumber}`}
          >
            <Button className="font-bold dark:text-white">이용하기</Button>
          </Link>
        ) : printer.status === "사용 중" ? (
          <Link
            className="w-full flex flex-col justify-end mt-4"
            href={`/room${printer.room}/${printer.serialNumber}`}
          >
            {remainingTime.hours <= 0 && remainingTime.minutes <= 0 ? (
              <Button className="font-bold dark:text-white">이용하기</Button>
            ) : (
              <Button variant="secondary dark:text-white">수정하기</Button>
            )}
          </Link>
        ) : (
          <div className="w-full flex flex-col justify-end mt-4">
            <Button disabled={true} variant="destructive">
              사용금지
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PrinterCards;
