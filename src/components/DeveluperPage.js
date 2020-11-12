import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import Users from "../modules/users";
import { Card, CardItem, Icon, Left, Body, Badge, Button } from "native-base";
import { useSelector } from "react-redux";

const DeveluperPage = ({ route }) => {
  const [develuperProfile, setDeveluperProfile] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const getDeveluperProfile = async () => {
      const response = await Users.show(route.params.userId);
      if (response.id) {
        setDeveluperProfile(response);
      }
    };
    getDeveluperProfile();
  }, [route]);

  const selectDeveluperHandler = async () => {
    let response = await Assignments.selectDeveluper(
      route.params.assignmentId,
      route.params.userId
    );
    if (response.message) {
      setSelected(true);
    } else {
      setMessage(response);
    }
  };

  return (
    <>
      <Card>
        <CardItem header bordered style={styles.firstCard}>
          <Left>
            <Icon name="person" style={styles.person} />
            <Body>
              <Text testID="develuperName" style={styles.title}>
                {develuperProfile.name}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem footer bordered style={styles.container}>
          <Icon name="paper" style={styles.points} />
          <Left testID="points">
            <Text note style={styles.titleProjects}>
              Level:
            </Text>
            <Badge primary>
              <Text>{develuperProfile.level}</Text>
            </Badge>
          </Left>
          <Left>
            <Text testID="skills" note style={styles.titleProjects}>
              Points:
            </Text>
            <Badge primary>
              <Text>{develuperProfile.points}</Text>
            </Badge>
          </Left>
        </CardItem>
        <CardItem header bordered style={styles.titleCardSkills}>
          <Left>
            <Icon name="laptop" />
            <Body>
              <Text testID="title" style={styles.skills}>
                {develuperProfile.skills}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem header bordered style={styles.titleCardProjects}>
          <Left>
            <Icon name="folder" />
            <Text style={styles.projects}>Completed projects:</Text>
            <Body>
              <Text testID="title" style={styles.titleProjects}></Text>
              <Badge primary>
                <Text>{develuperProfile.completed_projects}</Text>
              </Badge>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={styles.mailAdress}>
          <Icon name="mail" />
          <Text testID="description" style={styles.skills}>
            {develuperProfile.email}
          </Text>
        </CardItem>
      </Card>
      {currentUser.role === "client" && !selected && (
        <Button
          testID="selectDeveluperButton"
          block
          onPress={() => selectDeveluperHandler()}
        >
          <Text>
            Select {develuperProfile.name} to {route.params.assignmentTitle}
          </Text>
        </Button>
      )}
      {/* {message && (
          <Button
            style={styles.fullWidth}
            full
            danger
            onPress={() => navigation.navigate("clientPage")}
          >
            <Text> {message} </Text>
          </Button>
        )} */}
    </>
  );
};

export default DeveluperPage;

const styles = StyleSheet.create({
  firstCard: {
    backgroundColor: "#4e8de0",
    height: 250,
  },
  person: {
    fontSize: 70,
    margin: 5,
  },
  title: {
    fontSize: 50,
    padding: 20,
  },
  container: {
    backgroundColor: "#4A6572",
    height: 60,
  },
  skills: {
    fontSize: 20,
  },
  titleCardSkills: {
    backgroundColor: "#4A6572",
    height: 60,
  },
  titleCardProjects: {
    height: 60,
    backgroundColor: "#4A6572",
  },
  titleProjects: {
    fontSize: 22,
  },
  mailAdress: {
    height: 60,
    backgroundColor: "#4A6572",
  },
  projects: {
    fontSize: 20,
    margin: 4,
  },
  fullWidth: {
    width: Dimensions.get("window").width,
  },
});
