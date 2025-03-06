export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_START":
      return { ...state, loading: true, error: null };
    case "FETCH_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "FETCH_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "REGISTER_USER_START":
      return { ...state, loading: true, error: null };
    case "REGISTER_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "REGISTER_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_USER_START":
      return { ...state, loading: true, error: null };
    case "UPDATE_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "UPDATE_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };
      
    case "DELETE_USER_START":
      return { ...state, loading: true, error: null };
    case "DELETE_USER_SUCCESS":
      return { ...state, loading: false, user: null };
    case "DELETE_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
