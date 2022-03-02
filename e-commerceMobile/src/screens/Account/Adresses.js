import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAddressesApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
import { size } from "lodash";
import AddressList from "../../components/Address/AddressList";

export default function Adresses() {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setAddresses(null);
      (async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
        setReloadAddresses(false);
      })();
    }, [reloadAddresses])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis direcciones</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("add-address")}
      >
        <View style={styles.addAddress}>
          <Text style={styles.addAddressText}>Añadir una dirección</Text>
          <IconButton icon="arrow-right" color="#000" size={19} />
        </View>
      </TouchableWithoutFeedback>
      {!addresses ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : size(addresses) === 0 ? (
        <Text style={styles.noAddressText}>Crea tu primera direccion</Text>
      ) : (
        <AddressList
          addresses={addresses}
          setReloadAddresses={setReloadAddresses}
        ></AddressList>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAddressText: {
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  noAddressText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
