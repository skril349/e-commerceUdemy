import { ScrollView, Text, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";
import Search from "../../components/Search";
import StatusBarCustom from "../../components/StatusBarCustom";
import colors from "../../styles/colors";
import { getMeApi } from "../../api/user";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import ScreenLoading from "../../components/ScreenLoading";
import UserInfo from "../../components/Account/UserInfo";
import Menu from "../../components/Account/Menu";

export default function Acount() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        setUser(response);
      })();
    }, [])
  );

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      {!user ? (
        <ScreenLoading size="large" text="Cargando" />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user} />
            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
}
