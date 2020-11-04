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
            value: props.value,
          })
        }
      />
    </>
  );
};
export default Checkbox;
