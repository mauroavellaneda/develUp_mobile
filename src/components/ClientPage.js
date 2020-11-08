import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Item } from "native-base";

const ClientPage = (props) => {
  return (
    <View>
      <Text testID="welcomeMessage" style={styles.clientSignUpMessage}>
        {props.route.params.message}
      </Text>
      <Item>
        <Text
          testID="successfullyCreatedMessage"
          style={styles.assignmentCreateMessage}
        >
          {props.route.params.assignmentCreateMessage}
        </Text>
      </Item>
      <Button
        testID="createAssignmentButton"
        onPress={() => props.navigation.navigate("assignmentForm")}
        style={styles.createButton}
      >
        <Text>Create Assignment</Text>
      </Button>
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
