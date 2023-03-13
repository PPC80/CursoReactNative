import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native'
import {Button, FAB} from '@rneui/base'
import {consultar} from '../services/Usuarios'
import { useState, useEffect } from 'react'

const dataList = [{key: '1'}, {key: '2'}, {key: '3'}];
const WIDTH = Dimensions.get('window').width;
let numColumns = 2;

const formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - (totalRows * numColumns);

    while(totalLastRow !== 0 && totalLastRow !== numColumns){
        dataList.push({key: 'blank', empty: true});
        totalLastRow++;
    }
    return dataList;
}

export const ListaProductos = ({navigation}) => {

    let ItemProducto = (props) => {
        if(props.producto.empty === true){
            return <View style = {styles.itemInvisible} />
        }
        return <View style = {styles.itemProducto}>

            <View style = {styles.areaCodigo}>
                <Text style = {styles.codigo} >
                    {props.producto.codigo}
                </Text>
            </View>

            <View style = {styles.areaNombre}>
                <Text style = {styles.nombre}> 
                    {props.producto.nombre} 
                </Text>
          </View>

          <View style = {styles.areaPrecio}>
                <Text style = {styles.precio}>
                    ${props.producto.precio}
                </Text>
          </View>


        </View>
    }

    const [productos, setProductos] = useState([]);

    useEffect(() => {
      recuperarProductos();
    }, []);
    

    const recuperarProductos = () => {
        consultar(setProductos);
    }

    return <View style = {styles.container}>
        
        <View style = {styles.flatList}>
            <FlatList
                key={numColumns}
                data = {formatData(productos, numColumns)}
                renderItem = {({item, index}) => {
                    return <ItemProducto
                        producto = {item}
                        indice = {index}
                    />
                }}
                keyExtractor = {(item, index) => {
                    return index;
                }}
                numColumns = {numColumns}
            />
        </View>
        
        {/* <View style = {styles.botonCarga}>
            <Button
                title="Cargar productos"
                icon={{
                    name: 'reload',
                    type: 'ionicon',
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
                onPress={recuperarProductos}
            />
        </View> */}
        
        <FAB
            title="+"
            placement = "right"
            color='black'
            onPress={() => {
                navigation.navigate("ProductoFormNav", {fnRepintarLista: recuperarProductos});
            }}
        />
    </View>
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgray',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    itemInvisible: {
        backgroundColor: "transparent"
    },
    itemProducto: {
        backgroundColor: "mediumslateblue",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        flex: 1,
        margin: 1,
        height: WIDTH / numColumns
    },
    itemText: {
        color: "white",
        fontSize: 30
    },
    areaCodigo: {
        //backgroundColor: "red",
        flex: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    areaNombre: {
        flex: 5,
        //backgroundColor: "green",
        justifyContent: 'center'
    },
    areaPrecio: {
       // backgroundColor: "yellow",
        flex: 5
    },
    codigo: {
        fontSize: 30,
    },
    nombre: {
        fontSize: 30,
        fontWeight: "bold"
    },
    precio: {
        fontSize: 25,
        fontStyle: "italic"
    },
    botonCarga: {
        //backgroundColor: "red",
        alignItems: "center",
        justifyContent: 'flex-start',
        flex: 1,
        paddingVertical: 10,
    },
    flatList: {
        flex: 12
    }
  });