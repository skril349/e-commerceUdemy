import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import React, { useState, useEffect } from "react";
import { getBannerApi } from "../../api/banner";
import { API_URL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = 150;

export default function Banner() {
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getBannerApi();
      await setBanners(response);
    })();
  }, []);

  const [imageActive, setImageActive] = useState(0);
  if (!banners) return null;
  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => goToProduct(item.product._id)}>
        <Image
          style={styles.Carousel}
          source={{ uri: `${API_URL}${item.banner.url}` }}
        />
      </TouchableWithoutFeedback>
    );
  };

  const goToProduct = (id) => {
    navigation.push("product", { idProduct: id });
  };

  return (
    <View>
      <Carousel
        layout={"default"}
        data={banners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setImageActive(index)}
      />
      <Pagination
        dotsLength={size(banners)}
        activeDotIndex={imageActive}
        inactiveDotStyle={0.6}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Carousel: {
    width,
    height,
    resizeMode: "contain",
  },
  dotsContainer: {
    position: "absolute",
    bottom: -10,
    width: "100%",
  },
  dot: {
    backgroundColor: "#fff",
  },
});
