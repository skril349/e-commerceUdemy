import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Nuestro e-commerce</Text>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
