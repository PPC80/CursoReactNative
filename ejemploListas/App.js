import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {

  productos = [
    {nombre: "Coca-Cola", categoria: "Bebidas", preciocompra: 1.20, precioventa: 1.50, id: 120},
    {nombre: "Queso", categoria: "Lacteos", preciocompra: 2.30, precioventa: 2.50, id: 121},
    {nombre: "Filete de carne", categoria: "Carnicos", preciocompra: 3.50, precioventa: 4.50, id: 122},
    {nombre: "Ruffles", categoria: "Snacks", preciocompra: 2.00, precioventa: 2.50, id: 123},
    {nombre: "Shampoo", categoria: "Higiene", preciocompra: 8.50, precioventa: 10.00, id: 124},
    {nombre: "Jabón", categoria: "Higiene", preciocompra: 4.50, precioventa: 6.00, id: 125}
  ]

  return (
    <View style={styles.container}>
      <Text style = {styles.titulo}>PRODUCTOS</Text>
      <FlatList
      style = {styles.lista}
      data = {productos}
      renderItem = {(obj) => {
        return (
          <View style = {styles.itemPersona}>
            <Text style = {styles.textoPrincipal}> 
              {obj.item.nombre} ({obj.item.categoria}) ☑️
            </Text>
            <Text style = {styles.textoSecundario}> 
              USD {obj.item.precioventa}
            </Text>
          </View>
        );
      }}
      keyExtractor = {(item) => {
        return item.id;
      }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 25,
    textAlign: "center",
    margin: 20,
    paddingTop: 10,
    color: "white",
    fontStyle: "italic"
  }, 
  lista: {
    //backgroundColor: "red"
  },
  itemPersona: {
    backgroundColor: "white",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10
  },
  textoPrincipal: {
    fontSize: 20,
    fontWeight: "bold"
  },
  textoSecundario: {

    fontSize: 16,
    fontStyle: "italic"
  }
});
