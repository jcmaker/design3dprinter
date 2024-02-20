"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { db } from "fbManager";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <div className="flex flex-col dark:bg-slate-800">
      {/* 헤더 섹션 */}
      <div className="min-h-screen relative">
        {/* 3D 오브젝트 배경 */}
        <div
          style={{
            backgroundImage: `url("/protruding-squares.png")`,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 bg-repeat bg-center bg-[length:200px_200px] lg:bg-[length:400px_400px]"
        >
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

      <motion.div
        className="min-h-screen flex items-center justify-center dark:bg-slate-800"
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="bg-white dark:bg-slate-700 py-10 px-8 rounded shadow-md mb-8 max-w-2xl">
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
      <div className=" flex items-center justify-center dark:bg-slate-800">
        {/* CTA 내용 */}
        <section className="text-center flex flex-col">
          <span className="py-2 px-6 transition duration-300 ease-in-out">
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

      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 dark:bg-slate-800">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center">
              <span className="ml-2 text-3xl font-bold tracking-wide text-[#F5902B] cursor-pointer uppercase">
                3d
              </span>
            </Link>
            <div className="mt-6 lg:max-w-sm">
              <p>
                학생들은 3D 프린터를 활용하여 자신만의 아이디어를 현실로 구현할
                수 있습니다. 예를 들어, 과학 프로젝트 모형, 미니어처, 예술 작품
                등 다양한 분야에서 활용할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-gray-900 dark:text-white">
              권효찬 교수님
            </p>
            <div className="flex">
              <p className="mr-1">연락처:</p>
              <span className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
                010-8020-2620
              </span>
            </div>
            <div className="flex">
              <p className="mr-1">이메일:</p>
              <span className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
                20201006@gtec.ac.kr
              </span>
            </div>
            <div className="flex">
              <p className="mr-1">연구실:</p>
              <span className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
                A동 304호
              </span>
            </div>
          </div>
          <div>
            <span className="text-base font-bold tracking-wide">
              디자인 공학과
            </span>
            <div className="flex items-center mt-1 space-x-3">
              <Link
                href="https://www.gtec.ac.kr/landing/02/index.html"
                className="text-gray-500 dark:text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-home"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/watch?v=klda9qdGDVI"
                className="text-gray-500 dark:text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-youtube"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </Link>
              <Link
                href="https://pf.kakao.com/_xkAxbUC"
                className="text-gray-500 dark:text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-message-circle"
                >
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              자동차, 가전, 생활용품에 나의 상상력을 입히다. 기능적이고 예술적인
              디자인
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © Made by 디자인공학과 조준형
          </p>
        </div>
      </div>

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
