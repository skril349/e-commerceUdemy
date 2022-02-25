import { StyleSheet, Text, View, Button } from "react-native";
import react, { useState, useEffect, useMemo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token";
import jwtDecode from "jwt-decode";
export default function App() {
  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    console.log("login APP:JS");
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
  };

  const logout = () => {
    if (auth) {
      setAuth(null);
      removeTokenApi();
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>LOGIEAOS</Text>
            <Button title="cerrar sesion " onPress={authData.logout} />
          </View>
        ) : (
          <AuthScreen />
        )}
      </PaperProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});
