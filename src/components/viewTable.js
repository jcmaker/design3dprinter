"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "fbManager";

function ViewTable() {
  const [printers, setPrinters] = useState([]);
  useEffect(() => {
    // 데이터베이스에서 프린터 정보 가져오기
    const unsubscribe = db.collection("printers").onSnapshot((snapshot) => {
      const printerData = [];
      snapshot.forEach((doc) => {
        printerData.push({ id: doc.id, ...doc.data() });
      });

      // 프린터들을 serialNumber로 정렬
      printerData.sort((a, b) =>
        parseInt(a.serialNumber) > parseInt(b.serialNumber) ? 1 : -1
      );

      setPrinters(printerData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const groupedPrinters = {};
  printers.forEach((printer) => {
    if (!groupedPrinters[printer.roomNumber]) {
      groupedPrinters[printer.roomNumber] = [];
    }
    groupedPrinters[printer.roomNumber].push(printer);
  });

  const calculateRemainingTime = (endTime) => {
    if (!endTime) {
      return null;
    }
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
    <div className="md:p-4 pt-12">
      <div className="mt-8">
        <h2 className="text-xl font-semibold">프린터 목록</h2>
        {Object.keys(groupedPrinters).map((roomNumber) => (
          <div key={roomNumber} className="mt-4">
            <h3 className="text-3xl font-semibold mb-2">{roomNumber}호</h3>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">번호</TableHead>
                  <TableHead className="text-center">사용자</TableHead>
                  <TableHead className="text-center">남은 시간</TableHead>
                  <TableHead className="text-center">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedPrinters[roomNumber].map((printer) => {
                  const remainingTime = printer.endTime
                    ? calculateRemainingTime(printer.endTime.toDate())
                    : { hours: 0, minutes: 0 };

                  const status =
                    remainingTime.hours === 0 && remainingTime.minutes === 0 ? (
                      <span className="text-green-600 dark:text-green-400">
                        이용 가능
                      </span>
                    ) : (
                      <span className="text-orange-400 animate-pulse">
                        ● {""}
                        {printer.status}
                      </span>
                    );

                  return (
                    <TableRow key={printer.id}>
                      <TableCell className="font-medium ">
                        {printer.serialNumber}
                      </TableCell>
                      <TableCell>
                        {printer?.userName ? (
                          printer.userName
                        ) : (
                          <span className="text-slate-400">비어있음</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {remainingTime.hours} 시간 {remainingTime.minutes} 분
                      </TableCell>
                      <TableCell>
                        {printer.status === "수리중" ||
                        printer.status === "고장남" ? (
                          <span className="dark:text-red-700 text-red-500">
                            사용불가
                          </span>
                        ) : (
                          status
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTable;
