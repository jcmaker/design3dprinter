"use client";
import React, { useEffect, useState } from "react";
import { db } from "fbManager";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/authProvider";
import { toast } from "react-hot-toast";
import PrinterSubmitCard from "@/components/PrinterSubmitCard";

function Room315PrinterDetail() {
  const { printerId } = useParams();

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [printers, setPrinters] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      // user.uid가 유효한 경우에만 실행
      const unsubscribe = db
        .collection("users")
        .where("userId", "==", user.uid)
        .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            const userData = snapshot.docs[0]?.data();
            setName(userData?.name);
            setStudentId(userData?.studentId);
            setPhoneNumber(userData?.phoneNumber);
          }
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = db
      .collection("printers")
      .where("roomNumber", "==", "315")
      .where("serialNumber", "==", printerId)
      .onSnapshot((snapshot) => {
        const printerData = [];
        snapshot.forEach((doc) => {
          printerData.push({ id: doc.id, ...doc.data() });
        });
        setPrinters(printerData);
      });

    return () => {
      unsubscribe();
    };
  }, [printerId]);

  const handleNameChange = (e) => {
    const { value } = e.target;
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    if (value === "" || regex.test(value)) {
      setName(value);
    } else {
      toast.error("이름은 영문자, 한글, 공백만 입력 가능합니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || studentId.trim() === "") {
      toast.error("이름과 학번을 모두 입력해주세요.");
      return;
    }

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
        const docRef = querySnapshot.docs[0]?.ref;
        await docRef.update({
          userName: name,
          userStudentId: studentId,
          phoneNumber: phoneNumber,
          printingTime: totalMinutes,
          submissionTime: submissionTime, // 제출 시간을 분 단위로 저장
          endTime: endTime, // 작동 종료 시간 저장
          status: "사용 중",
        });

        // alert("프린터 사용 정보가 업데이트되었습니다.");
        toast.success("프린터 사용 정보가 업데이트되었습니다.");

        // 리다이렉션
        router.push("/room315");
      } else {
        // alert("해당 프린터를 찾을 수 없습니다.");
        toast.dismiss("해당 프린터를 찾을 수 없습니다.");
        router.push("/room315");
      }
    } catch (error) {
      // alert("오류가 발생했습니다. 다시 시도해주세요.");
      toast.dismiss("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const calculateEndTime = (durationMinutes) => {
    const endTime = new Date();
    endTime.setTime(endTime.getTime() + durationMinutes * 60 * 1000);

    return endTime;
  };

  return (
    <>
      {printers.map((printer, index) => (
        <PrinterSubmitCard
          key={index}
          printer={printer}
          handleSubmit={handleSubmit}
          handleNameChange={handleNameChange}
          setStudentId={setStudentId}
          setPhoneNumber={setPhoneNumber}
          setHours={setHours}
          setMinutes={setMinutes}
          name={name}
          studentId={studentId}
          phoneNumber={phoneNumber}
          hours={hours}
          minutes={minutes}
        />
      ))}
    </>
  );
}

export default Room315PrinterDetail;
