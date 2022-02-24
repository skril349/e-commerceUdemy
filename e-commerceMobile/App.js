import { StyleSheet, Text, View } from "react-native";
import react, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AuthScreen from "./src/screens/Auth";
export default function App() {
  const [auth, setAuth] = useState(undefined);
  return (
    <PaperProvider>
      {auth ? <Text>Logueados</Text> : <AuthScreen />}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
