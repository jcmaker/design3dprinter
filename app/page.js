"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { db } from "fbManager";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Image } from "next/image";

export default function Home() {
  const [printers, setPrinters] = useState([]);
  const { user: authUser } = useAuth();

  useEffect(() => {
    const unsubscribe = db.collection("printers").onSnapshot((snapshot) => {
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

  const isSpecificUser = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_ID;
  const groupedPrinters = {};
  printers.forEach((printer) => {
    if (!groupedPrinters[printer.roomNumber]) {
      groupedPrinters[printer.roomNumber] = [];
    }
    groupedPrinters[printer.roomNumber].push(printer);
  });

  return (
    <div className="flex flex-col">
      {/* 헤더 섹션 */}
      <div className="min-h-screen relative">
        {/* 3D 오브젝트 배경 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
          {/* 이미지 찾아오기 */}
        </div>

        {/* 텍스트 배치 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-xl md:text-4xl font-bold z-10">
            학생들을 위한
          </h1>
          <h1 className="text-white text-xl md:text-4xl font-bold z-10">
            3D 프린터 이용 안내
          </h1>
        </div>
      </div>

      {/* 주요 내용 섹션 */}
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="bg-white py-10 px-8 rounded shadow-md mb-8 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            3D 프린터를 통한 창의적인 제작
          </h2>
          <p className="text-gray-600">
            학생들은 3D 프린터를 활용하여 자신만의 아이디어를 현실로 구현할 수
            있습니다. 예를 들어, 과학 프로젝트 모형, 미니어처, 예술 작품 등
            다양한 분야에서 활용할 수 있습니다.
          </p>
        </section>
      </motion.div>

      {/* 이용 안내 섹션 */}
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="bg-white py-10 px-8 rounded shadow-md mb-8 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            3D 프린터 이용 시 주의 사항
          </h2>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              출력 시,{" "}
              <span className="text-red-500 font-semibold">
                레이어 1층이 반드시 깔리는 것을 확인
              </span>
              하고 현황을 입력합니다.
            </li>
            <li>
              <span className="text-red-500 font-semibold">
                노즐과 히팅베드 모두 뜨겁습니다.
              </span>{" "}
              화상에 주의하세요.
            </li>
            <li>
              출력물을 분리할 때는{" "}
              <span className="text-red-500 font-semibold">
                스크래퍼나 끌을 사용하지 마세요.
              </span>{" "}
              출력표면에 손상이 갑니다.
            </li>
            <li>
              <span className="text-red-500 font-semibold">
                3D 프린터 출력실은 공기가 좋지 않습니다.
              </span>{" "}
              출력물 분리 등의 작업은 다른 곳에서 하세요.
            </li>
            <li>
              3D 프린터 출력 후 서포터 등의{" "}
              <span className="text-red-500 font-semibold">
                쓰레기는 반드시 쓰레기통에 버려주시길 바랍니다.
              </span>
            </li>
            <li>
              3D 프린터가{" "}
              <span className="text-red-500 font-semibold">
                약간이라도 이상하게 작동하면 즉시 작업을 중지하고 교수님께 연락
              </span>{" "}
              합니다.
            </li>
          </ul>
        </section>
      </motion.div>

      {/* CTA 섹션 */}
      <div className=" flex items-center justify-center">
        {/* CTA 내용 */}
        <section className="text-center flex flex-col">
          <span className=" text-black py-2 px-6 transition duration-300 ease-in-out">
            지금 3D 프린터 이용하기
          </span>
          <div className="flex flex-col items-center justify-between h-[90px]">
            <Link href="/room311">
              <Button className="w-[180px]">311호</Button>
            </Link>
            <Link href="/room315">
              <Button className="w-[180px]">315호</Button>
            </Link>
          </div>
        </section>
      </div>

      <footer className="flex flex-col items-center justify-around bg-gray-300 text-black p-4 pt-0 bottom-0 w-full h-[120px] mt-10 ">
        <p className=" left-2 w-full flex justify-start text-sm text-gray-500 top-0">
          made by 디공과 조준형
        </p>
        <div>
          <p className="text-lg font-semibold">3D 프린터 관리 교수님</p>
          <p>권효찬 교수 / 연락처: 010-8020-2620</p>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4">
        {isSpecificUser && (
          <Link href={`/${process.env.NEXT_PUBLIC_ADMIN_LINK}`}>
            <Button className="rounded-full" size="icon">
              <Pencil className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
