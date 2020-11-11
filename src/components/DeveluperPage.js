import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Users from "../modules/users";
import { Card, CardItem, Icon, Left, Body, Badge } from "native-base";

const DeveluperPage = ({ route }) => {
  const [develuperProfile, setDeveluperProfile] = useState([]);

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
});
