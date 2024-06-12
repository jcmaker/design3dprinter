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
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ThemeToggle } from "./ThemeToggler";
import { DoorClosed, Eye, Home, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";

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
          <Image
            src="/3dLogo.png"
            alt="logo"
            width={30}
            height={30}
            className="cursor-pointer"
          />
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
                                      id="studenId"
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
                <div className="absolute bottom-2 ">
                  <span className="text-slate-500">ver2.10.2</span>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
