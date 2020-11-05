import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";


const ClientPage = (props) => {
  return (
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
