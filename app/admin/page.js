"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "fbManager";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "react-hot-toast";

export default function FormBox() {
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const [printers, setPrinters] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // AuthContext를 사용하여 로그인한 사용자 정보 가져오기
  const { user: authUser } = useAuth();

  useEffect(() => {
    // 데이터베이스에서 프린터 정보 가져오기
    const unsubscribe = db.collection("printers").onSnapshot((snapshot) => {
      const printerData = [];
      snapshot.forEach((doc) => {
        printerData.push({ id: doc.id, ...doc.data() });
      });

      // 프린터들을 serialNumber로 정렬
      printerData.sort((a, b) =>
        parseInt(a.serialNumber) > parseInt(b.serialNumber) ? 1 : -1
      );

      setPrinters(printerData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // 특정 userId를 가진 사용자인지 확인
  if (authUser?.uid !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    redirect("/");
  }

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      // 데이터베이스에 데이터 추가
      await db.collection("printers").add({
        roomNumber: data.roomNumber,
        serialNumber: data.serialNumber,
        company: data.company,
        status: "사용가능",
        userName: "",
        userStudentId: "",
        printingTime: 0,
      });

      toast.success("데이터가 성공적으로 제출되었습니다.");
    } catch (error) {
      // alert("데이터 제출 중 오류가 발생했습니다.");
      toast.dismiss("데이터 제출 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const updatePrinterStatus = async (printerId, newStatus) => {
    try {
      await db.collection("printers").doc(printerId).update({
        status: newStatus,
        userName: "",
        userStudentId: "",
        phoneNumber: "",
        endTime: "",
        submissionTime: "",
        printingTime: 0,
      });

      toast.success("상태가 업데이트되었습니다.");
    } catch (error) {
      // alert("상태 업데이트 중 오류가 발생했습니다.");
      toast.dismiss("상태 업데이트 중 오류가 발생했습니다.");
    }
  };

  const groupedPrinters = {};
  printers.forEach((printer) => {
    if (!groupedPrinters[printer.roomNumber]) {
      groupedPrinters[printer.roomNumber] = [];
    }
    groupedPrinters[printer.roomNumber].push(printer);
  });

  return (
    <div className="p-4 pt-12">
      <Toaster />
      <div className="mt-8">
        <h2 className="text-xl font-semibold">프린터 목록</h2>
        {Object.keys(groupedPrinters).map((roomNumber) => (
          <div key={roomNumber} className="mt-4">
            <Separator />
            <h3 className="text-3xl font-semibold mb-2">{roomNumber}호</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {groupedPrinters[roomNumber].map((printer) => (
                <Card key={printer.id} className="flex flex-col h-full">
                  <CardHeader>
                    <h2 className="text-lg font-medium">
                      번호: {printer.serialNumber} /{" "}
                      {printer.status === "고장남" ? (
                        <span className="text-red-600">수리 필요</span>
                      ) : (
                        ""
                      )}
                    </h2>
                    <h3 className="font-medium">
                      방번호: {printer?.roomNumber}
                    </h3>
                    <h3 className="">{printer?.company}</h3>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-500">
                      상태: {printer?.status} - {printer?.userName}
                    </p>
                    <p className="text-gray-500">
                      학번: {printer?.userStudentId}
                    </p>
                    <p className="text-gray-500">
                      전화번호: {printer?.phoneNumber}
                    </p>
                    <p className="text-gray-500">
                      사용 시간: {Math.floor(printer.printingTime / 60)}시간{" "}
                      {printer?.printingTime % 60}분
                    </p>
                    <div className="mt-2">
                      <select
                        value={printer.status}
                        onChange={(e) =>
                          updatePrinterStatus(printer.id, e.target.value)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        <option value="사용가능">사용가능</option>
                        <option value="고장남">고장남</option>
                        <option value="수리중">수리중</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {isFormOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed bottom-4 right-4 bg-white p-8 rounded shadow-md space-y-4 z-10 w-1/4 flex flex-col"
        >
          <div className="flex justify-end">
            <span
              onClick={() => setIsFormOpen(!isFormOpen)}
              className=" text-black rounded transition-colors duration-300 bg-transparent cursor-pointer"
            >
              {isFormOpen ? "x" : "+"}
            </span>
          </div>
          <input
            type="text"
            placeholder="방 번호"
            {...register("roomNumber", { required: true })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="일련번호"
            {...register("serialNumber", { required: true })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="프린터 회사"
            {...register("company", { required: true })}
            className="border p-2 rounded w-full"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting}
              className=" text-white py-2 px-4 rounded  transition-colors duration-300"
            >
              제출
            </Button>
          </div>
        </form>
      )}
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className=" text-white py-2 px-4 rounded  transition-colors duration-300"
        >
          {isFormOpen ? "폼 닫기" : "프린터 추가하기"}
        </Button>
      </div>
    </div>
  );
}
