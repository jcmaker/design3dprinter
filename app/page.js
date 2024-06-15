"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { user: authUser } = useAuth();
  const isSpecificUser = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_ID;

  return (
    <div className="flex flex-col dark:bg-slate-800 ">
      {/* 헤더 섹션 */}
      <div className="flex flex-col ">
        <main className="flex-1 pt-12 lg:pt-0 ">
          <section className="w-full py-12 md:py-24 lg:py-32 ">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      3D 프린터 이용 및 안내
                    </h1>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      사이트
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      3D 프린터의 사용 가능 여부를 확인하고 프린팅 이용 시간을
                      입력하세요.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      href="/overview"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      prefetch={false}
                    >
                      찾아보기
                    </Link>
                  </div>
                </div>
                <Image
                  src="/mobility_img02.png"
                  alt="3D Printer"
                  className="mx-auto aspect-square lg:hidden overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  width={400}
                  height={400}
                />
                <div className="columns-3xs gap-x-2 hidden lg:block">
                  <Image
                    src="/mobility_img02.png"
                    alt="3D Printer"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last mb-1.4"
                    width={400}
                    height={400}
                  />
                  <Image
                    src="/mobility_img05.png"
                    alt="3D Printer"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last m-2"
                    width={400}
                    height={400}
                  />
                  <Image
                    src="/mobility_img06.png"
                    alt="3D Printer"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last mb-1.4"
                    width={400}
                    height={400}
                  />
                  <Image
                    src="/mobility_img07.png"
                    alt="3D Printer"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last m-2"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </section>
          <section
            id="availability"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 "
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    3D 프린터 확인하기
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    프린터 상태 확인
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    3D 프린터의 현재 상태를 확인하고 3D 프린터의 프린팅 이용
                    시간을 입력하세요.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <Image
                  src="/mock_frame.png"
                  alt="3D Printer Status"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  width={400}
                  height={400}
                />
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">사용 가능</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          프린터 이용 가능
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">사용중</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          사용이 끝날때까지 이용 불가
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">고장남 / 수리중</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          프린터 점검으로 이용 불가
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section
            id="instructions"
            className="w-full py-12 md:py-24 lg:py-32 "
          >
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  사이트 이용 방법
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  다음의 간단한 단계를 따라 3D 프린팅 이용 시간을 입력하세요.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Step 1</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    이용하고자 하는 프린터 선택하여 해당 페이지로 가거나 프린터
                    앞에 QR코드를 찍어 페이지로 들어가세요.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Step 2</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    이름과 학번, 그리고 이용 시간을 입력하고 제출 버튼을
                    눌러주세요.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Step 3</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    이름과 이용 시간이 맞는지 확인하면 끝.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end"></div>
              </div>
            </div>
          </section>
          <section
            id="instructions"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          >
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-red-500">
                  3D 프린터 이용 시 주의 사항
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid gap-1">
                  <p>
                    출력 시,{" "}
                    <span className="text-red-500 font-semibold">
                      레이어 1층이 반드시 깔리는 것을 확인
                    </span>
                    하고 이용 시간을 입력합니다.
                  </p>
                </div>
                <div className="grid gap-1">
                  <p>
                    <span className="text-red-500 font-semibold">
                      노즐과 히팅베드 모두 뜨겁습니다.
                    </span>{" "}
                    화상에 주의하세요.
                  </p>
                </div>
                <div className="grid gap-1">
                  <p>
                    출력물을 분리할 때는{" "}
                    <span className="text-red-500 font-semibold">
                      스크래퍼나 끌을 사용하지 마세요.
                    </span>{" "}
                    출력표면에 손상이 갑니다.
                  </p>
                </div>
                <div className="grid gap-1">
                  <p>
                    <span className="text-red-500 font-semibold">
                      3D 프린터 출력실은 공기가 좋지 않습니다.
                    </span>{" "}
                    출력물 분리 등의 작업은 다른 곳에서 하세요.
                  </p>
                </div>
                <div className="grid gap-1">
                  <p>
                    3D 프린터 출력 후 서포터 등의{" "}
                    <span className="text-red-500 font-semibold">
                      쓰레기는 반드시 쓰레기통에 버려주시길 바랍니다.
                    </span>
                  </p>
                </div>
                <div className="grid gap-1">
                  <p>
                    3D 프린터가{" "}
                    <span className="text-red-500 font-semibold">
                      약간이라도 이상하게 작동하면 즉시 작업을 중지하고 교수님께
                      연락
                    </span>{" "}
                    합니다.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end"></div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
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
                  학생들은 3D 프린터를 활용하여 자신만의 아이디어를 현실로
                  구현할 수 있습니다. 예를 들어, 과학 프로젝트 모형, 미니어처,
                  예술 작품 등 다양한 분야에서 활용할 수 있습니다.
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
                자동차, 가전, 생활용품에 나의 상상력을 입히다. 기능적이고
                예술적인 디자인
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
    </div>
  );
}
