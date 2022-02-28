import { View, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { TextInput, Button } from "react-native-paper";
import { formStyles } from "../../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMeApi, loginApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";

export default function ChangeName() {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        response.name && (await formik.setFieldValue("name", response.name));
        response.lastname &&
          (await formik.setFieldValue("lastname", response.lastname));
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
        label="Nombre"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Apellidos"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        value={formik.values.lastname}
        error={formik.errors.lastname}
      />
      <Button
        mode="contained"
        style={formStyles.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar nombre y apellidos
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
    name: "",
    lastname: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}
