import React, { useState } from "react";
import Auth from "../modules/authentication";
import { StyleSheet } from "react-native";
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
} from "native-base";

const ClientSignUp = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const auth = new Auth({ host: "https://develup-2020.herokuapp.com/api" });

  const storage = AsyncStorage;

  const signUpHandler = async () => {
    try {
      let response = await auth.signUp({
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        company_name: company,
        company_url: companyUrl,
        role: "client",
      });
      await storage.setItem("auth-storage", JSON.stringify(response.headers));
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          currentUser: response.data.data,
        },
      });
      props.navigation.navigate("clientPage", {
        message: `You are logged in with: ${response.data.data.company_name}!`,
      });
    } catch (error) {
      let errorMessage = error.response.data.errors.full_messages;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Container>
      <Content testID="mainContainer">
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
          <Item floatingLabel last>
            <Label testID="companyNameLabel">Company Name</Label>
            <Input
              testID="companyNameInput"
              onChangeText={(text) => setCompany(text)}
            />
          </Item>
          <Item floatingLabel last>
            <Label testID="companyUrlLabel">Company URL</Label>
            <Input
              testID="companyUrlInput"
              onChangeText={(text) => setCompanyUrl(text)}
            />
          </Item>
          <Button
            testID="submitButton"
            style={styles.submitButton}
            onPress={() => signUpHandler()}
          >
            <Text>Submit</Text>
          </Button>
        </Form>
        <Text testID="errorMessageSubmit" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      </Content>
    </Container>
  );
};

export default ClientSignUp;

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    fontSize: 18,
  },
  submitButton: {
    marginLeft: 17,
    marginTop: 15,
  },
});
