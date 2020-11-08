import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        authenticated: action.payload.authenticated,
        currentUser: action.payload.currentUser,
      };
    default:
      return state;
  }
};

export default rootReducer;
