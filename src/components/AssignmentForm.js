import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
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
} from "native-base";

const AssignmentForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeframe, setTimeframe] = useState(1);
  const [budget, setBudget] = useState("");

  const [skillSelection, setSkillSelection] = useState([]);
  const [pointsSum, setPointsSum] = useState(0);
  const [assignmentPoints, setassignmentPoints] = useState(0);

  useEffect(() => {
    const calculatePoints = () => {
      let algorithmResult = pointsSum * timeframe;
      setassignmentPoints(algorithmResult);
    };
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

  const publishAssignment = () => {
    const selectedSkills = [];
    skills.forEach((skill) => {
      if (skill.isChecked) {
        selectedSkills.push(skill.name);
      }
    });
    setSkillSelection(selectedSkills);
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
      <Text>{skillSelection.toString()}</Text>
      <Content>
        <Form>
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
      <Item>
        <Text style={styles.points}>
          {" "}
          Assignment points: {assignmentPoints}
        </Text>
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
  },
  points: {
    color: "blue",
    fontSize: 20,
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
});