import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import AssignmentCard from "./AssignmentCard";
import Assignments from "../modules/assignments";
import { Button, Container, Text } from "native-base";

const AssignmentsIndex = ({ navigation }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => { debugger
    const getAssignmentsIndex = async () => {
      const response = await Assignments.index();
      setAssignments(response);
    };
    getAssignmentsIndex();
    debugger
  }, []);

  return (
    <Container style={styles.container}>
      <Button onPress={() => navigation.navigate("clientSignUp")}>
        <Text>I want to publish Assignments for free!</Text>
      </Button>
      <FlatList
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
