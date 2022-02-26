import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Acount from "../screens/Acount";
const Stack = createStackNavigator();
export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Acount}
        options={{
          title: "Cuenta",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
