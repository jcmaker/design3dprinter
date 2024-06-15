"use client";
import { useEffect, useState } from "react";
import { db } from "fbManager";
import PrinterCards from "@/components/PrinterCards";

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

  return (
    <div className="p-4 pt-[80px] flex flex-col items-center">
      <div className="max-w-[1600px] w-full">
        <h1 className="font-bold text-xl mb-8">315호 프린터</h1>
        {/* 프린터 정보 표시 */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {printers.length > 0
            ? printers.map((printer) => (
                <PrinterCards
                  key={printer.id}
                  printer={{ ...printer, room: 315 }}
                />
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <PrinterCards key={index} />
              ))}
        </ul>
      </div>
    </div>
  );
}

export default Room315;
