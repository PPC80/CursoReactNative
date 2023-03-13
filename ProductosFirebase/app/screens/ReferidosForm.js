import { useState } from "react";
import { View, StyleSheet, Text, Modal, Pressable, Alert } from "react-native"
import { Input, Icon, Button } from "@rneui/base";
import {consultarUno} from '../services/Usuarios'
import {guardar} from '../services/Usuarios'

export const ContenidoB = () => {

    const [codigo, setCodigo] = useState();
    const [usuario, setUsuario] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [referidos, setReferidos] = useState();


    const modificarUsuario = () => {
        guardar({
            codigo: usuario.codigo,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            fechaNac: usuario.fechaNac,
            alias: usuario.alias,
            puntos: (referidos * 2).toString()
        });
        Alert.alert("Info", "Puntaje asignado correctamente! Su puntaje es: " + (referidos * 2))
    }


    return (
        
        <View style = {styles.container}>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cuántas personas están siendo referidas?</Text>

            <Input
            value={referidos}
            onChangeText={setReferidos}
            label="Cantidad de referidos"
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />

            <View style={styles.areaBotonesModal}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  modificarUsuario();
                  return setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Asignar Puntos</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  return setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
        </Modal>

            <Text>Fue referido por otro usuario? Ingrese el código de ese usuario:</Text>
            <Input
            value={codigo}
            onChangeText={setCodigo}
            label="Código"
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
            <View style = {styles.botones}>
                <Button
                    title="Consultar"
                    onPress={()=>{
                        consultarUno(codigo, setUsuario);
                    }}
                />
                <Button
                    title="Confirmar"
                    onPress={()=>{
                        return setModalVisible(!modalVisible);
                    }}
                />
            </View>
           

        <Input
            value={usuario.codigo}
            label="Código"
            editable = {false}
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
            <Input
            value={usuario.nombre}
            label="Nombre"
            editable = {false}
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
            <Input
            value={usuario.apellido}
            label="Apellido"
            editable = {false}
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
            <Input
            value={usuario.fechaNac}
            label="FechaNac"
            editable = {false}
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
            <Input
            value={usuario.alias}
            label="Alias"
            editable = {false}
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />
        
                
            
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20
    },
    botones: {
       flexDirection: "row",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      areaBotonesModal: {
        flexDirection: "row",
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        marginHorizontal: 10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 10
      },
  });