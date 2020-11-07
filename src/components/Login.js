import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Auth from "../modules/authentication";
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
} from "native-base";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = new Auth({ host: "http://localhost:3000" });

  const loginHandler = async () => {
    try {
      let response = await auth.signIn({
        email,
        password,
      });
      props.navigation.navigate("clientPage", {
        loginMessage: `You are logged in with: ${response.data.data.email}!`,
      });
    } catch (error) {
      let errorMessage = error.response.data.errors.full_messages;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Container>
      <Content testID="loginContainer">
        <Text>{errorMessage && <Text>{errorMessage}</Text>}</Text>
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

const styles = StyleSheet.create({});
