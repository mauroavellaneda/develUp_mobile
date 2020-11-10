import React from "react";
import { Button, Text } from "react-native";
import { useSelector } from "react-redux";

const HeaderButtons = (props) => {
  const currentUser = useSelector((state) => state.currentUser);
  const authenticated = useSelector((state) => state.authenticated);

  return (
    <Text>
      {!authenticated && (
        <Button
          onPress={() => props.navigation.navigate("login")}
          title="Login"
          testID="loginButton"
        ></Button>
      )}
      {currentUser.role === "client" && (
        <Button
          title="My Page"
          onPress={() => props.navigation.navigate("clientPage")}
        ></Button>
      )}
      {currentUser.role === "develuper" && (
        <Button
          testID="develuperMyPageButton"
          title="My Page"
          onPress={() => {
            props.navigation.navigate("develuperPage", {
              userId: currentUser.id,
            });
          }}
        ></Button>
      )}
    </Text>
  );
};
export default HeaderButtons;
