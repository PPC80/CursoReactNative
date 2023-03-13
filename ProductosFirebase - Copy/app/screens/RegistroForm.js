import { View, StyleSheet, Text, Alert } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
import { useState } from "react";
import { registrarUsuario } from "../services/AutenticacionSrv";

export const RegistroForm = ({navigation}) => {
  const [usuario, setUsuario] = useState();
  const [clave, setClave] = useState();
  const [confirmacion, setConfirmacion] = useState();
  const [errorClave, setErrorClave] = useState();

  const registrar = () => {
    if(confirmacion !== clave){
        setErrorClave("Las contraseñas no coinciden")
    } else {
        registrarUsuario(usuario, clave);
        Alert.alert("Info", "Usuario registrado correctamente!")
        navigation.goBack();
    }
  
  };

  return (
    <View style = {styles.container}>
        <View style = {styles.inputs}>
            <Input
            value={usuario}
            onChangeText={setUsuario}
            label="Usuario"
            keyboardType="email-address"
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
            <Input
                value={clave}
                onChangeText={setClave}
                label="Contraseña"
                secureTextEntry={true}
                leftIcon={<Icon name="key" size={24} color="black" type="font-awesome-5" />}
            />
            <Input
                value={confirmacion}
                onChangeText={setConfirmacion}
                label="Confirmar Contraseña"
                secureTextEntry={true}
                errorMessage={errorClave}
                leftIcon={<Icon name="key" size={24} color="black" type="font-awesome-5" />}
            />
        </View>

        <View style = {styles.botonGuardar}>
        <Button
            title= "Guardar"
            onPress={registrar}
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
        flex: 2,
        //backgroundColor: "blue",
        justifyContent: 'flex-end',
    }
  });

