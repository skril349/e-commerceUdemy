import { View, Text } from "react-native";
import * as React from "react";
import { TextInput, Button } from "react-native-paper";
import { formStyles, layoutStyle } from "../../styles";
export default function RegisterForm() {
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repPassword, setRepPassword] = React.useState("");

  return (
    <View>
      <TextInput
        label="Email"
        style={formStyles.input}
        value={email}
        onChangeText={(email) => setEmail(email)}
      ></TextInput>
      <TextInput
        label="Nombre de usuario"
        style={formStyles.input}
        value={userName}
        onChangeText={(userName) => setUserName(userName)}
      ></TextInput>
      <TextInput
        label="Contraseña"
        style={formStyles.input}
        value={password}
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
      ></TextInput>
      <TextInput
        label="Repetir Contraseña"
        style={formStyles.input}
        value={repPassword}
        secureTextEntry
        onChangeText={(repPassword) => setRepPassword(repPassword)}
      ></TextInput>

      <Button mode="contained" style={formStyles.btnSuccess}>
        Registrarse
      </Button>

      <Button
        mode="text"
        style={formStyles.btnText}
        labelStyle={formStyles.btnTextLabel}
      >
        Iniciar Sesion
      </Button>
    </View>
  );
}
