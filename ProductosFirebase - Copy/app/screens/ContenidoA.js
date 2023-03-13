import { View, StyleSheet, Text } from "react-native"

export const ContenidoA = () => {
    return (
        <View style = {styles.container}>
            <Text>CONTENIDO A</Text>
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