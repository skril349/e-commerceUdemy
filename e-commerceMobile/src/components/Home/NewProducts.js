import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getProductsApi } from "../../api/product";
import ListProduct from "./ListProduct";

export default function NewProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getProductsApi(5);
      setProducts(response);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevos productos</Text>
      {products && <ListProduct products={products} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
});
