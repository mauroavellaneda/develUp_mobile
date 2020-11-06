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
  const [message, setMessage] = useState();

  // const auth = new Auth({ host: "http://cbf80599e6ab.ngrok.io/api" });
  // const auth = new Auth({ host: "http://localhost:3000/api" });
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
          type: "SIGNUP",
          payload: {
            authenticated: true,
            currentUser: response.data.data,
          },
        });
        props.navigation.navigate("clientPage", {
          clientSignUpMessage: `You are logged in with: ${response.data.data.company_name}!`,
        });
    } catch (error) { 
      let errorMessage = error.response.data.errors.full_messages
      setMessage(errorMessage)
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(text) => setEmail(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input onChangeText={(text) => setPassword(text)} secureTextEntry />
          </Item>
          <Item floatingLabel last>
            <Label>Password Confirmation</Label>
            <Input
              onChangeText={(text) => setPasswordConfirmation(text)}
              secureTextEntry
            />
          </Item>
          <Item floatingLabel last>
            <Label>Company Name</Label>
            <Input onChangeText={(text) => setCompany(text)} />
          </Item>
          <Item floatingLabel last>
            <Label>Company URL</Label>
            <Input onChangeText={(text) => setCompanyUrl(text)} />
          </Item>
        </Form>
        <Text style={styles.errorMessage}>{message}</Text>
      </Content>
      <Button block onPress={() => signUpHandler()}>
        <Text>Submit</Text>
      </Button>
    </Container>
  );
};

export default ClientSignUp;

const styles = StyleSheet.create({
  errorMessage: { color: "red", fontSize: 18 },
});
