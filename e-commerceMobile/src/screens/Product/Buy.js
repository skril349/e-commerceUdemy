import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import { addProductCartApi, getProductCartApi } from "../../api/cart";
import Toast from "react-native-root-toast";
export default function Buy(props) {
  const { product, quantity } = props;

  // useEffect(async () => {
  //   const response = await getProductCartApi();
  //   console.log(response);
  // }, []);

  const addProductCart = async () => {
    const response = await addProductCartApi(product._id, quantity);
    if (response) {
      Toast.show("Producto añadido al carrito", {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show("Error al añadir el producto al carrito", {
        position: Toast.positions.CENTER,
      });
    }
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
