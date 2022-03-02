import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getProductApi } from "../../api/product";
import StatusBarCustom from "../../components/StatusBarCustom";
import Search from "../../components/Search";
import colors from "../../styles/colors";
import ScreenLoading from "../../components/ScreenLoading";
import CarouselImage from "../../components/Product/CarouselImage";

export default function Product(props) {
  const { route } = props;
  const { params } = route;
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getProductApi(params.idProduct);
      await setProduct(response);
      const arrayImages = [response.main_image];
      arrayImages.push(...response.images);
      setImage(arrayImages);
      //   console.log("productImages:", product.images);
    })();
  }, [params]);

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barstyle="light-content"
      />
      <Search />
      {!product ? (
        <ScreenLoading text="cargando producto" size="large" />
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{product.title}</Text>
          <CarouselImage images={image} />
          <View style={styles.containerView}>
            <Text>BTN</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    paddingBottom: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
  },
});
