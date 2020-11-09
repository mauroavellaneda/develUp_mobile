import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Icon,
  Left,
  Body,
  Badge,
  Button,
} from "native-base";
import Assignments from "../modules/assignments";
import { useSelector } from "react-redux";

const SingleAssignment = ({ route, navigation }) => {
  const [assignment, setAssignment] = useState({});
  const authenticated = useSelector((state) => state.authenticated);
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const getSingleAssignment = async () => {
      const response = await Assignments.show(
        route.params.assignmentId,
        authenticated
      );
      if (response.id) {
        setAssignment(response);
      } else {
        setMessage(response);
      }
    };
    getSingleAssignment();
  }, [route]);

  useEffect(() => {
    const appliedChecker = async () => {
      if (assignment.applicants.includes(currentUser.id)) {
        setApplied(true);
      }
    };
    appliedChecker();
  }, [assignment]);

  const applyHandler = async () => {
    let response = await Assignments.apply(
      route.params.assignmentId,
      currentUser.id
    );
    if (response.message) {
      setApplied(true);
    } else {
      setMessage(response);
    }
  };

  return (
    <>
      <Card>
        <CardItem header bordered style={styles.titleCard}>
          <Left>
            <Icon name="laptop" />
            <Body>
              <Text testID="title" style={styles.title}>
                {assignment.title}
              </Text>
              <Text testID="budget" style={styles.budget} note>
                $ {assignment.budget}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={styles.descriptionCard}>
          <Body>
            <Text testID="description" style={styles.description}>
              {assignment.description}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer bordered style={styles.container}>
          <Left testID="points">
            <Text note style={styles.container2}>
              Points:
            </Text>
            <Badge primary>
              <Text>{assignment.points}</Text>
            </Badge>
          </Left>
          <Body>
            <Text testID="skills" note style={styles.cardSkills}>
              Skills: {assignment.skills}
            </Text>
          </Body>
        </CardItem>
      </Card>
      {authenticated && !applied && (
        <Button testID="applyButton" block onPress={() => applyHandler()}>
          <Text>Apply now!</Text>
        </Button>
      )}
      {authenticated && applied && (
        <Button
          success
          testID="successfullyAppliedMessage"
          block
          onPress={() => navigation.navigate("develUp")}
        >
          <Text>You have Applied! Keep Browsing</Text>
        </Button>
      )}
      <Text>
        {message && (
          <Button
            style={styles.fullWidth}
            full
            danger
            onPress={() => navigation.navigate("develUp")}
          >
            <Text> {message} </Text>
          </Button>
        )}
      </Text>
    </>
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
  fullWidth: {
    width: Dimensions.get("window").width,
  },
});
