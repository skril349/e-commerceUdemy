import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import StatusBarCustom from "../components/StatusBarCustom";
import colors from "../styles/colors";
import Search from "../components/Search/Search";
import { getFavoritesApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { map, size } from "lodash";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLoading from "../components/ScreenLoading";
import FavoriteList from "../components/favorites/FavoriteList";

export default function Favorites() {
  const { auth } = useAuth();
  const [favorites, setFavorites] = useState(null);
  const [reloadFavorites, setReloadFavorites] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFavorites(null);
      (async () => {
        const response = await getFavoritesApi(auth);
        setFavorites(response);
      })();
      setReloadFavorites(false);
    }, [reloadFavorites])
  );

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        bartStyle="light-content"
      />
      <Search />
      {!favorites ? (
        <ScreenLoading text="cargando lista" />
      ) : size(favorites) == 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Lista de Favoritos</Text>
          <Text>No tienes productos en tu lista</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Lista de Favoritos</Text>
          <FavoriteList
            favorites={favorites}
            setReloadFavorites={setReloadFavorites}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});
