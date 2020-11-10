import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
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
        <CardItem header bordered style={styles.titleCard}>
          <Left>
            <Icon name="person" />
            <Body>
              <Text testID="title" style={styles.title}>
                {develuperProfile.name}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={styles.descriptionCard}>
          <Body>
            <Text testID="description" style={styles.description}>
              {develuperProfile.email}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer bordered style={styles.container}>
          <Left testID="points">
            <Text note style={styles.container2}>
              Points:
            </Text>
            <Badge primary>
              <Text>{develuperProfile.level}</Text>
            </Badge>
          </Left>
          <Body>
            <Text testID="skills" note style={styles.cardSkills}>
              Skills: {develuperProfile.points}
            </Text>
          </Body>
        </CardItem>
        <CardItem header bordered style={styles.titleCard}>
          <Left>
            <Icon name="laptop" />
            <Body>
              <Text testID="title" style={styles.title}>
                {develuperProfile.skills}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem header bordered style={styles.titleCard}>
          <Left>
            <Icon name="laptop" />
            <Body>
              <Text testID="title" style={styles.title}>
                {develuperProfile.completed_projects}
              </Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
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
