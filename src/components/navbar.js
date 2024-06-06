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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeToggle } from "./ThemeToggler";
import { Component, DoorClosed, LogOut, Menu } from "lucide-react";

const Navbar = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user } = useAuth();

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
          <h1 className="font-bold text-xl text-[#F5902B] cursor-pointer">
            3D
          </h1>
        </Link>
        <MainNav className="hidden md:block" />
        <div className="ml-auto flex items-center space-x-4">
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
                              <Label htmlFor="studentId" className="text-right">
                                학번
                              </Label>
                              <Input
                                id="studenId"
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
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                      {/* <Button
                        className="cursor-pointer"
                        onClick={() => {
                          auth.signOut();
                          window.location.reload();
                        }}
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
                          class="lucide lucide-log-out"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                      </Button> */}
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
                          <Link href="/room311">311호</Link>
                        </CommandItem>
                        <CommandItem>
                          <DoorClosed className="mr-2 text-slate-400" />
                          <Link href="/room315">315호</Link>
                        </CommandItem>
                        <CommandItem>
                          <Component className="mr-2 text-slate-400" />
                          <span>모든 프린터 (준비중)</span>
                        </CommandItem>
                      </CommandGroup>
                      <CommandSeparator />

                      {user ? (
                        <CommandGroup heading="계정">
                          {/* <CommandItem>
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
                              className="mr-2 text-slate-400"
                            >
                              <path d="M18 20a6 6 0 0 0-12 0" />
                              <circle cx="12" cy="10" r="4" />
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span>프로필 설정</span>
                          </CommandItem> */}
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
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
