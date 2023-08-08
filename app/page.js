"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // AuthContext를 사용하여 로그인한 사용자 정보 가져오기
  const { user: authUser } = useAuth();

  // 특정 userId를 가진 사용자인지 확인
  const isSpecificUser = authUser?.uid === "ImNSfMBYvITks5RdrxEt46qgVbc2";

  return (
    <main className="flex flex-col h-full">
      {/* 상단 배너 */}
      <div className="flex flex-col h-full bg-[#fafafa] pt-[65px]">
        {/* 상단 배너 */}
        <header className="bg-[#8EC41D] text-white py-8 text-center">
          <h1 className="text-3xl font-semibold">디자인공학과</h1>
          <h1 className="text-3xl font-semibold">3D 프린터 작동 현황</h1>
        </header>

        <div className="flex items-center justify-center">
          {/* 사용 설명서 */}
          <section className="p-8 flex flex-col items-center bg-white shadow-lg rounded-lg md:w-3/5 m-8">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">
              주의사항
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
                  약간이라도 이상하게 작동하면 즉시 작업을 중지하고 교수님께
                  연락
                </span>{" "}
                합니다.
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-300 text-black py-4 text-center md:fixed bottom-0 w-full">
          <p className="w-full flex justify-start pl-4 text-sm text-center text-gray-500">
            made by 디공과 조준형
          </p>
          <p className="text-lg font-semibold">3D 프린터 관리 교수님</p>
          <p>권효찬 교수 / 연락처: 010-8020-2620</p>
        </footer>
      </div>

      {/* 관리자 버튼 */}
      <div className="fixed bottom-4 right-4">
        {isSpecificUser && (
          <Link href="/admin">
            <Button className="rounded-full" size="icon">
              <Pencil className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
}
