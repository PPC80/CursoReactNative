import { View, StyleSheet, Text } from "react-native"

export const ContenidoB = () => {
    return (
        <View style = {styles.container}>
            <Text>CONTENIDO B</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });