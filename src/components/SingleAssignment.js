import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, FlatList } from "react-native";
import Assignments from "../modules/assignments";
import { useSelector } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Card,
  CardItem,
  Text,
  Icon,
  Left,
  Body,
  Badge,
  Button,
  Container,
} from "native-base";

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
      try {
        if (assignment.applicants.includes(currentUser.id)) {
          setApplied(true);
        }
      } catch (error) {
        console.log(error);
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

  const closeAssignmentHandler = async () => {
    debugger;
    let response = await Assignments.closeAssignment(route.params.assignmentId);
    if (response.message) {
      setSelected(true);
    }
  };

  return (
    <>
      {authenticated && (
        <Card testID="cardContainer">
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
      )}
      {currentUser.role === "client" && (
        <Card>
          <CardItem footer bordered style={styles.container}>
            <Left testID="points">
              <Text note style={styles.container2}>
                Status:
              </Text>
              <Badge primary>
                <Text>{assignment.status}</Text>
              </Badge>
            </Left>
          </CardItem>
        </Card>
      )}
      {currentUser.role === "client" && assignment.status === "ongoing" && (
        <>
          <Card>
            <Container style={styles.develupersContainer}>
              <Grid style={styles.grid}>
                <Button
                  bordered
                  info
                  style={styles.develupersButtons}
                  onPress={() => {
                    navigation.navigate("develuperPage", {
                      userId: assignment.selected,
                      assignmentTitle: assignment.title,
                      assignmentId: assignment.id,
                      selected: true,
                    });
                  }}
                >
                  <Icon info name="person" />
                  <Text info>View develuper</Text>
                </Button>
                <Button
                  bordered
                  info
                  style={styles.develupersButtons}
                  onPress={() => {
                    closeAssignmentHandler();
                  }}
                >
                  <Icon info name="checkbox" />
                  <Text info>Close Assignment</Text>
                </Button>
              </Grid>
            </Container>
          </Card>
        </>
      )}
      {currentUser.role === "client" && assignment.status === "published" && (
        <>
          <Text style={styles.text}>
            DevelUpers that would like to work in your project:
          </Text>

          <Container style={styles.develupersContainer}>
            <FlatList
              numColumns={2}
              data={assignment.applicants}
              keyExtractor={(applicant) => applicant.toString()}
              renderItem={({ item }) => {
                return (
                  <Button
                    style={styles.develupersButtons}
                    bordered
                    info
                    onPress={() => {
                      navigation.navigate("develuperPage", {
                        userId: item,
                        assignmentTitle: assignment.title,
                        assignmentId: assignment.id,
                      });
                    }}
                  >
                    <Icon name="person" />
                    <Text>View develuper</Text>
                  </Button>
                );
              }}
            />
          </Container>
        </>
      )}
      {currentUser.role === "develuper" && !applied && (
        <Button
          testID="applyButton"
          onPress={() => applyHandler()}
          bordered
          info
          style={styles.develupersButtons}
        >
          <Icon name="checkmark" />
          <Text style={styles.buttonText}>Apply now!</Text>
        </Button>
      )}
      {currentUser.role === "develuper" && applied && (
        <Button
          success
          testID="successfullyAppliedMessage"
          style={styles.develupersButtons}
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
            onPress={() => navigation.navigate("login")}
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

  text: {
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "black",
  },
  develupersContainer: {
    padding: 3,
  },
  develupersButtons: {
    margin: 3,
    marginLeft: 5,
  },
  grid: {
    margin: 5,
  },
});
