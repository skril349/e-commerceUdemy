import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import StatusBarCustom from "../../components/StatusBarCustom";
import useAuth from "../../hooks/useAuth";
import { getOrdersApi } from "../../api/order";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import colors from "../../styles/colors";
import ListOrder from "../../components/Order/ListOrder";
export default function Orders() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getOrdersApi(auth);
        setOrders(response);
        console.log(response);
      })();
    }, [])
  );

  return (
    <>
      <StatusBarCustom />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mis pedidos</Text>
        {!orders ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : size(orders) === 0 ? (
          <Text style={styles.noOrderText}>No tienes pedidos</Text>
        ) : (
          <ListOrder orders={orders} />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  loading: {
    marginTop: 20,
  },
  noOrderText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
  },
});
