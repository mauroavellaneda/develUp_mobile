import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import Assignments from "../modules/assignments";
import { StyleSheet, Text } from "react-native";
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Textarea,
  ListItem,
  Icon,
  Badge,
} from "native-base";

const AssignmentForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeframe, setTimeframe] = useState(1);
  const [budget, setBudget] = useState("");
  const [skillSelection, setSkillSelection] = useState([]);
  const [pointsSum, setPointsSum] = useState(0);
  const [assignmentPoints, setAssignmentPoints] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const calculatePoints = () => {
      let algorithmResult = pointsSum * timeframe;
      setAssignmentPoints(algorithmResult);
    };
    const selectedSkills = [];
    const skillsUpdater = () => {
      skills.forEach((skill) => {
        if (skill.isChecked) {
          selectedSkills.push(skill.name);
        }
      });
      setSkillSelection(selectedSkills);
    };
    skillsUpdater();
    calculatePoints();
  }, [pointsSum, timeframe]);

  const [skills, setSkills] = useState([
    {
      name: "Fullstack",
      isChecked: false,
      points: 10,
    },
    {
      name: "Ruby",
      isChecked: false,
      points: 5,
    },
    {
      name: "HTML-CSS",
      isChecked: false,
      points: 1,
    },
    {
      name: "Node JS",
      isChecked: false,
      points: 5,
    },
    {
      name: "React",
      isChecked: false,
      points: 5,
    },
    {
      name: "Angular",
      isChecked: false,
      points: 5,
    },
    {
      name: "React Native",
      isChecked: false,
      points: 7,
    },
  ]);

  const publishAssignment = async () => {
    let response = await Assignments.create(
      title,
      description,
      timeframe,
      budget,
      skillSelection,
      assignmentPoints
    );
    if (response === "successfully saved") {
      props.navigation.navigate("clientPage", {
        assignmentCreateMessage: `Assignment successfully created! Applicants will be listed below. Once you have decided on best candidate, you find the assign button on the applicants profile page`,
      });
    } else {
      setErrorMessage("All fields are required");
    }
  };

  const handleCheckboxElement = (event) => {
    let pickedSkills = skills;
    pickedSkills.forEach((skill) => {
      if (skill.name === event.name) {
        skill.isChecked = event.checked;
        if (event.checked) {
          setPointsSum(pointsSum + skill.points);
        } else {
          setPointsSum(pointsSum - skill.points);
        }
      }
    });
    setSkills(pickedSkills);
  };

  return (
    <Container>
      <Content>
        <Text>
          {errorMessage && (
            <Item style={styles.errorItem}>
              <Icon name="warning" style={styles.errorIcon} />
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </Item>
          )}
        </Text>
        <Form id="create-assignment">
          <Label style={styles.title}>Assignment</Label>
          <Item fixedLabel>
            <Input
              onChangeText={(text) => setTitle(text)}
              placeholder="Title"
              style={styles.input}
            />
          </Item>
          <Item fixedLabel>
            <Textarea
              rowSpan={5}
              floated
              placeholder="Short description of your assignment"
              onChangeText={(text) => setDescription(text)}
            />
          </Item>
          <Item fixedLabel>
            <Label style={styles.label}>Timeframe</Label>
            <Input
              onChangeText={(text) => setTimeframe(text)}
              placeholder="Number of days"
            />
          </Item>
          <Item fixedLabel>
            <Label style={styles.label}>Budget</Label>
            <Input onChangeText={(text) => setBudget(text)} placeholder="$" />
          </Item>
          <ListItem>
            <Label style={styles.label}>Required skillset:</Label>
            <Text style={styles.placeholder}>Select all skills required </Text>
          </ListItem>
          {skills.map((skill) => {
            return (
              <>
                <Item>
                  <Checkbox
                    keyExtractor={skill.name}
                    handleCheckboxElement={handleCheckboxElement}
                    {...skill}
                    style={styles.checkbox}
                  />
                  <Label style={styles.skills}>{skill.name}</Label>
                </Item>
              </>
            );
          })}
        </Form>
      </Content>
      <Item style={styles.pointsContainer}>
        <Text style={styles.points}>Assignment points:</Text>
        <Badge style={styles.badge} primary>
          <Text>{assignmentPoints}</Text>
        </Badge>
      </Item>
      <Button block onPress={() => publishAssignment()}>
        <Text>Publish</Text>
      </Button>
    </Container>
  );
};

export default AssignmentForm;

const styles = StyleSheet.create({
  title: {
    color: "blue",
    textAlign: "center",
    fontSize: 30,
    marginTop: 3,
  },
  badge: {
    marginTop: 4,
  },
  pointsContainer: {
    backgroundColor: "#4A6572",
    height: 40,
  },
  points: {
    color: "black",
    fontSize: 20,
    marginRight: 10,
  },
  label: {
    color: "blue",
  },
  skills: {
    color: "#002266",
    marginLeft: 20,
  },
  placeholder: {
    marginLeft: 20,
    color: "grey",
    fontSize: 18,
  },
  errorItem: {
    height: 40,
    backgroundColor: "red",
    marginLeft: 30,
  },
  errorMessage: {
    marginLeft: 25,
    fontSize: 25,
    marginRight: 10,
  },
  errorIcon: {
    fontSize: 30,
    marginLeft: 10,
    paddingLeft: 10,
  },
});
