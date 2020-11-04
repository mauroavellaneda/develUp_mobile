import React from "react";
import { CheckBox, Body, Text } from "native-base";

const Checkbox = (props) => {
  return (
    <>
      <CheckBox
        checked={props.isChecked}
        onPress={() =>
          props.handleCheckboxElement({
            checked: !props.isChecked,
            name: props.name,
          })
        }
      />
    </>
  );
};
export default Checkbox;
