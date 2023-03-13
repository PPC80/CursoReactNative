import { View, StyleSheet, Text } from "react-native"
import {Input, Icon, Button} from '@rneui/base'
import { useState } from "react"
import {guardar} from '../services/ProductosSrv'
import {finalizarSesion} from "../services/AutenticacionSrv"


export const ProductoForm = ({navigation, route}) => {

    const [codigo, setCodigo] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [precio, setPrecio] = useState(null);

    const guardarProducto = () => {
        guardar({
            codigo: codigo,
            nombre: nombre,
            precio: parseFloat(precio)
        });
        limpiar();
        navigation.goBack();

        //Trae la funcion a traves del params y el navigation

    if(route.params && route.params.fnRepintarLista){
        route.params.fnRepintarLista()
    }

    }

    const limpiar = () => {
        setCodigo(null);
        setNombre(null);
        setPrecio(null);
    }

    return <View style = {styles.container}>
        <Input
            value = {codigo}
            onChangeText = {setCodigo}
            label = "Código"
            keyboardType="numeric"
            leftIcon = {
                <Icon
                    name = "form"
                    size = {24}
                    color = "black"
                    type = "ant-design"
                />
            }
        />
        <Input
            value = {nombre}
            onChangeText = {setNombre}
            label = "Nombre"
            leftIcon = {
                <Icon
                    name = "idcard"
                    size = {24}
                    color = "black"
                    type = "ant-design"
                />
            }
        />
        <Input
            value = {precio}
            onChangeText = {setPrecio}
            label = "Precio"
            keyboardType="numeric"
            leftIcon = {
                <Icon
                    name = "money"
                    size = {24}
                    color = "black"
                    type = "font-awesome"
                />
            }
        />
        <View style = {styles.botonGuardar}>
            <Button
            title= "Guardar"
            onPress={guardarProducto}
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

            <Button
                title= "Cerrar Sesion"
                onPress={finalizarSesion}
                icon={{
                    name: 'close',
                    type: 'font-awesome',
                    size: 15,
                    color: 'white',
                }}
                buttonStyle={{
                    backgroundColor: 'maroon',
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
      flexDirection: "column",
      backgroundColor: 'lightgray',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      paddingTop: 20,
      paddingHorizontal: 20
    },
    botonGuardar: {
        alignItems: "center",
        //backgroundColor: "red",
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 25
    }
  });