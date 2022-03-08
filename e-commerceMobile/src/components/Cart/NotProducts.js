import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function NotProducts() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No tienes productos en el carrito</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});
