import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import { useSelector } from "react-redux";


const ClientPage = (props) => {
  const authenticated = useSelector((state) => state.authenticated);
  return (
    <>
    <Text>{authenticated.toString()}</Text>
    <View>
     {/*  <Text style={styles.welcomeText}>
        {props.route.params.clientSignUpMessage}
      </Text> */}

       {/* <Text style={styles.welcomeText}>
        {props.route.params.assignmentCreateMessage}
      </Text> */}
      <Button onPress={() => props.navigation.navigate("assignmentForm")}>
        <Text>Create Assignment</Text>
      </Button>
    </View>
    </>
  );
};

export default ClientPage;

const styles = StyleSheet.create({
  welcomeText: {
    margin: 5,
    color: "#0059b3",
    fontSize: 15,
  },
});
