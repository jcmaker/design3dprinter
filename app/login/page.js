"use client";
import { Button } from "@/components/ui/button";
import { auth, providerGoogle, providerMicrosoft } from "fbManager";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Separator } from "@/components/ui/separator";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
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
              {newAccount
                ? "회원가입하려면 아래 이메일을 입력하세요"
                : "계정에 로그인하려면 아래 이메일을 입력하세요."}
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
            <div className="flex items-center">
              <Separator className="flex-1 dark:bg-slate-400" />
              <span className="px-2 text-gray-500 dark:text-gray-400">or</span>
              <Separator className="flex-1 dark:bg-slate-400" />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <Image
                src="/search.png"
                width={20}
                height={20}
                alt="google+"
                loading="lazy"
                className="mr-2 justify-items-start"
              />
              <span>Google로 시작하기</span>
            </Button>
            <Button
              variant="outline"
              className="w-full "
              onClick={handleMicrosoftLogin}
            >
              <Image
                src="/Microsoft_Logo.png"
                width={20}
                height={20}
                alt="MS"
                loading="lazy"
                className="mr-2 justify-items-start"
              />
              <span>Microsoft로 시작하기</span>
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
  );
}

export default LoginPage;
