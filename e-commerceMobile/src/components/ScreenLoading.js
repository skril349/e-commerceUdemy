import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React from "react";

export default function ScreenLoading(props) {
  const { size, color, text } = props;
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={size} color={color} style={styles.loading} />
      <Text style={styles.title}>{text}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});

ScreenLoading.defaultProps = {
  text: "cargando...",
  color: "#000",
};
