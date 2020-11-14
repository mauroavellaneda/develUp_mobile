import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
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
  Right,
} from "native-base";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const storage = AsyncStorage;

  const auth = new Auth({ host: "https://develup-2020.herokuapp.com/api" });

  const loginHandler = async () => {
    try {
      let response = await auth.signIn(email, password);

      await storage.getItem("auth-storage", JSON.stringify(response.headers));

      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          currentUser: response.data,
        },
      });
      response.data.role === "client"
        ? props.navigation.navigate("clientPage")
        : props.navigation.navigate("develUp");
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
            <Button
              testID="errorMessage"
              style={styles.fullWidth}
              full
              danger
              onPress={() => navigation.navigate("login")}
            >
              <Text> {errorMessage} </Text>
            </Button>
          )}
        </Text>

        <Form style={styles.paddingBottom}>
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

        <Button
          testID="submitButton"
          onPress={() => loginHandler()}
          style={styles.loginButton}
        >
          <Text>Log in</Text>
        </Button>
        <Text style={styles.paddingBottom}></Text>
        <Button
          bordered
          info
          onPress={() => props.navigation.navigate("clientSignUp")}
          style={styles.button}
        >
          <Text>I want to register as a client</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  fullWidth: {
    width: Dimensions.get("window").width,
  },
  paddingBottom: {
    paddingBottom: 20,
  },
  paddingTop: {
    paddingTop: 60,
  },
  loginButton: {
    marginLeft: 20,
  },
  button: {
    margin: 3,
    marginLeft: 20,
  },
});
