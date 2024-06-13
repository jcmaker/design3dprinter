"use client";
import { Button } from "@/components/ui/button";
import { auth, providerGoogle, providerMicrosoft } from "fbManager";
import { useRouter } from "next/navigation"; // next/router 임포트

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const router = useRouter(); // useRouter 훅 사용

  const handleGoogleLogin = async () => {
    try {
      await auth.signInWithPopup(providerGoogle);
      router.push("/"); // 로그인 성공 시 홈 페이지로 이동
    } catch (error) {
      alert(error.message);
    }
  };
  const handleMicrosoftLogin = async () => {
    try {
      await auth.signInWithPopup(providerMicrosoft);
      router.push("/"); // 로그인 성공 시 홈 페이지로 이동
    } catch (error) {
      alert(error.message);
    }
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await auth.createUserWithEmailAndPassword(email, password);
        toast.success("회원가입 완료!");
        setEmail("");
        setPassword("");
        setNewAccount(false);
        router.push("/login");
      } else {
        data = await auth.signInWithEmailAndPassword(email, password);
        router.push("/");
      }
      console.log(data);
    } catch (error) {
      toast.dismiss("Error: " + error);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 pt-[80px] lg:pt-2">
      <Toaster />
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              {newAccount ? "회원가입" : "로그인"}
            </h1>
            <p className="text-balance text-muted-foreground">
              계정에 로그인하려면 아래 이메일을 입력하세요.
            </p>
          </div>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="gtec@example.com"
                required
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={onChange}
              />
            </div>
            <Button type="submit" className="w-full">
              {newAccount ? "회원가입" : "로그인"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <div className="w-1/2 flex justify-center items-center">
                <Image
                  src="/search.png"
                  width={20}
                  height={20}
                  alt="google+"
                  loading="lazy"
                  className="mr-2 justify-items-start"
                />
                <span>구글 로그인</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleMicrosoftLogin}
            >
              <div className="w-1/2 flex justify-center items-center">
                <Image
                  src="/Microsoft_Logo.png"
                  width={20}
                  height={20}
                  alt="MS"
                  loading="lazy"
                  className="mr-2 justify-items-start"
                />
                <span>마이크로소프트 로그인</span>
              </div>
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            계정이 없으신가요?{" "}
            <span onClick={toggleAccount} className="underline cursor-pointer">
              {newAccount ? "로그인하기" : "회원가입"}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted h-full w-full lg:flex justify-center items-center">
        <Image
          src="/3dLogo.png"
          alt="Image"
          width={80}
          height={80}
          className=" object-cover "
        />
      </div>
    </div>
    // <div className="absolute z-50 top-0 w-screen flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="bg-white shadow-lg rounded-lg p-10">
    //     <h2 className="text-black text-3xl font-bold text-center mb-4">
    //       디자인 공학과
    //     </h2>
    //     <p className="text-gray-600 text-center mb-8">3D 프린터 사이트</p>
    //     <Button
    //       className="bg-slate-100 text-black w-full py-2 mb-4"
    //       onClick={handleLogin}
    //     >
    //       <Image
    //         src="/search.png"
    //         width={20}
    //         height={20}
    //         alt="google+"
    //         loading="lazy"
    //         className="mr-2"
    //       />
    //       구글 로그인
    //     </Button>
    //   </div>
    // </div>
  );
}

export default LoginPage;
