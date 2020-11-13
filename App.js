import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AssignmentsIndex from "./src/components/AssignmentsIndex";
import SingleAssignment from "./src/components/SingleAssignment";
import ClientSignUp from "./src/components/ClientSignUp";
import ClientPage from "./src/components/ClientPage";
import AssignmentForm from "./src/components/AssignmentForm";
import Login from "./src/components/Login";
import { useSelector } from "react-redux";
import HeaderButtons from "./src/components/HeaderButtons";
import DeveluperPage from "./src/components/DeveluperPage";
import DeveluperSubscription from "./src/components/DeveluperSubscription";
import DeveluperSignup from './src/components/DeveluperSignup'

const Stack = createStackNavigator();

const App = () => {
  const authenticated = useSelector((state) => state.authenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={(props) => ({
          headerStyle: { backgroundColor: "#F9AA33" },
          title: "develUp",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          headerTintColor: "white",
          headerRight: () => <HeaderButtons {...props} />,
        })}
      >
        
        <Stack.Screen name="develUp" component={AssignmentsIndex} />
        <Stack.Screen name="singleAssignment" component={SingleAssignment} />
        {authenticated ? (
          <>
            <Stack.Screen name="clientPage" component={ClientPage} />
            <Stack.Screen name="develuperPage" component={DeveluperPage} />
            <Stack.Screen name="assignmentForm" component={AssignmentForm} />
            <Stack.Screen name="develuperSubscription" component={DeveluperSubscription} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="clientSignUp" component={ClientSignUp} />
          <Stack.Screen name="develuperSignup" component={DeveluperSignup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
