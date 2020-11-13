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
          title="My Page"
          testID="develuperMyPageButton"
          onPress={() => {
            props.navigation.navigate("develuperPage", {
              userId: currentUser.id,
            });
          }}
        ></Button>
      )}
      {currentUser.role === "registered" && (
        <Button
          title="Subscribe"
          testID="develuperMyPageButton"
          onPress={() => {
            props.navigation.navigate("develuperSubscription", {
              userId: currentUser.id,
            });
          }}
        ></Button>
      )}
    </Text>
  );
};
export default HeaderButtons;
