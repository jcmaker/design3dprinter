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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user } = useAuth();

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
    <div className="border-b fixed top-0 w-full bg-white z-50">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <h1 className="font-bold text-xl text-[#F5902B] cursor-pointer">
            3D
          </h1>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
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
                      프로필을 설정하여 편리하게 이용하세요. 완료하면 저장
                      버튼을 클릭하세요.
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
                        onChange={(e) => setName(e.target.value)}
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
                      <Label htmlFor="phoneNumber" className="text-right">
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
              <Button
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
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button className="flex-col items-center">
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
                  class="lucide lucide-log-in"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
