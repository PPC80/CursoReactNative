// import "react-native-gesture-handler";
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {cargaConfiguracion} from './app/utils/FirebaseConfig'
import {NavigationContainer} from '@react-navigation/native'
// import {createNativeStackNavigator} from '@react-navigation/native-stack'

// const Stack = createNativeStackNavigator();

export default function App() {

  cargaConfiguracion();

  return (
    <View style={styles.container}>
      <Text>holi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
