import React from "react";
import { registerRootComponent } from "expo";
import App from "./App";
import axios from "axios";

/* axios.defaults.baseURL = "https://develup-2020.herokuapp.com/api"; */
/* axios.defaults.baseURL = "http://fd932dfea6dd.ngrok.io/api"; */
axios.defaults.baseURL = "http://localhost:3000/api"

registerRootComponent(App);
