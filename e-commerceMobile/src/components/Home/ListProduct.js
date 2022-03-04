import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { map } from "lodash";
import { API_URL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export default function ListProduct(props) {
  const { products } = props;
  const navigation = useNavigation();
  const goToProduct = (id) => {
    console.log(id);
    navigation.push("product", { idProduct: id });
  };
  return (
    <View style={styles.container}>
      {map(products, (product) => (
        <TouchableWithoutFeedback
          key={product._id}
          onPress={() => goToProduct(product._id)}
        >
          <View style={styles.containerProduct}>
            <View style={styles.product}>
              <Image
                style={styles.image}
                source={{
                  uri: `${API_URL}${product.main_image.url}`,
                }}
              />
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {product.title}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: -3,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  containerProduct: {
    width: "50%",
    padding: 3,
    marginBottom: 10,
  },
  product: {
    padding: 10,
    backgroundColor: "#d9d6d0",
    borderRadius: 20,
  },
  image: {
    height: 150,
    resizeMode: "contain",
  },
  name: {
    marginTop: 15,
    fontSize: 18,
  },
});
