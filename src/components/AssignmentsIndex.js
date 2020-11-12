import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import AssignmentCard from "./AssignmentCard";
import Assignments from "../modules/assignments";
import { Button, Container, Text, View} from "native-base";
import { useSelector } from "react-redux";

const AssignmentsIndex = ({ navigation }) => {
  const authenticated = useSelector((state) => state.authenticated);
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState("");

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
<View>
<Button
          full
          testID="navigationButton"
          onPress={() => navigation.navigate("develuperSignup")}
        >
          <Text>I want to become a devulUper!</Text>
        </Button>
<Button
          full
          testID="navigationButton"
          onPress={() => navigation.navigate("clientSignUp")}
        >
          <Text>Publish Assignments for free!</Text>
        </Button>
</View>

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
