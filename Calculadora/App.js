import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {

const [num1, setNum1] = useState("0");
const [num2, setNum2] = useState("0");
const [resultado, setResultado] = useState("0"); 

let sumar = () => {
  setResultado(parseInt(num1)  + parseInt(num2));
}

let limpiar = () => {
  setNum1("0");
  setNum2("0");
  setResultado("0");
}
  return (
    <View style={styles.container}>
      <Text>Calculadora</Text>
      <TextInput 
        value={num1}
        style = {styles.caja}
        onChangeText = {(txt) => {
          if (txt.includes("a")){
            Alert.alert("INFO", "No se permite la a");
          } else {
            setNum1(txt);
          }
        }}
      />
      <TextInput 
        value={num2}
        style = {styles.caja}
        onChangeText = {setNum2}
      />
      <Button title="Sumar" onPress={sumar}/>
      <Text>Resultado: {resultado}</Text>
      <Button title="Limpiar" onPress={limpiar}/>
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

  caja: {
    borderColor: "black",
    borderWidth: 1,
    paddingTop: 5,
    paddingHorizontal: 10
  }
});
