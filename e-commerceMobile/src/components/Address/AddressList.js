import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { map } from "lodash";
import colors from "../../styles/colors";
import useAuth from "../../hooks/useAuth";
import { deleteAddressApi } from "../../api/address";
import { useNavigation } from "@react-navigation/native";
export default function AddressList(props) {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const { addresses, setReloadAddresses } = props;

  const deleteAddressAlert = (address) => {
    Alert.alert(
      "Eliminando dirección",
      `Estas seguro que quieres eliminar la direccion ${address.title}?`,
      [
        {
          text: "No",
        },
        {
          text: "Si",
          onPress: () => deleteAddress(address._id),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async (idAddress) => {
    console.log("auth token", auth);
    try {
      await deleteAddressApi(auth.token, idAddress);
      setReloadAddresses(true);
    } catch (error) {
      console.log(error);
    }
  };

  const goToUpdateAddress = (idAddress) => {
    navigation.navigate("add-address", { idAddress });
  };

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <View key={address._id} style={styles.address}>
          <Text style={styles.title}>{address.title}</Text>
          <Text>{address.name_lastname}</Text>
          <Text>{address.address}</Text>
          <View style={styles.blockLine}>
            <Text>{address.state}, </Text>
            <Text>{address.city}, </Text>
            <Text>{address.postal_code}</Text>
          </View>
          <Text>{address.country}</Text>
          <Text>Número de telefono: {address.phone}</Text>
          <View style={styles.actions}>
            <Button
              mode="contained"
              color={colors.primary}
              onPress={() => goToUpdateAddress(address._id)}
            >
              editar
            </Button>
            <Button
              mode="contained"
              color={colors.danger}
              onPress={() => deleteAddressAlert(address)}
            >
              elimnar
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
