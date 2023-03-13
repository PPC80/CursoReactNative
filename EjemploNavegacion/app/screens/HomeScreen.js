import { View, Text, StyleSheet, Button } from "react-native"

export const Home = ({navigation}) => {
    return <View style = {styles.container}>
        <Text>
            Home
        </Text>
        <View style = {styles.areaBotones}>
            <Button
                title="Contactos"
                onPress={() => {
                    navigation.navigate('ContactsNav');
                }}
            />
            <Button
                title="Productos"
                onPress={() => {
                    navigation.navigate('ProductosNav');
                }}
            />
        </View>
        
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    areaBotones: {
        flexDirection: "row",
        margin: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
  });