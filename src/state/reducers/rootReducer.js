import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP":
      return {
        ...state,
        authenticated: action.payload.authenticated,
        currentUser: action.payload.currentUser,
      };
  }
};

export default rootReducer;
