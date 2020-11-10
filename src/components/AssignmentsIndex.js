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
  // const role = useSelector((state) => state.currentUser.role);

  const getAssignmentsIndex = async () => {
    const response = await Assignments.index();
    setAssignments(response);
  };
  useEffect(() => {
    getAssignmentsIndex();
  }, []);

  return (
    <Container style={styles.container}>
      <Text>{message && <Text>{message}</Text>}</Text>
      {!authenticated && (
        <Button
          full
          testID="navigationButton"
          onPress={() => navigation.navigate("clientSignUp")}
        >
          <Text >Publish Assignments for free!</Text>
        </Button>
      )}
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
