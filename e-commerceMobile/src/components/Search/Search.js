import { View, Text, StyleSheet, Keyboard, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import colors from "../../styles/colors";
import {
  AnimatedIcon,
  inputAnimation,
  inputAnimationWidth,
  animatedTransition,
  animatedTransitionReset,
  arrowAnimation,
} from "./SearchAnimation";
import { useNavigation, useRoute } from "@react-navigation/native";
import SearchHistory from "./SearchHistory";
import { updateSearchHistoryApi } from "../../api/search";

export default function Search(props) {
  const { currentSearch } = props;
  const route = useRoute();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(currentSearch || "");
  const [showHistory, setShowHistory] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const openSearch = () => {
    animatedTransition.start();
    setShowHistory(!showHistory);
  };
  const closeSearch = () => {
    animatedTransitionReset.start();
    Keyboard.dismiss();
    setShowHistory(!showHistory);
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onSearch = async (reuseSearch) => {
    closeSearch();
    const isReuse = typeof reuseSearch === "string";
    !isReuse && (await updateSearchHistoryApi(searchQuery));
    // setShowHistory(false);

    if (route.name === "search") {
      navigation.push("search", {
        search: isReuse ? reuseSearch : searchQuery,
      });
    } else {
      navigation.navigate("search", {
        search: isReuse ? reuseSearch : searchQuery,
      });
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="arrow-left"
          size={20}
          style={[styles.backArrow, arrowAnimation]}
          onPress={closeSearch}
        />
        <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
          <Searchbar
            placeholder="busca tu producto"
            onFocus={openSearch}
            value={searchQuery}
            onChangeText={onChangeSearch}
            onSubmitEditing={onSearch}
          />
        </Animated.View>
      </View>
      <SearchHistory
        showHistory={showHistory}
        containerHeight={containerHeight}
        onSearch={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgDark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  containerInput: {
    position: "relative",
    alignItems: "flex-end",
  },
  backArrow: {
    position: "absolute",
    left: 0,
    top: 15,
    color: colors.fontLight,
  },
});
