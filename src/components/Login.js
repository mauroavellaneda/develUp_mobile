import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Auth from "../modules/authentication";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Icon,
} from "native-base";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const storage = AsyncStorage;

  const auth = new Auth({ host: "http://localhost:3000/api" })

  const loginHandler = async () => {
    try {
      let response = await auth.signIn(email, password);
      await storage.getItem("auth-storage", JSON.stringify(response.headers));

      dispatch({
        type: "SIGNUP",
        payload: {
          authenticated: true,
          currentUser: response.data,
        },
      });
      
      response.data.role === "client"
        ? props.navigation.navigate("clientPage", {
            clientSignUpMessage: `You are logged in with: ${response.data.email}!`,
          })
        : props.navigation.navigate("develUp", {
            loginMessage: `You are logged in with: ${response.data.email}!`,
          });
    } catch (error) {
      let errorMessage = error.response.data.errors;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Container>
      <Content testID="loginContainer">
        <Text>
          {errorMessage && (
            <Item style={styles.errorItem}>
              <Icon name="warning" style={styles.errorIcon} />
              <Text testID="errorMessage" style={styles.errorMessage}>
                {errorMessage}
              </Text>
            </Item>
          )}
        </Text>
        <Form>
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
        </Form>
        <Button testID="submitButton" block onPress={() => loginHandler()}>
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
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
});
