import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../styles/colors";
import { getSearchHistoryApi } from "../../api/search";
import { map } from "lodash";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-paper";

export default function SearchHistory(props) {
  const { showHistory, containerHeight, onSearch } = props;
  const [history, setHistory] = useState(null);
  useEffect(() => {
    if (showHistory) {
      (async () => {
        const response = await getSearchHistoryApi();
        setHistory(response);
      })();
    }
  }, [showHistory]);
  const debugging = (item) => {
    console.log(item);
  };

  return (
    <View
      style={[
        showHistory ? styles.history : styles.hidden,
        { top: containerHeight },
      ]}
    >
      {history &&
        map(history, (item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              onSearch(item.search);
            }}
          >
            <View style={styles.historyItem}>
              <Text style={styles.text}>{item.search}</Text>
              <AwesomeIcon name="arrow-right" size={16} />
            </View>
          </TouchableWithoutFeedback>
        ))}

      {/* {map(products, (product) => (
        <TouchableWithoutFeedback
          key={product._id}
          onPress={() => goToProduct(product._id)}
        >
          <Text>{product.title}</Text>
        </TouchableWithoutFeedback>
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  history: {
    position: "absolute",
    backgroundColor: colors.bgLight,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  historyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#53005f",
    fontSize: 16,
    fontWeight: "bold",
  },
});
