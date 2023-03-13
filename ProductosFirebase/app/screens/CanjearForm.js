import { useState } from "react";
import { View, StyleSheet, Text, Modal, Pressable, Alert, FlatList, TouchableOpacity } from "react-native"
import { Input, Icon, Button } from "@rneui/base";
import {consultarUno} from '../services/Usuarios'
import {guardar} from '../services/Usuarios'

export const ContenidoA = () => {

    let premios = [
        {id: 1, nombre: "Cerveza", costo: 20},
        {id: 2, nombre: "Whisky", costo: 50},
        {id: 3, nombre: "Tequila", costo: 40},
        {id: 4, nombre: "Ron", costo: 35},
        {id: 5, nombre: "Vodka", costo: 30}
    ]

    const modificarUsuario = () => {
        guardar({
            codigo: usuario.codigo,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            fechaNac: usuario.fechaNac,
            alias: usuario.alias,
            puntos: (puntos - puntosresta).toString()
        });
        Alert.alert("Felicitaciones!", "Disfrute de su premio :)")
    }

    let ItemProducto = (props) => {
        return (
          <TouchableOpacity
            onPress={() => {
                setPuntosresta(props.premios.costo);
                return setModalVisibleConf(!modalVisibleConf);
            }}
          >
            <View style = {styles.itemPersona}>
    
              <View style = {styles.areaNombre}>
                <Text style = {styles.textoPrincipal}> 
                  {props.premios.nombre} 
                </Text>
              </View>
    
              <View style = {styles.areaPrecio}>
                <Text style = {styles.precioventa}>
                  {props.premios.costo} puntos
                </Text>
              </View>
    
            </View>
          </TouchableOpacity>
          
          
        );
      }

    const [codigo, setCodigo] = useState();
    const [usuario, setUsuario] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleConf, setModalVisibleConf] = useState(false);
    const [referidos, setReferidos] = useState();
    const [puntos, setPuntos] = useState(0);
    const [puntosresta, setPuntosresta] = useState();

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
            <Text style={styles.modalText}>Es esta la persona que buscas?</Text>
            <Text style={styles.modalText}>Nombre: {usuario.nombre} {usuario.apellido}</Text>
            <Text style={styles.modalText}>Fecha de nacimiento: {usuario.fechaNac}</Text>
            <Text style={styles.modalText}>Alias: {usuario.alias}</Text>
            <Text style={styles.modalText}>Puntos disponibles: {usuario.puntos}</Text>

            <View style={styles.areaBotonesModal}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setPuntos(usuario.puntos)
                  return setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Confirmar</Text>
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

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleConf}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Desea canjear ese premio?</Text>

            <View style={styles.areaBotonesModal}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                    console.log("usuarios.costo " + usuario.costo)
                    console.log("premios.costo " + premios.costo)
                    console.log("puntos " + puntos)
                    if((puntos - puntosresta) < 0){
                        Alert.alert("INFO", "No tiene suficientes puntos") 
                    } else {
                        setPuntos(puntos - puntosresta);
                        modificarUsuario();
                    }
                  
                  return setModalVisibleConf(!modalVisibleConf);
                }}
              >
                <Text style={styles.textStyle}>Confirmar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  return setModalVisibleConf(!modalVisibleConf);
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
        </Modal>

            <Text>Ingrese el código de la persona:</Text>
            <Input
            value={codigo}
            onChangeText={setCodigo}
            label="Código"
            leftIcon={<Icon name="user" size={24} color="black" type="ant-design" />}
            />

            <Button
            title= "Buscar"
            onPress={()=>{
                consultarUno(codigo, setUsuario);
                return setModalVisible(!modalVisible);
            }}
            icon={{
                name: 'search',
                type: 'evillcons',
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

            <Text  style = {styles.puntos}>Puntos disponibles: {puntos}</Text>

            <View style = {styles.areaContenido}>
                <FlatList
                data = {premios}
                renderItem = {({index, item}) => {
                    return <ItemProducto 
                    premios = {item}
                    indice = {index}
                    />
                }}
                keyExtractor = {item => {
                    return item.id;
                }}
            />
      </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingTop: 100
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
      itemPersona: {
        flex: 10,
        backgroundColor: "white",
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        //flex: 20
      },
      areaContenido: {
        marginTop: 50
      },
      areaNombre: {
        marginRight: 10
      },
      puntos: {
        marginTop: 10,
        paddingTop: 10
      }
  });