import React from "react";
import { StyleSheet } from "react-native";
import { Card, CardItem, Text, Icon, Left, Body, Badge } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

const AssignmentCard = ({ navigation, assignment }) => {
  return (
    <TouchableOpacity
      key={assignment.id}
      onPress={() => {
        navigation.navigate("singleAssignment", {
          assignmentId: assignment.id,
        });
      }}
    >
      <Card testID={"assignment-" + assignment.id}>
        <CardItem header bordered>
          <Left>
            <Icon name="laptop" />
            <Body>
              <Text testID={"title-" + assignment.id}>{assignment.title}</Text>
              <Text testID={"title-" + assignment.id}>{assignment.id}</Text>
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
          <Body>
            <Text
              testID={"skills-" + assignment.id}
              note
              style={styles.cardSkills}
            >
              Skills: {assignment.skills.map((word) => word).join(" ")}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default AssignmentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4A6572",
  },
  cardSkills: {
    color: "#ffff",
  },
});
