import React from "react";
import { View, Button } from "react-native";
import { useSelector } from "react-redux";

const HeaderButtons = (props) => {
  const authenticated = useSelector((state) => state.authenticated);

  return (
    <View >
      {!authenticated && (
        <Button
          onPress={() => props.navigation.navigate("login")}
          title="Login"
          testID="loginButton"
        >
        </Button>
      )}
    </View>
  );
};
export default HeaderButtons;

