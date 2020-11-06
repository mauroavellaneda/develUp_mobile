import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import AssignmentCard from "./AssignmentCard";
import Assignments from "../modules/assignments";
import { Button, Container, Text } from "native-base";

import { useSelector } from "react-redux";

const AssignmentsIndex = ({ navigation }) => {
  const authenticated = useSelector((state) => state.authenticated);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignmentsIndex = async () => {
      const response = await Assignments.index();
      setAssignments(response);
    };
    getAssignmentsIndex();
  }, []);

  let redirect;
  if (authenticated) {
    redirect = "assignmentForm";
  } else {
    redirect = "clientSignUp";
  }

  return (
    <Container style={styles.container}>
      <Button onPress={() => navigation.navigate(redirect)}>
        <Text>
          {authenticated
            ? "Publish Assignments"
            : "Publish Assignments for free!"}
        </Text>
      </Button>
      <FlatList
        testID="scroll"
        data={assignments}
        keyExtractor={(assignment) => assignment.id.toString()}
        renderItem={({ item }) => {
          return <AssignmentCard assignment={item} />;
        }}
      />
    </Container>
  );
};

export default AssignmentsIndex;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#344955",
  },
});
