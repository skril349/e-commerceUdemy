import { Dimensions, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { render } from "react-dom";
import { API_URL } from "../../utils/constants";
import { size } from "lodash";
const width = Dimensions.get("window").width;
const height = 200;
export default function CarouselImage(props) {
  const { images } = props;
  //console.log(images);
  const [imageActive, setImageActive] = useState(0);
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
        onSnapToItem={(index) => setImageActive(index)}
      />
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={imageActive}
        inactiveDotStyle={0.4}
        inactiveDotScale={0.6}
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
