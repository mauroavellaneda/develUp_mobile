import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import Users from "../modules/users";

const DeveluperPage = ({ route }) => {
  const [develuperProfile, setDeveluperProfile] = useState();

  useEffect(() => {
    const getDeveluperProfile = async () => {
      const response = await Users.show(route.params.userId);
      if (response.id) {
        setDeveluperProfile(response);
      }
    };
    getDeveluperProfile();
  }, [route]);

  return (
    <>
      <Text>{route.params.userId}</Text>
      {/* {authenticated && (
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
      )}
      {currentUser.role === "develuper" && !applied && (
        <Button testID="applyButton" block onPress={() => applyHandler()}>
          <Text>Apply now!</Text>
        </Button>
      )}
      {currentUser.role === "develuper" && applied && (
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
            onPress={() => navigation.navigate("login")}
          >
            <Text> {message} </Text>
          </Button>
        )}
      </Text> */}
    </>
  );
};

export default DeveluperPage;

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
