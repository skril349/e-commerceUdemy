import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Acount from "../screens/Account/Acount";
import ChangeName from "../screens/Account/ChangeName";
import ChangeEmail from "../screens/Account/ChangeEmail";
import ChangeUsername from "../screens/Account/ChangeUsername";
import colors from "../styles/colors";
import ChangePassword from "../screens/Account/ChangePassword";
const Stack = createStackNavigator();
export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: {
          backgroundColor: colors.bgDark,
        },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="account"
        component={Acount}
        options={{
          title: "Cuenta",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{
          title: "Cambiar nombre y apellidos",
        }}
      />

      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{
          title: "Cambiar el email",
        }}
      />

      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{
          title: "Cambiar el nombre de usuario",
        }}
      />

      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{
          title: "Cambiar la contraseña",
        }}
      />
    </Stack.Navigator>
  );
}
