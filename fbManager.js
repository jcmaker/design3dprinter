import firebase from "firebase/app"; // import에서 initializeApp을 명시적으로 불러옵니다.
import "firebase/analytics"; // 필요한 경우에만 import합니다.
import "firebase/firestore"; // 필요한 경우에만 import합니다.
import "firebase/auth"; //

const firebaseConfig = {
  apiKey: "AIzaSyDbgxwCsMOYQI7s6L7-vzc_vgcz5vZV79U",
  authDomain: "design-3d-printer.firebaseapp.com",
  projectId: "design-3d-printer",
  storageBucket: "design-3d-printer.appspot.com",
  messagingSenderId: "793430808880",
  appId: "1:793430808880:web:43b6ca33a4796c796e10f5",
  measurementId: "G-M7KH0770GN",
};

// 이미 Firebase 앱이 초기화되었는지 확인
if (!firebase.apps.length) {
  // Firebase 앱 초기화
  firebase.initializeApp(firebaseConfig);

  // Firebase 애널리틱스 초기화 (필요한 경우에만 사용)
}

if (typeof window !== "undefined") {
  firebase.analytics();
}
const db = firebase.firestore();
const auth = firebase.auth();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
// 기타 필요한 Firebase 서비스를 초기화합니다.

// 필요한 Firebase 서비스를 export합니다.
export { auth, providerGoogle, db };
