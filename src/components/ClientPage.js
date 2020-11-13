import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Assignments from "../modules/assignments";
import { Button, Item, Icon } from "native-base";
import { useSelector } from "react-redux";
import AssignmentCard from "./AssignmentCard";

const ClientPage = (props) => {
  const [message, setMessage] = useState();
  const currentUser = useSelector((state) => state.currentUser);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const messageSetter = () => {
      if (props.route.params !== undefined) {
        setMessage(props.route.params.assignmentCreateMessage);
      }
    };
    messageSetter();
  }, [props]);

  const getAssignmentsIndex = async () => {
    const response = await Assignments.clientIndex(currentUser.id);
    setAssignments(response);
  };
  useEffect(() => {
    getAssignmentsIndex();
  }, []);

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
          icon
          onPress={() => props.navigation.navigate("develUp")}
          style={styles.createButton}
          info
        >
          <Icon name="home" />
        </Button>

        <Button
          icon
          testID="createAssignmentButton"
          onPress={() => props.navigation.navigate("assignmentForm")}
          style={styles.createButton}
        >
          <Icon name="folder" />
          <Text>Create Assignment</Text>
        </Button>
      </Item>
      <FlatList
        testID="scroll"
        data={assignments}
        keyExtractor={(assignment) => assignment.id.toString()}
        renderItem={({ item }) => {
          return (
            <AssignmentCard navigation={props.navigation} assignment={item} />
          );
        }}
      />
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
