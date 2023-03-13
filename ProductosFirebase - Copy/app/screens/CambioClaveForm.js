import { View, StyleSheet, Text, Alert } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
import { useState } from "react";
import { resetearClave } from "../services/AutenticacionSrv";

export const CambioClaveForm = ({navigation}) => {

    const [mail, setMail] = useState(null);

    const resetear = () => {
        resetearClave(mail);
        Alert.alert("Info", "Correo para cambiar clave enviado!")
        navigation.goBack();
    }

    return (
        <View style = {styles.container}>
        <Input
        value={mail}
        onChangeText={setMail}
        label="Usuario"
        keyboardType="email-address"
        leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
        />
        <Button
            title= "Cambiar Clave"
            onPress={resetear}
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
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingHorizontal: 20
    },
  });
