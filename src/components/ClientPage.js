import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Item } from "native-base";
import { useSelector } from "react-redux";

const ClientPage = (props) => {
  const [message, setMessage] = useState();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    const messageSetter = () => {
      if (props.route.params !== undefined) {
        setMessage(props.route.params.assignmentCreateMessage);
      }
    };
    messageSetter();
  }, [props]);

  return (
    <View>
      {currentUser.id && <Text testID="welcomeMessage">{currentUser.uid}</Text>}
      {message && (
        <Text
          testID="successfullyCreatedMessage"
          style={styles.assignmentCreateMessage}
        >
          {message}
        </Text>
      )}
      <Item>
        <Button
          testID="createAssignmentButton"
          onPress={() => props.navigation.navigate("develUp")}
          style={styles.createButton}
          light
        >
          <Text>Home Page</Text>
        </Button>

        <Button
          testID="createAssignmentButton"
          onPress={() => props.navigation.navigate("assignmentForm")}
          style={styles.createButton}
        >
          <Text>Create Assignment</Text>
        </Button>
      </Item>
    </View>
  );
};

export default ClientPage;

const styles = StyleSheet.create({
  assignmentCreateMessage: {
    margin: 5,
    color: "green",
    fontSize: 20,
    margin: 10,
  },
  clientSignUpMessage: {
    fontSize: 15,
  },
  createButton: {
    margin: 15,
    padding: 10,
  },
});
