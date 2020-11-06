import React from "react";
import { registerRootComponent } from "expo";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "./src/state/store/configureStore";

axios.defaults.baseURL = "https://develup-2020.herokuapp.com/api";
// axios.defaults.baseURL = "http://localhost:3000/api";
//  axios.defaults.baseURL = "http://cbf80599e6ab.ngrok.io/api";

const store = configureStore();

const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(ConnectedApp);
