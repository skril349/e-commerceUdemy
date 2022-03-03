import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function Quantity(props) {
  const { quantity, setQuantity } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
  ]);
  return (
    <View style={{ zIndex: 2 }}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        style={styles.containerStyle}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        defaultValue={quantity}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownPicker}
        labelStyle={styles.labelStyle}
        onSelectItem={(item) => setQuantity(item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerStyle: {
    height: 40,
    width: 100,
  },
  itemStyle: {
    justifyContent: "flex-start",
  },
  dropDownPicker: {
    backgroundColor: "#fafafa",
  },
  labelStyle: {
    color: "#000",
  },
});
