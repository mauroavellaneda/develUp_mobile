import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import Users from "../modules/users";
import { Card, CardItem, Icon, Left, Body, Badge, Button } from "native-base";
import { useSelector } from "react-redux";
import Assignments from "../modules/assignments";

const DeveluperPage = ({ route, navigation }) => {
  const [develuperProfile, setDeveluperProfile] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);
  const [selected, setSelected] = useState(false);
  const [resolver, setResolver] = useState(false);

  useEffect(() => {
    const getDeveluperProfile = async () => {
      const response = await Users.show(route.params.userId);
      if (response.id) {
        setDeveluperProfile(response);
      }
    };
    const selectedChecker = async () => {
      if (route.params.selected) {
        setSelected(true);
      }
    };
    const resolverChecker = async () => {
      if (route.params.resolver) {
        setResolver(true);
      }
    };
    getDeveluperProfile();
    selectedChecker();
    resolverChecker();
  }, [route]);

  const selectDeveluperHandler = async () => {
    let response = await Assignments.selectDeveluper(
      route.params.assignmentId,
      route.params.userId
    );
    if (response.message) {
      setSelected(true);
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
          bordered
          testID="selectDeveluperButton"
          info
          style={styles.develupersButtons}
          onPress={() => selectDeveluperHandler()}
        >
          <Icon name="checkmark" />
          <Text>
            Select {develuperProfile.name} to {route.params.assignmentTitle}
          </Text>
        </Button>
      )}
      {currentUser.role === "client" && resolver ? (
        <Button
          style={styles.develupersButtons}
          bordered
          success
          onPress={() => {
            navigation.navigate("singleAssignment", {
              assignmentId: route.params.assignmentId,
            });
          }}
        >
          <Text>
            {develuperProfile.name} has successfully resolved "
            {route.params.assignmentTitle}"
          </Text>
        </Button>
      ) : (
        currentUser.role === "client" &&
        selected && (
          <Button
            style={styles.develupersButtons}
            bordered
            success
            onPress={() => {
              navigation.navigate("singleAssignment", {
                assignmentId: route.params.assignmentId,
              });
            }}
          >
            <Text>
              {develuperProfile.name} is currently working on "
              {route.params.assignmentTitle}"
            </Text>
          </Button>
        )
      )}
    </>
  );
};

export default DeveluperPage;

const styles = StyleSheet.create({
  firstCard: {
    backgroundColor: "#6eb0d4",
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
  develupersButtons: {
    margin: 5,
    padding: 5,
  },
});
