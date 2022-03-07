import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Button, IconButton } from "react-native-paper";
import { API_URL } from "../../utils/constants";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { deleteFavoriteApi } from "../../api/favorite";
import useAuth from "../../hooks/useAuth";
export default function Product(props) {
  const { item, setReloadFavorites } = props;
  const navigation = useNavigation();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const calcPrice = (price, discount) => {
    if (!discount) return price;
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };
  const deleteFavorite = async (id) => {
    setLoading(true);
    await deleteFavoriteApi(auth, id);
    setReloadFavorites(true);
    setLoading(false);
  };
  return (
    <View style={styles.product}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{ uri: `${API_URL}${item.product.main_image.url}` }}
        />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {item.product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {calcPrice(item.product.price, item.product.discount)} €
            </Text>
            {item.product.discount && (
              <Text style={styles.oldPrice}>{item.product.price} €</Text>
            )}
          </View>
        </View>
        <View style={StyleSheet.btnContainer}>
          <Button
            mode="contained"
            color={colors.primary}
            onPress={() => goToProduct(item.product._id)}
          >
            Ver producto
          </Button>
          <IconButton
            icon="close"
            color="#fff"
            size={16}
            style={styles.btnDelete}
            onPress={() => deleteFavorite(item.product._id)}
          ></IconButton>
        </View>
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#dadde1",
  },
  containerImage: {
    width: "40%",
    height: 200,
    backgroundColor: "#ebebeb",
    padding: 5,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    width: "60%",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 22,
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },
  btnDelete: {
    backgroundColor: "red",
    borderRadius: 5,
    margin: 0,
    width: 60,
    height: 32,
  },
  loading: {
    backgroundColor: "#000",
    opacity: 0.4,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
  },
});
