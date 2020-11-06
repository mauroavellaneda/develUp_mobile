import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const storage = AsyncStorage;

const Assignments = {
  async index() {
    try {
      const response = await axios.get("/assignments");
      return response.data.assignments;
    } catch (error) {
      console.log(error);
    }
  },

  // async create(title, description, timeframe, budget, skills, points) {
  async create(assignment) {
    let headers = JSON.parse(await storage.getItem("auth-storage"));
    try {
      const response = await axios.post(
        "/assignments",
        {
          assignment: assignment,
        },
        {
          headers: { ...headers, "Content-Type": "application/json" },
        }
      );
      debugger
      return response.data.message;
    } catch (error) {
      debugger;
      console.log(error);
    }
  },
};
export default Assignments;
