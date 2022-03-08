import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import StatusBarCustom from "../components/StatusBarCustom";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../styles/colors";
import { getProductCartApi } from "../api/cart";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLoading from "../components/ScreenLoading";
import { size } from "lodash";
import NotProducts from "../components/Cart/NotProducts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProductList from "../components/Cart/ProductList";
import { getAddressesApi } from "../api/address";
import useAuth from "../hooks/useAuth";
import AddressList from "../components/Cart/AddressList";
import Payment from "../components/Cart/Payment";

export default function Cart() {
  const { auth } = useAuth();
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  useFocusEffect(
    useCallback(() => {
      setCart(null);
      setAddresses(null);
      setSelectedAddress(null);

      loadCart();
      loadAddresses();
    }, [])
  );

  useEffect(() => {
    reloadCart && loadCart();
    setReloadCart(false);
  }, [reloadCart]);

  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  const loadAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response);
  };
  return (
    <>
      <StatusBarCustom
        backgroundColor={Colors.bgDark}
        barStyle="light-content"
      />
      {!cart && size(cart) === 0 ? (
        <NotProducts />
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
            <ProductList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReloadCart={setReloadCart}
              setTotalPayment={setTotalPayment}
            />
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <Payment
              selectedAddress={selectedAddress}
              products={products}
              totalPayment={totalPayment}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cartContainer: {
    padding: 10,
  },
});
