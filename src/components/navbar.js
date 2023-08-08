"use client";
import { Button } from "@/components/ui/button";
import { MainNav } from "./main-nav";
import Link from "next/link";
import { useAuth } from "@/context/authProvider";
import { auth } from "fbManager";

const Navbar = () => {
  const { user } = useAuth();

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
            <Button
              className="cursor-pointer"
              onClick={() => {
                auth.signOut();
                window.location.reload();
              }}
            >
              로그아웃
            </Button>
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
