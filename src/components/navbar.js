"use client";
import { Button } from "@/components/ui/button";
import { MainNav } from "./main-nav";
import Link from "next/link";
import { useAuth } from "@/context/authProvider";
import { auth, db } from "fbManager";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeToggle } from "./ThemeToggler";
import { DoorClosed, Eye, Home, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import Footer from "./footer";

const Navbar = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading for demonstration purposes
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleNameChange = (e) => {
    const { value } = e.target;
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    if (value === "" || regex.test(value)) {
      setName(value);
    } else {
      toast.error("이름은 영문자, 한글, 공백만 입력 가능합니다.");
    }
  };
  const handleSave = async () => {
    if (name.trim() === "" || studentId.trim() === "") {
      alert("이름과 학번을 모두 입력해주세요.");
      return;
    }

    try {
      // Firebase에 사용자 정보 저장하는 로직
      await db.collection("users").add({
        userId: user.uid,
        name: name,
        studentId: studentId,
        phoneNumber: phoneNumber,
      });

      toast.success("프로필 정보 저장 완료!");
    } catch (error) {
      toast.error("오류 발행. 다시 시도해주세요.");
    }
  };

  return (
    <div className="border-b fixed top-0 w-full bg-white dark:bg-slate-900 z-50">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          {isLoading ? (
            <Skeleton className="w-8 h-8 rounded-md" />
          ) : (
            <Image
              src="/3dLogo.png"
              alt="logo"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          )}
        </Link>
        {isLoading ? (
          <Skeleton className="ml-auto w-40 h-8 rounded-full hidden md:block" />
        ) : (
          <MainNav className="hidden md:block" />
        )}
        <div className="ml-auto flex items-center space-x-4">
          {isLoading ? (
            <Skeleton className="w-8 h-8 rounded-full" />
          ) : (
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex flex-row justify-between mt-5">
                    {user ? (
                      <>
                        <Toaster />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Avatar>
                              <AvatarImage src={user.photoURL} />
                              <AvatarFallback>N</AvatarFallback>
                            </Avatar>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>프로필 설정</DialogTitle>
                              <DialogDescription>
                                프로필을 설정하여 편리하게 이용하세요. 완료하면
                                저장 버튼을 클릭하세요.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  이름
                                </Label>
                                <Input
                                  id="name"
                                  placeholder="홍길동"
                                  value={name}
                                  onChange={handleNameChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="studentId"
                                  className="text-right"
                                >
                                  학번
                                </Label>
                                <Input
                                  id="studentId"
                                  placeholder="학번"
                                  value={studentId}
                                  onChange={(e) => setStudentId(e.target.value)}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="phoneNumber"
                                  className="text-right"
                                >
                                  전화번호
                                </Label>
                                <Input
                                  id="phoneNumber"
                                  placeholder="전화번호"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" onClick={handleSave}>
                                저장
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <ThemeToggle />
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button className="flex-col items-center">
                            로그인
                          </Button>
                        </Link>
                        <ThemeToggle />
                      </>
                    )}
                  </SheetTitle>
                  <SheetDescription>
                    <Command className="mt-5">
                      <CommandList>
                        <CommandGroup heading="프린터 현황">
                          <CommandItem>
                            <DoorClosed className="mr-2 text-slate-400" />
                            <Link href="/room311">311 호</Link>
                          </CommandItem>
                          <CommandItem>
                            <DoorClosed className="mr-2 text-slate-400" />
                            <Link href="/room315">315 호</Link>
                          </CommandItem>
                          <CommandItem>
                            <Eye className="mr-2 text-slate-400" />
                            <Link href="/overview">한눈에 보기</Link>
                          </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />

                        {user ? (
                          <CommandGroup heading="계정">
                            <CommandItem>
                              <Dialog>
                                <DialogTrigger className="flex">
                                  <User className="mr-2 text-slate-400" />
                                  <span>프로필 설정</span>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>프로필 설정</DialogTitle>
                                    <DialogDescription>
                                      프로필을 설정하여 편리하게 이용하세요.
                                      완료하면 저장 버튼을 클릭하세요.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="name"
                                        className="text-right"
                                      >
                                        이름
                                      </Label>
                                      <Input
                                        id="name"
                                        placeholder="홍길동"
                                        value={name}
                                        onChange={handleNameChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="studentId"
                                        className="text-right"
                                      >
                                        학번
                                      </Label>
                                      <Input
                                        id="studentId"
                                        placeholder="학번"
                                        value={studentId}
                                        onChange={(e) =>
                                          setStudentId(e.target.value)
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="phoneNumber"
                                        className="text-right"
                                      >
                                        전화번호
                                      </Label>
                                      <Input
                                        id="phoneNumber"
                                        placeholder="전화번호"
                                        value={phoneNumber}
                                        onChange={(e) =>
                                          setPhoneNumber(e.target.value)
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit" onClick={handleSave}>
                                      저장
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </CommandItem>
                            <CommandItem>
                              <Home className="mr-2 text-slate-400" />
                              <Link href="/">메인 화면</Link>
                            </CommandItem>
                            <CommandItem>
                              <LogOut className="mr-2 text-slate-400" />
                              <span
                                className="cursor-pointer hover:text-red-500"
                                onClick={() => {
                                  auth.signOut();
                                  window.location.reload();
                                }}
                              >
                                로그아웃
                              </span>
                            </CommandItem>
                          </CommandGroup>
                        ) : (
                          ""
                        )}
                      </CommandList>
                    </Command>
                  </SheetDescription>
                  <div className="absolute bottom-2 w-[90%] flex justify-between text-gray-500">
                    <div>디공프린터</div>
                    <div className="flex items-center mt-1 space-x-3 ">
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
                          className="lucide lucide-home text-gray-500"
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
                          className="lucide lucide-home text-gray-500"
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
                          className="lucide lucide-home text-gray-500"
                        >
                          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
