import axios from "axios";

const Assignments = {
  async index() {
    try {
      const response = await axios.get("/assignments");
      return response.data.assignments;
    } catch (error) { 
      console.log(error);
    }
  },

  async create( title, description, timeframe, budget, skills, points ) {
   let headers
    try {
      const response = await axios.post("/assignments", 
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
        headers: {
          ...headers
        }
      }
    );
    document.getElementById("create-assignment").reset();
      return response.data.message
    }  catch(error) {

    }
  }
};
export default Assignments;
