import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenLoading from "../ScreenLoading";
import { map } from "lodash";
import { getProductApi } from "../../api/product";
import Product from "./Product";
export default function ProductList(props) {
  const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;
  const calcPrice = (price, discount) => {
    if (!discount) return price;
    const discountAmount = (price * discount) / 100;

    return (price - discountAmount).toFixed(2);
  };
  useEffect(() => {
    setProducts(null);

    (async () => {
      const productTemp = [];
      let totalPaymentTemp = 0;
      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);
        const priceProduct = calcPrice(response.price, response.discount);
        totalPaymentTemp += priceProduct * response.quantity;
      }
      setProducts(productTemp);
      setTotalPayment(totalPaymentTemp);
    })();
  }, [cart]);
  return (
    <View>
      <Text style={styles.title}>Productos:</Text>
      {!products ? (
        <ScreenLoading size="large" text="cargando carrito" />
      ) : (
        map(products, (product) => (
          <Product
            key={product._id}
            product={product}
            setReloadCart={setReloadCart}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
