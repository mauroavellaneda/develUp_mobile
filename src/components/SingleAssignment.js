import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card, CardItem, Text, Icon, Left, Body, Badge } from "native-base";
import Assignments from "../modules/assignments";

const SingleAssignment = ({ route }) => {
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
      <CardItem header bordered style={styles.titleCard}>
        <Left>
          <Icon name="laptop" />
          <Body>
            <Text style={styles.title} testID={"title-" + assignment.id}>
              {assignment.title}{" "}
            </Text>
            <Text style={styles.budget} note testID={"budget-" + assignment.id}>
              $ {assignment.budget}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem style={styles.descriptionCard}>
        <Body>
          <Text style={styles.description}>{assignment.description}</Text>
        </Body>
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
        <Body>
          <Text
            testID={"skills-" + assignment.id}
            note
            style={styles.cardSkills}
          >
            Skills: {assignment.skills}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default SingleAssignment;

const styles = StyleSheet.create({
  titleCard: {
    backgroundColor: "#4A6572",
  },
  container: {
    backgroundColor: "#4A6572",
  },
  cardSkills: {
    color: "#ffff",
  },
  title: {
    fontSize: 30,
  },
  budget: {
    fontSize: 20,
    color: "#0a0d10",
  },
  description: {
    fontSize: 22,
  },
  descriptionCard: {
    backgroundColor: "#d0dce2",
  },
});
