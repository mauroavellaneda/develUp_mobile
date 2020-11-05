import React from "react";
import { registerRootComponent } from "expo";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "https://develup-2020.herokuapp.com/api";

/* axios.defaults.baseURL = "http://e1bb8654b4fd.ngrok.io/api"; */


registerRootComponent(App);
