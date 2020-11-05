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

  async create(title, description, timeframe, budget, skills, points) {
    
    let headers = JSON.parse(await storage.getItem("auth-storage"));
    try { 
      const response = await axios.post(
        "/assignments",
        {
          assignment: {
            title: title,
            description: description,
            timeframe: timeframe,
            budget: budget,
            skills: skills,
            points: points,
          },
        },
        {
          headers: headers
        }
      );
      return response.data.message;
    } catch (error) {
      console.log(error)
    }
  },
};
export default Assignments;
