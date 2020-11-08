import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import AssignmentCard from "./AssignmentCard";
import Assignments from "../modules/assignments";
import { Button, Container, Text } from "native-base";
import { useSelector } from "react-redux";

const AssignmentsIndex = ({ navigation }) => {
  const authenticated = useSelector((state) => state.authenticated);
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");
  const role = useSelector((state) => state.currentUser.role);

  useEffect(() => {
    const getAssignmentsIndex = async () => {
      const response = await Assignments.index();
      setAssignments(response);
    };
    getAssignmentsIndex();
  }, []);

  let redirect;
  if (role === "client") {
    redirect = "assignmentForm";
  } else if (role === "develuper") {
    redirect = "develUp";
  } else {
    redirect = "clientSignUp";
  }

  return (
    <Container style={styles.container}>
      <Text>{message && <Text>{message}</Text>}</Text>
      <Button
        testID="navigationButton"
        onPress={() => navigation.navigate(redirect)}
      >
        <Text>
          {authenticated && role === "client"
            ? "Publish Assignments"
            : role === "develuper"
            ? "Profile page"
            : "Publish Assignments for free!"}
        </Text>
      </Button>
      <FlatList
        testID="scroll"
        data={assignments}
        keyExtractor={(assignment) => assignment.id.toString()}
        renderItem={({ item }) => {
          return <AssignmentCard navigation={navigation} assignment={item} />;
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
