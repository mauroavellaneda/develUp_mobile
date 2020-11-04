import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  ListItem,
  Input,
  Label,
  Textarea,
  Body,
  CheckBox,
} from "native-base";

const AssignmentForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [budget, setBudget] = useState("");

  const [skills, setSkills] = useState([
    {
      value: "Ruby",
      isChecked: true,
    },
    {
      value: "HTML-CSS",
      isChecked: false,
    },
    {
      value: "Node JS",
      isChecked: false,
    },
    {
      value: "React",
      isChecked: false,
    },
    {
      value: "Angular",
      isChecked: false,
    },
    {
      value: "React Native",
      isChecked: false,
    },
    {
      value: "Fullstack",
      isChecked: false,
    },
  ]);

  const publishAssignment = () => {
    const selectedSkills = [];
    skills.forEach((skill) => {
      if (skill.isChecked) {
        selectedSkills.push(skill.value);
      }
    });
  };

  const handleCheckboxElement = (event) => {
    let pickedSkills = skills;
    pickedSkills.forEach(skill => {
      if (skill.value === event.value) 
        skill.isChecked = event.checked;
      
    });
    setSkills(pickedSkills);
  };

  return (
    <Container>
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

          {skills.map(skill => {
            return (
              <Item style={styles.checkbox}>
                <Label style={styles.label}>{skill.value}</Label>
                <CheckBox
                  handleCheckboxElement={handleCheckboxElement}
                  {...skill}
                />
              </Item>
            );
          })}
        </Form>
      </Content>
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
