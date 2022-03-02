import { Dimensions, Image, StyleSheet } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { render } from "react-dom";
import { API_URL } from "../../utils/constants";

const width = Dimensions.get("window").width;
const height = 500;
export default function CarouselImage(props) {
  const { images } = props;
  console.log(images);
  const renderItem = ({ item }) => {
    return (
      <Image
        style={styles.Carousel}
        source={{ uri: `${API_URL}${item.url}` }}
      />
    );
  };
  return (
    <>
      <Carousel
        layout={"default"}
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  Carousel: {
    width,
    height,
    resizeMode: "contain",
  },
});
