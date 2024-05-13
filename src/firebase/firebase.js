import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAXbvA-Jd9GXRf4xtAYF_fcj1xepy8uAcE",
  authDomain: "igca-3d357.firebaseapp.com",
  projectId: "igca-3d357",
  storageBucket: "igca-3d357.appspot.com",
  messagingSenderId: "759975012878",
  appId: "1:759975012878:web:866adcd8b28a7083f3aa5f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;