import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../api/favorite";
import useAuth from "../../hooks/useAuth";
import { size } from "lodash";
import { setDisabled } from "react-native/Libraries/LogBox/Data/LogBoxData";

export default function Favorite(props) {
  const { product } = props;
  const { auth } = useAuth();
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      console.log(auth);
      console.log(product._id);
      const response = await isFavoriteApi(auth, product._id);
      size(response) == 0 ? setIsFavorite(false) : setIsFavorite(true);
      console.log(response);
    })();
  }, [product]);

  const addFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await addFavoriteApi(auth, product._id);
        setIsFavorite(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    // console.log("añadiendo a favoritos");
    // console.log(product.title);
  };

  const deleteFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await deleteFavoriteApi(auth, product._id);
        setIsFavorite(false);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (isFavorite == undefined) return null;

  return (
    <View style={{ zIndex: 1 }}>
      <Button
        mode="contained"
        contentStyle={
          !isFavorite
            ? styles.btnAddFavoritesContent
            : styles.btnDelFavoritesContent
        }
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={() => (isFavorite ? deleteFavorite() : addFavorite())}
        loading={loading}
      >
        {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnLabel: {},
  btnAddFavoritesContent: {
    backgroundColor: "#057b00",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
  },
  btnDelFavoritesContent: {
    backgroundColor: "red",
    paddingVertical: 5,
  },
});
