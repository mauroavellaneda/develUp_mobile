import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, CardItem, Text, Icon, Left, Body, Badge } from "native-base";
import Assignments from "../modules/assignments";

const SingleAssignment = ({ route, navigation }) => {
  const [assignment, setAssignment] = useState({});

  useEffect(() => {
    const getSingleAssignment = async () => {
      const response = await Assignments.show(route.params.assignmentId);
      if (response.id) {
        setAssignment(response);
      } else {
        setMessage(response);
      }
    };
    getSingleAssignment();
  }, [route]);

  return (
    <Card testID={"assignment-" + assignment.id}>
      <CardItem header bordered>
        <Left>
          <Icon name="laptop" />
          <Body>
            <Text testID={"title-" + assignment.id}>{assignment.title}</Text>
            <Text note testID={"budget-" + assignment.id}>
              $ {assignment.budget}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem footer bordered style={styles.container}>
        <Left testID={"points-" + assignment.id}>
          <Text note style={styles.container2}>
            Points:
          </Text>
          <Badge primary>
            <Text>{assignment.points}</Text>
          </Badge>
        </Left>
        {/*  <Body>
          <Text
            testID={"skills-" + assignment.id}
            note
            style={styles.cardSkills}
          >
            Skills: {assignment.skills.map((word) => word).join(" ")}
          </Text>
        </Body> */}
      </CardItem>
    </Card>
  );
};

export default SingleAssignment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4A6572",
  },
  cardSkills: {
    color: "#ffff",
  },
});
