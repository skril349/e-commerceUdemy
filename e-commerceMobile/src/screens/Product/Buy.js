import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function Buy(props) {
  const { product, quantity } = props;

  const addProductCart = () => {
    console.log("añadido al carrito");
    // console.log(product.title, ",", quantity);
  };
  return (
    <View style={{ zIndex: 1 }}>
      <Button
        mode="contained"
        contentStyle={styles.btnBuyContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={() => addProductCart()}
      >
        Añadir a la cesta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
