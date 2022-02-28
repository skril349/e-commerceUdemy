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

export default function ChangeUsername() {
  const { auth } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        response.username &&
          (await formik.setFieldValue("username", response.username));
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
        label="Nombre de Usuario"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />

      <Button
        mode="contained"
        style={formStyles.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar username
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
    username: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required(true),
  };
}
