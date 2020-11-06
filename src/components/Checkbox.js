import React from "react";
import { CheckBox } from "native-base";
import { StyleSheet } from "react-native";
const Checkbox = (props) => {
  return (
    <>
      <CheckBox
        style={styles.checkbox}
        testID="boom bom bom bom"
        checked={props.isChecked}
        // onPress={() =>
        //   props.handleCheckboxElement({
        //     checked: !props.isChecked,
        //     name: props.name,
        //   })
        // }
      />
    </>
  );
};
export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    margin: 20,
  },
});
