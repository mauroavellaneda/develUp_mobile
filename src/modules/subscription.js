import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const storage = AsyncStorage;

const Subscrition = {
  async approved(id) {
    let headers = JSON.parse(await storage.getItem("auth-storage"));
    try {
      const response = await axios.put(`/subscriptions/${id}`, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
export default Subscrition;
