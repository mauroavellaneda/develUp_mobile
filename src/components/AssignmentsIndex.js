import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import AssignmentCard from "./AssignmentCard";
import Assignments from "../modules/assignments";
import { Container } from "native-base";

const AssignmentsIndex = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignmentsIndex = async () => {
      const response = await Assignments.index();
      setAssignments(response);
    };
    getAssignmentsIndex();
  }, []);

  return (
    <Container style={styles.container}>
      <View>
        <FlatList
          testID="scroll"
          data={assignments}
          keyExtractor={(assignment) => assignment.id.toString()}
          renderItem={({ item }) => {
            return <AssignmentCard assignment={item} />;
          }}
        />
      </View>
    </Container>
  );
};

export default AssignmentsIndex;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#344955",
  },
});
