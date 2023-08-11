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

const Navbar = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
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
      });

      alert("프로필 정보가 저장되었습니다.");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
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
              <Dialog>
                <DialogTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback>CN</AvatarFallback>
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
                      <Label htmlFor="username" className="text-right">
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
                로그아웃
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button>로그인</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
