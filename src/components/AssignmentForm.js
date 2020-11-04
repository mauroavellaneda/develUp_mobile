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
          <Item fixedLabel>
            <Label style={styles.label}>Assignment</Label>
            <Input
              onChangeText={(text) => setTitle(text)}
              placeholder="Titel"
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

            <Input placeholder="" />
          </Item>

          <Item fixedLabel>
            <Label style={styles.label}>Timeframe</Label>
            <Input
              onChangeText={(text) => setTimeframe(text)}
              placeholder="days"
            />
          </Item>

          {skills.map((skill) => {
            return (
              <Item style={styles.checkbox}>
                <Label style={styles.label}>{skill.name}</Label>
                <Checkbox
                  handleCheckboxElement={handleCheckboxElement}
                  {...skill}
                />
              </Item>
            );
          })}
        </Form>
      </Content>
      <Text>Assignment points: {assignmentPoints}</Text>

      <Button block onPress={() => publishAssignment()}>
        <Text>Publish</Text>
      </Button>
    </Container>
  );
};

export default AssignmentForm;

const styles = StyleSheet.create({
  label: {
    color: "blue",
  },
  checkbox: {
    height: 60,
  },
  angularCheckbox: {
    marginLeft: 145,
  },
});
