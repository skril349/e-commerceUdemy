import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { map } from "lodash";
import Order from "./Order";
export default function ListOrder(props) {
  const { orders } = props;
  return (
    <View style={styles.container}>
      {map(orders, (order) => (
        <Text key={order._id}>
          <Order key={order._id} order={order} />
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
  },
});
