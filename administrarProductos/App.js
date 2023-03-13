import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, PermissionsAndroid, StyleSheet, Text, TextInput, View, Alert, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';

let productos = [
  {nombre: "Coca-Cola", categoria: "Bebidas", preciocompra: "1.20", precioventa: "1.50", id: "120"},
  {nombre: "Queso", categoria: "Lacteos", preciocompra: "2.30", precioventa: "2.50", id: "121"}
]

//variable para indicar si se esta creando un nuevo producto o se esta modificando uno existente
let esNuevo = true;
//almacena el indice del array del elemento seleccionado para edicion
let indiceSeleccionado = -1;

export default function App() {

  const [txtNombre, setNombre] = useState();
  const [txtCategoria, setCategoria] = useState();
  const [txtPrecioCompra, setPreciocompra] = useState();
  const [txtPrecioVenta, setPrecioventa] = useState();
  const [txtId, setId] = useState();
  const [numElementos, setnumelementos] = useState(productos.length);
  const [modalVisible, setModalVisible] = useState(false);

  let setValueHandler = (txtPrecioCompra) => {
    setPreciocompra(txtPrecioCompra);
    let a = 0;
    let b = 0;
    if(txtPrecioCompra != null){
      a = parseFloat(txtPrecioCompra);
      b = a * 1.2;
      setPrecioventa(b.toFixed(2).toString())
    } else {
      setPrecioventa(null);
    }
  }

  // let eliminarProducto = () => {
  //   indiceSeleccionado = props.indice;
  //   productos.splice(indiceSeleccionado, 1);
  //   setnumelementos(productos.length)
  //   return setModalVisible(!modalVisible);
  // }

  let ItemProducto = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setId(props.producto.id);
          setNombre(props.producto.nombre);
          setCategoria(props.producto.categoria);
          setPreciocompra(props.producto.preciocompra);
          setPrecioventa(props.producto.precioventa);
          esNuevo = false;
          indiceSeleccionado = props.indice;
        }}
      >
        <View style = {styles.itemPersona}>
  
          <View style = {styles.areaIndice}>
            <Text style = {styles.indice}>
              {props.producto.id}
            </Text>
          </View>

          <View style = {styles.areaNombre}>
            <Text style = {styles.textoPrincipal}> 
              {props.producto.nombre} 
            </Text>
            <Text style = {styles.textoSecundario}> 
              {props.producto.categoria}
            </Text>
          </View>

          <View style = {styles.areaPrecio}>
            <Text style = {styles.precioventa}>
              ${parseInt(props.producto.precioventa).toFixed(2)}
            </Text>
          </View>

          <View style = {styles.areaItemBotones}>
            <Button 
              title = '  X  '
              color = "red"
              onPress={() => {
                 indiceSeleccionado = props.indice;
                return setModalVisible(!modalVisible);
              }}
            />
          </View>

        </View>
      </TouchableOpacity>
      
      
    );
  }
  
let existeProducto = () => {
  for(let i = 0; i < productos.length; i++){
    if(productos[i].id == txtId){
      return true;
    }
  }
  return false;
}

  let guardarProducto = () => {
    if(esNuevo){
      if(txtId == null || txtNombre == null || txtCategoria == null || txtPrecioCompra == null){
        Alert.alert("Info", "Debe llenar todos los campos");
      } else if(existeProducto()) {
        Alert.alert("Info", "Ya existe un producto con el código " + txtId);
      } else {
        let producto = { nombre: txtNombre, categoria: txtCategoria, preciocompra: txtPrecioCompra, precioventa: txtPrecioCompra * 1.2, id: txtId};
        productos.push(producto);
        limpiar();
      }
    } else {
      productos[indiceSeleccionado].nombre = txtNombre;
      productos[indiceSeleccionado].categoria = txtCategoria;
      productos[indiceSeleccionado].preciocompra = txtPrecioCompra;
      productos[indiceSeleccionado].precioventa = txtPrecioCompra * 1.2;
      limpiar();
    }
    setnumelementos(productos.length);
  }

  let limpiar = () => {
    setNombre(null);
    setCategoria(null);
    setPreciocompra(null);
    setPrecioventa(null);
    setId(null);
    esNuevo = true;
  }

  return (

    //Area de inputs y botones
    <View style={styles.container}>

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
            <Text style={styles.modalText}>Está seguro que desea eliminar?</Text>
            <View style={styles.areaBotonesModal}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  productos.splice(indiceSeleccionado, 1);
                  setnumelementos(productos.length)
                  return setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Aceptar</Text>
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

      <View style = {styles.areaCabecera}>
        <Text style = {styles.titulo}>PRODUCTOS</Text>

        <ScrollView>
          <TextInput 
            value = {txtId}
            placeholder = "Código"
            placeholderTextColor = "lightslategrey"
            color = "aliceblue"
            onChangeText = {setId}
            style = {styles.txtInput}
            keyboardType = "numeric"
            editable = {esNuevo}
          />

          <TextInput 
            value = {txtNombre}
            placeholder = "Nombre"
            placeholderTextColor = "lightslategrey"
            color = "aliceblue"
            onChangeText = {setNombre}
            style = {styles.txtInput}
          />

          <TextInput 
            value = {txtCategoria}
            placeholder = "Categoría"
            placeholderTextColor = "lightslategrey"
            color = "aliceblue"
            onChangeText = {setCategoria}
            style = {styles.txtInput}
          />

          <View style = {styles.precios}>
            <TextInput 
              value = {txtPrecioCompra}
              placeholder = "Precio de Compra"
              placeholderTextColor = "lightslategrey"
              color = "aliceblue"
              onChangeText={setValueHandler}
              style = {styles.txtInputPrecioCompra}
              keyboardType = "numeric"
            />

            <TextInput 
              value = {txtPrecioVenta}
              placeholder = "Precio de Venta"
              placeholderTextColor = "dimgray"
              color = "dimgray"
              onChangeText = {setPrecioventa}
              style = {styles.txtInputPrecioVenta}
              editable = {false}
            />
          </View>

          <View style = {styles.areaBotones}>
            <Button 
              title='Guardar'
              onPress={()=>{
                guardarProducto();
              }}
            />

            <Button
              title='Nuevo'
              onPress={()=>{
                limpiar();
              }}
            />
          </View>
        </ScrollView>

        <Text style = {styles.cantidadElementos}>Productos: {numElementos}</Text>
        
      </View>
      
      {/* area de lista de productos */}
      <View style = {styles.areaContenido}>
        <FlatList
          data = {productos}
          renderItem = {({index, item}) => {
            return <ItemProducto 
              producto = {item}
              indice = {index}
            />
          }}
          keyExtractor = {item => {
            return item.id;
          }}
        />
      </View>
      
      <View style = {styles.areaPie}>
        <Text>
          Autor: Pedro Páez
        </Text>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 10
  },
  titulo: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 5,
    paddingTop: 10,
    color: "white",
    fontStyle: "italic",
    //color: "black"
  }, 
  lista: {
    //backgroundColor: "red"
    //flex: 20
  },
  areaCabecera: {
    flex: 10,
    //backgroundColor: "lemonchiffon",
    paddingHorizontal: 10
  },
  areaContenido: {
    flex: 15,
    //backgroundColor: "chartreuse",
    paddingHorizontal: 10
  },
  areaPie: {
    flex: 1,
    //backgroundColor: "cornflowerblue",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  itemPersona: {
    backgroundColor: "white",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    //flex: 20
  },
  textoPrincipal: {
    fontSize: 20,
    fontWeight: "bold"
  },
  textoSecundario: {
    fontSize: 16,
    fontStyle: "italic"
  },
  indice: {
    fontSize: 25
  },
  precioventa: {
    fontSize: 25,
    fontWeight: "bold",
    fontSize: 20
  },
  areaIndice: {
    //backgroundColor: "red",
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  areaNombre: {
    //backgroundColor: "green",
    flex: 8,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  areaPrecio: {
    //backgroundColor: "blue",
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  txtInput: {
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    marginBottom: 7,
    borderColor: "darkgray"
  },
  txtInputPrecioCompra: {
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    marginBottom: 7,
    borderColor: "darkgray",
    flex: 1,
    marginRight: 3
  },
  txtInputPrecioVenta: {
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    marginBottom: 7,
    borderColor: "darkgray",
    flex: 1,
    marginLeft: 3
  },
  precios: {
    flexDirection: "row",
    //justifyContent: "space-evenly",
    //alignItems: "stretch"
  },
  areaBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 6
  },
  areaItemBotones: {
    //backgroundColor: "darkkhaki",
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cantidadElementos: {
    color: "white",
    marginTop: 12,
    fontStyle: "italic"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
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
  areaBotonesModal: {
    flexDirection: "row",
  }
});
