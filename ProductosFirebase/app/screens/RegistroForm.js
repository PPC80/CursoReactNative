import { View, StyleSheet, Text, Alert } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
import { useState } from "react";
import { registrarUsuario } from "../services/AutenticacionSrv";
import {guardar} from '../services/Usuarios'
//import {storage} from '@react-native-firebase/storage'
// import {storage} from '@react-native-firebase/storage'
//import ImagePicker from 'react-native-image-crop-picker'
import {getStorage, ref} from 'firebase/storage'


let test = 0;

export const RegistroForm = () => {
    const [codigoNum, setCodigo] = useState(0);
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [fechaNac, setFechaNac] = useState();
  const [alias, setAlias] = useState();


  const registrar = () => {
    setCodigo(codigoNum+1)
    console.log(codigoNum);
    guardar({
        codigo: test.toString(),
        nombre: nombre,
        apellido: apellido,
        fechaNac: fechaNac,
        alias: alias
    });
    
    Alert.alert("Info", "Usuario registrado correctamente! Su código es: " + test)

  };

  const aumentarCodigo = () => {
    test = test + 1;
    console.log("aca" + test);
  };


  return (
    <View style = {styles.container}>
        <View style = {styles.inputs}>
            <Input
            value={nombre}
            onChangeText={setNombre}
            label="Nombre"
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
            <Input
            value={apellido}
            onChangeText={setApellido}
            label="Apellido"
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
            <Input
                value={fechaNac}
                onChangeText={setFechaNac}
                placeholder = "Ej: 23/03/1995"
                label="Fecha de Nacimiento"
                leftIcon={<Icon name="date" size={24} color="black" type="fontisto" />}
            />
            <Input
                value={alias}
                onChangeText={setAlias}
                label="¿Cómo te llaman tus amigos?"
                leftIcon={<Icon name="user-friends" size={24} color="black" type="font-awesome-5" />}
            />

            
        </View>

        <View style = {styles.botonGuardar}>
        <Button
            title= "Guardar"
            onPress={()=>{
                registrar();
                aumentarCodigo();
            }}
            icon={{
                name: 'save',
                type: 'antdesign',
                size: 15,
                color: 'white',
            }}
            buttonStyle={{
                backgroundColor: 'black',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
            }}
            containerStyle={{
                width: 170,
                // marginHorizontal: 50,
                //marginVertical: 30,
            }}
        />
        </View>

        <div className="App">
      <form className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
    </div>
    </View>
  );
  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: 'lightgray',
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingTop: 20,
      paddingHorizontal: 20
    },
    botonGuardar: {
        alignItems: "center",
        //backgroundColor: "red",
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 25
    },
    inputs: {
        flex: 4,
        //backgroundColor: "blue",
        justifyContent: 'flex-end',
    }
  });

