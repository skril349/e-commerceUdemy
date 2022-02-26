import { ScrollView, Text, StyleSheet } from "react-native";
import React from "react";
import Search from "../components/Search";
import StatusBarCustom from "../components/StatusBarCustom";
import colors from "../styles/colors";
export default function Acount() {
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      <Search />

      <ScrollView>
        <Text>Estamos en la Acount</Text>
      </ScrollView>
    </>
  );
}
