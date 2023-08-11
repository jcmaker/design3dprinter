"use client";
import { Button } from "@/components/ui/button";
import { auth, providerGoogle } from "fbManager";
import { useRouter } from "next/navigation"; // next/router 임포트

import Image from "next/image";

function LoginPage() {
  const router = useRouter(); // useRouter 훅 사용

  const handleLogin = async () => {
    try {
      await auth.signInWithPopup(providerGoogle);
      router.push("/"); // 로그인 성공 시 홈 페이지로 이동
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="absolute z-50 top-0 w-screen flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-3xl font-bold text-center mb-4">디자인 공학과</h2>
        <p className="text-gray-600 text-center mb-8">3D 프린터 사이트</p>
        <Button
          className="bg-slate-100 text-black w-full py-2 mb-4"
          onClick={handleLogin}
        >
          <Image
            src="/search.png"
            width={20}
            height={20}
            alt="google+"
            loading="lazy"
            className="mr-2"
          />
          구글 로그인
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
