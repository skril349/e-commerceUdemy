import { View, Text, StyleSheet } from "react-native";
import React from "react";
import StatusBarCustom from "../components/StatusBarCustom";
import colors from "../styles/colors";
import Search from "../components/Search/Search";

export default function Favorites() {
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        bartStyle="light-content"
      />
      <Search />
      <View style={styles.container}>
        <Text>Estamos en la Favorites</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
