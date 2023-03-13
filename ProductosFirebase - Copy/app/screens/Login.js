import {View, Text, StyleSheet} from 'react-native'
import {Input, Icon, Button, Divider} from '@rneui/base'
import { useState } from "react"
import {ingresar, finalizarSesion} from "../services/AutenticacionSrv"


export const LoginForm = ({navigation}) => {

    const [usuario, setUsuario] = useState(null);
    const [clave, setClave] = useState(null);

    const validarLogin = () => {
        ingresar(usuario, clave);
    }

    const navegarRegistro = () => {
        navigation.navigate("RegistroNavigation");
    }

    const navegarRecuperarClave = () => {
        navigation.navigate("CambioClaveNavigation");
    }

    return <View style={styles.container}>
        <View style = {styles.inputs}>
            <Input
                value = {usuario}
                onChangeText = {setUsuario}
                label = "Mail"
                keyboardType="email-address"
                leftIcon = {
                    <Icon
                        name = "user"
                        size = {24}
                        color = "black"
                        type = "ant-design"
                    />
                }
            />
            <Input
                value = {clave}
                onChangeText = {setClave}
                label = "Contraseña"
                secureTextEntry={true}
                leftIcon = {
                    <Icon
                        name = "key"
                        size = {24}
                        color = "black"
                        type = "font-awesome-5"
                    />
                }
            />
        </View>

        <View style = {styles.botones}>
            <Button
                title= "Ingresar"
                onPress={validarLogin}
                icon={{
                    name: 'login',
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
            <Divider width={20} color = "white"/>
            <Divider width={20} color = "white"/>
            <Divider width={20} color = "white"/>
            <Button
                title= "Registrar Usuario"
                onPress={navegarRegistro}
                icon={{
                    name: 'adduser',
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
            <Divider width={20} color = "white"/>
            <Button
                title= "Cambiar Clave"
                onPress={navegarRecuperarClave}
                icon={{
                    name: 'key',
                    type: 'entypo',
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
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgray',
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingTop: 20,
      paddingHorizontal: 20
    },
    botones: {
        alignItems: "center",
        //backgroundColor: "red",
        flex: 1,
        justifyContent: "flex-start",
        paddingBottom: 25
    },
    inputs: {
        flex: 1,
        //backgroundColor: "blue",
        justifyContent: 'flex-end',
    }
  });