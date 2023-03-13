import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

export const cargaConfiguracion = () => {
    const app = initializeApp(firebaseConfig);
    global.dbCon = getFirestore(app);
}

const firebaseConfig = {
  apiKey: "AIzaSyCYHommPCHv2ST2q0vAUgq0qLMXZD7c2LI",
  authDomain: "fir-rn-2ce2e.firebaseapp.com",
  projectId: "fir-rn-2ce2e",
  storageBucket: "fir-rn-2ce2e.appspot.com",
  messagingSenderId: "1086604117654",
  appId: "1:1086604117654:web:4def98d18cd3756bf4e4b7"
};

