import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import StatusBarCustom from "../../components/StatusBarCustom";
import Search from "../../components/Search";
import colors from "../../styles/colors";
import NewProducts from "../../components/Home/NewProducts";

export default function HomeScreen() {
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search />
      <ScrollView>
        <NewProducts />
      </ScrollView>
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
