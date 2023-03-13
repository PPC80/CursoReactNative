import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setdoc, setDoc, addDoc, collection, getDoc} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCYHommPCHv2ST2q0vAUgq0qLMXZD7c2LI",
  authDomain: "fir-rn-2ce2e.firebaseapp.com",
  projectId: "fir-rn-2ce2e",
  storageBucket: "fir-rn-2ce2e.appspot.com",
  messagingSenderId: "1086604117654",
  appId: "1:1086604117654:web:a2aab2e1609626f1f4e4b7"
};

//Inicializar firebase
const app = initializeApp(firebaseConfig);
//Inicializar DB
const db = getFirestore(app);

export default function App() {

  const guardar = () => {
    //referencia al documento y no a la coleccion (la coleccion es personas y el documento es la cedula)
    let miPersona={
      cedula: "1726887332",
      nombre: "Richi",
      apellido: "Carapaz"
    }
    const refPersona = doc(db, "Personas", "1726887332");
    setDoc(refPersona, miPersona);
  }

  const guardarConAdd = () => {
    //referencia a la collecion pero no al documento
    let miPersona={
      cedula: "4444",
      nombre: "Juan",
      apellido: "Torres"
    }
    const refColPersonas = collection(db, "Personas");
    addDoc(refColPersonas, miPersona);
  }

  const recuperarDocumento = async () => {
    const refPersona = doc(db, "Personas", "1726887332");
    const personaSnap = await getDoc(refPersona);
    if(personaSnap.exists()){
      console.log("Persona", personaSnap.data());
    } else {
      console.log("No existe");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Firebase</Text>
      <Button
        title='Guardar'
        onPress={guardar}
      />
      <Button
        title='Add'
        onPress={guardarConAdd}
      />
      <Button
        title='Recuperar'
        onPress={recuperarDocumento}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
