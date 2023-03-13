import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [estatura, setEstatura] = useState();
  const [peso, setPeso] = useState();
  const [imc, setIMC] = useState(); 
  const [categoria, setCategoria] = useState(); 
  let resultadoImc = 0;

  let calcularImc = () => {
    let estaturaMetros = parseFloat(estatura) / 100;
    setIMC(parseFloat(peso) / (parseFloat(estaturaMetros)*parseFloat(estaturaMetros)));
    
    calcularCat(imc);
    console.log(categoria);
  }

  let calcularCat = (num) => {
    if(parseFloat(num) < 18.5){
      setCategoria("Su peso es inferior al normal!");
    } else if(parseFloat(num) >= 18.5 && parseFloat(num) < 25){
      setCategoria("Su peso es normal!");
    } else if(parseFloat(num) >= 25 && parseFloat(num) < 30){
      setCategoria("Su peso es superior al normal!");
    } else if(parseFloat(num) >= 30){
      setCategoria("Tiene obesidad!");
    }
  }

  let calcularResultado = () => {
    calcularImc();
    //calcularCat();
  }

  return (
    <View style={styles.container}>
      <Text style = {styles.texto}>CALCULADORA IMC</Text>
      <TextInput
        placeholder='Ingrese su estatura en centímetros' 
        style = {styles.caja}
        onChangeText = {(txt) => {
            setEstatura(txt);
        }}
      />
      <TextInput  
        placeholder='Ingrese su peso en kilogramos'
        style = {styles.caja}
        onChangeText = {(txt) => {
            setPeso(txt);
        }}
        />
      <Button title="CALCULAR" onPress={calcularResultado}/>
      <Text  style = {styles.texto}>Resultado: {Math.round(imc * 100 + Number.EPSILON) / 100}</Text>
      <Text  style = {styles.texto}>Categoría: {categoria}</Text>
    

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
    flexDirection: "column",
    alignItems: "stretch",
    paddingLeft: 50,
    paddingRight: 50
  },

  caja: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5
  },

  texto: {
    textAlign: "center",
    paddingBottom: 5,
    paddingTop: 5
    //justifyContent: "center",
    //alignItems: "center"
  }
});
