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

  async clientIndex(clientID) {
    try {
      const response = await axios.get(`/assignments/?client_id=${clientID}`);
      return response.data.assignments;
    } catch (error) {
      return error.response.data.errors;
    }
  },

  async show(assignmentId, authenticated) {
    let headers;
    {
      authenticated &&
        (headers = JSON.parse(await storage.getItem("auth-storage")));
    }
    try {
      const response = await axios.get(`/assignments/${assignmentId}`, {
        headers: headers,
      });
      return response.data.assignment;
    } catch (error) {
      return error.response.data.errors;
    }
  },

  async create(assignment) {
    let headers = JSON.parse(await storage.getItem("auth-storage"));
    try {
      let response = await axios.post(
        "/assignments",
        {
          assignment: assignment,
        },
        {
          headers: headers,
        }
      );
      return response.data.message;
    } catch (error) {
      let errorMessage = error.response.data.message;
      return errorMessage;
    }
  },

  async apply(assignmentId, applicantId) {
    let headers = JSON.parse(await storage.getItem("auth-storage"));
    try {
      let response = await axios.put(
        `/assignments/${assignmentId}`,
        {
          applicants: applicantId,
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      let errorMessage = error.response.data.message;
      return errorMessage;
    }
  },

  async selectDeveluper(assignmentId, selectedId) {
    let headers = JSON.parse(await storage.getItem("auth-storage"));
    try {
      let response = await axios.put(
        `/assignments/${assignmentId}`,
        {
          selected: selectedId,
          status: "ongoing",
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      let errorMessage = error.response.data.message;
      return errorMessage;
    }
  },

  async closeAssignment(assignmentId) {
    let headers = JSON.parse(await storage.getItem("auth-storage"));
    
    try {
      let response = await axios.put(
        `/assignments/${assignmentId}`,
        {
          status: "closed",
        },
        {
          headers: headers,
        }
      ); 
      return response.data;
    } catch (error) { 
      let errorMessage = error.response.data.message;
      return errorMessage;
    }
  },
};
export default Assignments;
