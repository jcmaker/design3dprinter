import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
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
const providerMicrosoft = new firebase.auth.OAuthProvider("microsoft.com");

// 기타 필요한 Firebase 서비스를 초기화합니다.

// 필요한 Firebase 서비스를 export합니다.
export { auth, providerGoogle, providerMicrosoft, db };
