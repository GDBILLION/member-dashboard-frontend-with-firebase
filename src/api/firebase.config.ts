import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnAT0LegkhbgAChupyGvE4pA4hPIvz5C0",
  authDomain: "admin-dashboard-test-24f77.firebaseapp.com",
  projectId: "admin-dashboard-test-24f77",
  storageBucket: "admin-dashboard-test-24f77.firebasestorage.app",
  messagingSenderId: "220325680166",
  appId: "1:220325680166:web:68cbd1b969bc6a162742e7",
  measurementId: "G-88DCXDEBB7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, "members");