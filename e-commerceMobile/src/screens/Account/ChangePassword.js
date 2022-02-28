import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextInput, Button } from "react-native-paper";
import { formStyles } from "../../styles";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-root-toast";
import { getMeApi, loginApi, updateUserApi } from "../../api/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function ChangePassword() {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        response.password &&
          (await formik.setFieldValue("password", response.password));
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await updateUserApi(auth, formData);
        navigation.goBack();
      } catch (error) {
        Toast.show("Error al actualizar los datios", {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        label="Contraseña"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
      />
      <TextInput
        label="Repetir contraseña"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
        secureTextEntry
      />

      <Button
        mode="contained"
        style={formStyles.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().min(4, true).required(true),
    repeatPassword: Yup.string()
      .min(4, true)
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
