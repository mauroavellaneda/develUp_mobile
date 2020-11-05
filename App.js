import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AssignmentsIndex from "./src/components/AssignmentsIndex";
import ClientSignUp from "./src/components/ClientSignUp";
import ClientPage from "./src/components/ClientPage";
import AssignmentForm from "./src/components/AssignmentForm";
import { Provider } from "react-redux";
import configureStore from "./src/state/store/configureStore";

const store = configureStore();

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator screenOptions={myOptions}>
            <Stack.Screen name="clientPage" component={ClientPage} />
            <Stack.Screen name="develUp" component={AssignmentsIndex} />
            <Stack.Screen name="assignmentForm" component={AssignmentForm} />
            <Stack.Screen name="clientSignUp" component={ClientSignUp} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
  );
};

export default App;

const myOptions = {
  headerStyle: { backgroundColor: "#F9AA33" },
  title: "develUp",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
  },
  headerTintColor: "white",
};
