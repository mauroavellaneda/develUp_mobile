import React from "react";
import { CheckBox } from "native-base";
import { StyleSheet } from "react-native";
const Checkbox = (props) => {
  return (
    <>
      <CheckBox style={styles.checkbox} checked={props.isChecked} />
    </>
  );
};
export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    margin: 20,
  },
});
