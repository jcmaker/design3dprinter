"use client";
import React, { useState } from "react";
import { db } from "fbManager";
import { useParams, useRouter } from "next/navigation";

function Room315PrinterDetail() {
  const { printerId } = useParams();

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

      const now = new Date();
      const submissionTime = { hour: now.getHours(), minute: now.getMinutes() };
      const endTime = calculateEndTime(totalMinutes);

      const querySnapshot = await db
        .collection("printers")
        .where("roomNumber", "==", "315")
        .where("serialNumber", "==", printerId)
        .get();

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await docRef.update({
          userName: name,
          userStudentId: studentId,
          printingTime: totalMinutes,
          submissionTime: submissionTime, // 제출 시간을 분 단위로 저장
          endTime: endTime, // 작동 종료 시간 저장
          status: "사용 중",
        });

        alert("프린터 사용 정보가 업데이트되었습니다.");

        // 리다이렉션
        router.push("/room315");
      } else {
        alert("해당 프린터를 찾을 수 없습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const calculateEndTime = (durationMinutes) => {
    const endTime = new Date();
    endTime.setTime(endTime.getTime() + durationMinutes * 60 * 1000);

    return endTime;
  };

  return (
    <div className="p-4 pt-10">
      <h1 className="font-bold text-xl mb-4">프린터 사용 정보 입력</h1>
      <div className="max-w-lg mx-auto bg-white p-4 shadow-md rounded">
        <h2 className="text-lg font-semibold mb-2">{printerId} 번 프린터</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="flex">
            <p className="flex flex-grow justify-start">시간</p>
            <p className="flex flex-grow justify-start">분</p>
          </div>
          <div className="flex">
            <input
              type="number"
              placeholder="시간"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="border p-2 rounded w-full mr-2"
            />
            <input
              type="number"
              placeholder="분"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default Room315PrinterDetail;
