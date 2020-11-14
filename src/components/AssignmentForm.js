import React, { useEffect, useState } from "react";
import Assignments from "../modules/assignments";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
  CheckBox
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
      id: 1,
    },
    {
      name: "Ruby",
      isChecked: false,
      points: 5,
      id: 2,
    },
    {
      name: "HTML-CSS",
      isChecked: false,
      points: 1,
      id: 3,
    },
    {
      name: "Node JS",
      isChecked: false,
      points: 5,
      id: 4,
    },
    {
      name: "React",
      isChecked: false,
      points: 5,
      id: 5,
    },
    {
      name: "Angular",
      isChecked: false,
      points: 5,
      id: 6,
    },
    {
      name: "React Native",
      isChecked: false,
      points: 7,
      id: 7,
    },
  ]);

  const publishAssignment = async () => {
    let response = await Assignments.create({
      title: title,
      description: description,
      timeframe: timeframe,
      budget: budget,
      skills: skillSelection,
      points: assignmentPoints,
    });
    if (response === "successfully saved") {
      props.navigation.navigate("clientPage", {
        assignmentCreateMessage: `Assignment successfully created`,
      });
    } else {
      setErrorMessage(response);
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
              <Text testID="createErrorMessage" style={styles.errorMessage}>
                {errorMessage}
              </Text>
            </Item>
          )}
        </Text>
        <Form id="create-assignment">
          <Label style={styles.title}>Assignment</Label>
          <Item testID="titleAssignment" fixedLabel>
            <Input
              testID="titleInput"
              onChangeText={(text) => setTitle(text)}
              placeholder="Title"
              style={styles.input}
            />
          </Item>
          <Item testID="descriptionLabel" fixedLabel>
            <Textarea
              testID="descriptionInput"
              rowSpan={5}
              floated
              placeholder="Short description of your assignment"
              onChangeText={(text) => setDescription(text)}
            />
          </Item>
          <Item fixedLabel>
            <Label testID="timeFrameLabel" style={styles.label}>
              Timeframe
            </Label>
            <Input
              testID="timeFrameInput"
              keyboardType="numeric"
              onChangeText={(text) => setTimeframe(text.replace(/[^0-9]/g, ""))}
              placeholder="Number of days"
            />
          </Item>
          <Item fixedLabel>
            <Label testID="budgetLabel" style={styles.label}>
              Budget
            </Label>
            <Input
              testID="budgetInput"
              keyboardType="numeric"
              onChangeText={(text) => setBudget(text.replace(/[^0-9]/g, ""))}
              placeholder="$"
            />
          </Item>
          <ListItem>
            <Label style={styles.label}>Required skillset:</Label>
            <Text style={styles.placeholder}>Select all skills required </Text>
          </ListItem>
          {skills.map((skill) => {
            return (
              <View key={skill.id}>
                <TouchableOpacity
                  testID={"skills-" + skill.id}
                  onPress={() =>
                    handleCheckboxElement({
                      checked: !skill.isChecked,
                      name: skill.name,
                    })
                  }
                >
                  <Item>
                    <CheckBox
                      style={styles.checkbox}
                      checked={skill.isChecked}
                    />
                    <Label style={styles.skills}>{skill.name}</Label>
                  </Item>
                </TouchableOpacity>
              </View>
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
      <Button
        testID="publishButton"
        bordered
        info
        block
        onPress={() => publishAssignment()}
      >
        <Icon name="checkmark" />
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
    height: 35,
    backgroundColor: "red",
    marginLeft: 30,
  },
  errorMessage: {
    marginLeft: 25,
    fontSize: 12,
    marginRight: 10,
  },
  errorIcon: {
    fontSize: 20,
    marginLeft: 10,
    paddingLeft: 10,
  },
  checkbox: {
    margin: 20,
  },
});
