import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { map } from "lodash";
import Product from "./Product";
export default function FavoriteList(props) {
  const { favorites, setReloadFavorites } = props;
  return (
    <ScrollView style={styles.container}>
      <View>
        {map(favorites, (item) => (
          <Product
            key={item._id}
            item={item}
            setReloadFavorites={setReloadFavorites}
          />
          //   <Text>{item._id}</Text>
        ))}
      </View>
    </ScrollView>
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
