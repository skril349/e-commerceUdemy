import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { formStyles, layoutStyle } from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ref } from "yup";
import { registerApi } from "../../api/user";
import Toast from "react-native-root-toast";

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await registerApi(formData);
        changeForm();
      } catch (error) {
        setLoading(false);

        Toast.show("Error al registrar el usuario", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Email"
        style={formStyles.input}
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        error={formik.errors.email}
      ></TextInput>
      <TextInput
        label="Nombre de usuario"
        style={formStyles.input}
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        error={formik.errors.username}
      ></TextInput>
      <TextInput
        label="Contraseña"
        style={formStyles.input}
        value={formik.values.password}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("password", text)}
        error={formik.errors.password}
      ></TextInput>
      <TextInput
        label="Repetir Contraseña"
        style={formStyles.input}
        value={formik.values.repPassword}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("repPassword", text)}
        error={formik.errors.repPassword}
      ></TextInput>
      <Button
        mode="text"
        style={formStyles.btnText}
        labelStyle={formStyles.btnTextLabel}
        onPress={changeForm}
      >
        Iniciar Sesion
      </Button>

      <Button
        mode="contained"
        style={formStyles.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Registrarse
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repPassword: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    repPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
