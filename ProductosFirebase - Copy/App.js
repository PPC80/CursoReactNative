import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {cargaConfiguracion} from './app/utils/FirebaseConfig'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ProductoForm} from "./app/screens/ProductoForm"
import {ListaProductos} from "./app/screens/ListaProductos"
import {LoginForm} from "./app/screens/Login"
import {RegistroForm} from "./app/screens/RegistroForm"
import {CambioClaveForm} from "./app/screens/CambioClaveForm"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { useState } from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {ContenidoA} from './app/screens/ContenidoA'
import {ContenidoB} from './app/screens/ContenidoB'
import {Icon} from '@rneui/base'


const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='TabContenidoA'
        component={ContenidoA}
        options= {{
          headerShown: false,
          tabBarLabel: "Configuración",
          tabBarIcon: ({size, tintColor}) => {
            return <Icon
            name = "options"
            size = {size}
            color = {tintColor}
            type = "ionicon"
            />
          }
        }}
      />
      <Tab.Screen
        name='TabContenidoB'
        component={ContenidoB}
        options= {{
          headerShown: false,
          tabBarLabel: "Acerca De",
          tabBarIcon: ({size, tintColor}) => {
            return <Icon
            name = "user"
            size = {size}
            color = {tintColor}
            type = "ant-design"
            />
          }
        }}
      />
    </Tab.Navigator>
  )
}

const LoginNav = () => {
  return <LoginStack.Navigator>
    <LoginStack.Screen
      name='LoginNavigation'
      component={LoginForm}
      options= {{
        headerShown: false
      }}
    />
    <LoginStack.Screen
      name='RegistroNavigation'
      component={RegistroForm}
      options= {{
        headerShown: false
      }}
    />
     <LoginStack.Screen
      name='CambioClaveNavigation'
      component={CambioClaveForm}
      options= {{
        headerShown: false
      }}
    />
  </LoginStack.Navigator>
}

const DrawerNav = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name = "DrawerProductosNav"
        component={ProductosNav}
        options = {{
          title: "Productos",
        }}
      />
      <Drawer.Screen
        name = "DrawerEjemploTabs"
        component={TabNav}
        options = {{
          title: "Ejemplo Tabs",
        }}
      />
      <Drawer.Screen
        name = "DrawerFinSesion"
        component={ProductosNav}
        options = {{
          title: "Finalizar Sesión",
        }}
      />
    </Drawer.Navigator>
  )
}

const ProductosNav = () => {
  return (
    <Stack.Navigator 
      screenOptions = {{
        title: "Formulario Producto",
        headerStyle: {
          backgroundColor: "lightgray"
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}>
      <Stack.Screen
        name = "ListaProductosNav"
        component={ListaProductos}
        options = {{
          title: "Lista de Productos",
        }}
      />
      <Stack.Screen
        name = "ProductoFormNav"
        component={ProductoForm}
        options = {{
          title: "Formulario Producto",
        }}
      />      
    </Stack.Navigator>
  )
}

export default function App() {

  const registrarObserver = () => {
    const auth = getAuth();
  
    if(!global.desSuscribirObs){
      global.desSuscribirObs = onAuthStateChanged(auth, (user) => {
        if (user) {
          //User is signed in, see docs for a list of available properties
          const uid = user.uid;
          console.log("Observer --> cambia estado a sign in");
          setLogin(true);
        } else {
          //User is signed out
          console.log("Observer --> cambia estado a sign out");
          setLogin(false);
        }
      });
    }
  } 

  const [login, setLogin] = useState(false);

  cargaConfiguracion();
  registrarObserver();

  return (
    <NavigationContainer>
      {login ? <DrawerNav/> : <LoginNav/>}
    </NavigationContainer>
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
