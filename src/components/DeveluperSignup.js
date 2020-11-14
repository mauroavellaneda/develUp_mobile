import React, { useState, useEffect } from "react";
import Auth from "../modules/authentication";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  ListItem,
  View,
  CheckBox,
} from "native-base";

const ClientSignUp = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [timeframe, setTimeframe] = useState(1);
  const [skillSelection, setSkillSelection] = useState([]);
  const [pointsSum, setPointsSum] = useState(0);
  const [assignmentPoints, setAssignmentPoints] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = new Auth({ host: "https://develup-2020.herokuapp.com/api" });

  const storage = AsyncStorage;

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

  const signUpHandler = async () => {
    try {
      let response = await auth.signUp({
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        name: name,
        skills: skillSelection,
        role: "registered",
      });
      await storage.setItem("auth-storage", JSON.stringify(response.headers));
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          currentUser: response.data.data,
        },
      });
      props.navigation.navigate("develuperSubscription", {
        id: response.data.data.id
      });
    } catch (error) {
      let errorMessage = error.response.data.errors.full_messages;
      setErrorMessage(errorMessage);
    }
  };

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
      <Content testID="mainContainer">
        <Form>
          <Item floatingLabel>
            <Label testID="emailLabel">Full name</Label>
            <Input testID="emailInput" onChangeText={(text) => setName(text)} />
          </Item>
          <Item floatingLabel>
            <Label testID="emailLabel">Email</Label>
            <Input
              testID="emailInput"
              onChangeText={(text) => setEmail(text)}
            />
          </Item>

          <Item floatingLabel last>
            <Label testID="passwordLabel">Password</Label>
            <Input
              testID="passwordInput"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </Item>
          <Item floatingLabel last>
            <Label testID="passwordConfirmationLabel">
              Password Confirmation
            </Label>
            <Input
              testID="passwordConfirmationInput"
              onChangeText={(text) => setPasswordConfirmation(text)}
              secureTextEntry
            />
          </Item>
          <ListItem>
            <Label style={styles.label}>Skillset:</Label>
            <Text style={styles.placeholder}>Select all your skills </Text>
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
        <Text testID="errorMessageSubmit" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      </Content>
      <Button testID="submitButton" block onPress={() => signUpHandler()}>
        <Text>Submit</Text>
      </Button>
    </Container>
  );
};

export default ClientSignUp;

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    fontSize: 18,
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
  checkbox: {
    margin: 20,
  },
});
