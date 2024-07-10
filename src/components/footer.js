import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 dark:bg-slate-800">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link href="/" className="inline-flex items-center">
            {/* <span className="ml-2 text-3xl font-bold tracking-wide text-[#F5902B] cursor-pointer uppercase">
        3d
      </span> */}
            <Image
              src="/3dLogo.png"
              alt="logo"
              width={55}
              height={55}
              className="cursor-pointer"
            />
          </Link>
          <div className="mt-6 lg:max-w-sm">
            <p>
              학생들은 3D 프린터를 활용하여 자신만의 아이디어를 현실로 구현할 수
              있습니다. 예를 들어, 과학 프로젝트 모형, 미니어처, 예술 작품 등
              다양한 분야에서 활용할 수 있습니다.
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
          © Made by 디자인공학과 23학번 조준형
        </p>
      </div>
    </div>
  );
}

export default Footer;
