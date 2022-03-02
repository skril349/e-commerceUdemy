import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { List } from "react-native-paper";
import useAuth from "../../hooks/useAuth";

export default function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const logoutAccount = () => {
    Alert.alert(
      "Cerrar Sesion",
      "Estas seguro de que quieres salir de tu cuenta?",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: logout,
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <>
      <List.Section>
        <List.Subheader>Mi Cuenta</List.Subheader>
        <List.Item
          title="Cambiar nombre"
          description="Cambia el nombre de tu cuenta"
          left={(props) => <List.Icon {...props} icon="face"></List.Icon>}
          onPress={() => navigation.navigate("change-name")}
        />

        <List.Item
          title="Cambiar email"
          description="Cambia el email de tu cuenta"
          left={(props) => <List.Icon {...props} icon="at"></List.Icon>}
          onPress={() => navigation.navigate("change-email")}
        />

        <List.Item
          title="Cambiar username"
          description="Cambia el username de tu cuenta"
          left={(props) => <List.Icon {...props} icon="sim"></List.Icon>}
          onPress={() => navigation.navigate("change-username")}
        />

        <List.Item
          title="Cambiar contraseña"
          description="Cambia el contraseña de tu cuenta"
          left={(props) => <List.Icon {...props} icon="key"></List.Icon>}
          onPress={() => navigation.navigate("change-password")}
        />
        <List.Item
          title="Añadir direcciones"
          description="Administra tus direcciones de envio"
          left={(props) => <List.Icon {...props} icon="map"></List.Icon>}
          onPress={() => navigation.navigate("adresses")}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>App</List.Subheader>
        <List.Item
          title="Pedidos"
          description="Listado de los pedidos"
          left={(props) => (
            <List.Icon {...props} icon="clipboard-list"></List.Icon>
          )}
          onPress={() => console.log("Ir a mis pedidos")}
        />

        <List.Item
          title="Lista de deseos"
          description="Listado de los productos que te quieres comprar"
          left={(props) => <List.Icon {...props} icon="heart"></List.Icon>}
          onPress={() => navigation.navigate("favorites")}
        />

        <List.Item
          title="Cerrar sesion"
          description="Cierra esta sesion y inicia con otra"
          left={(props) => <List.Icon {...props} icon="logout"></List.Icon>}
          onPress={logoutAccount}
        />
      </List.Section>
    </>
  );
}

const styles = StyleSheet.create({});
