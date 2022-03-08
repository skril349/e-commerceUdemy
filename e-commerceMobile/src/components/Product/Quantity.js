import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
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
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 100,
  },
  itemStyle: {
    justifyContent: "flex-start",
  },
  dropDownStyle: {
    backgroundColor: "#fafafa",
  },
  dropDownPicker: {
    backgroundColor: "#fafafa",
  },
  labelStyle: {
    color: "#000",
  },
});
