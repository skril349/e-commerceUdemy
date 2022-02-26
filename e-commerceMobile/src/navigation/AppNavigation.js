import React from "react";
import { StyleSheet } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import AccountStack from "./AccountStack";
import Cart from "../screens/Cart";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: "#16222b" }}
        inactiveColor="#3e2465"
        activeColor="#f0edf6"
        screenOptions={({ route }) => ({
          tabBarIcon: (routerStatus) => {
            return setIcon(route, routerStatus);
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            title: "Inicio",
          }}
        />

        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{
            title: "Favoritos",
          }}
        />

        <Tab.Screen
          name="cart"
          component={Cart}
          options={{
            title: "Carrito",
          }}
        />
        <Tab.Screen
          name="acount"
          component={AccountStack}
          options={{
            title: "Cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  console.log(route);
  console.log(routeStatus);
  let iconName = "";
  switch (route.name) {
    case "home":
      iconName = "home";
      break;
    case "favorites":
      iconName = "heart";
      break;
    case "cart":
      iconName = "shopping-cart";
      break;
    case "acount":
      iconName = "user";
      break;
    default:
      break;
  }
  return <AwesomeIcon name={iconName} size={20} color="#fff" />;
}
const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 50,
    color: colors.fontLight,
  },
});
