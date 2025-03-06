export const registerReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_USER_SUCCESS":
      return { ...state, isLoading: false, userInfo: action.payload };
    case "FETCH_USER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "SEND_EMAIL_START":
      return { ...state, isLoading: true, error: null };
    case "SEND_EMAIL_SUCCESS":
      return { ...state, isLoading: false, emailMessage: action.payload };
    case "SEND_EMAIL_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "REGISTER_START":
      return { ...state, isLoading: true, error: null };
    case "REGISTER_SUCCESS":
      return { ...state, isLoading: false, userInfo: action.payload };
    case "REGISTER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, isLoading: false, userInfo: action.payload };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, isLoading: false, userInfo: null };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "UPDATE_EMAIL_START":
      return { ...state, isLoading: true, error: null };
    case "UPDATE_EMAIL_SUCCESS":
      return { ...state, isLoading: false, emailMessage: action.payload };
    case "UPDATE_EMAIL_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "DELETE_EMAIL_START":
      return { ...state, isLoading: true, error: null };
    case "DELETE_EMAIL_SUCCESS":
      return { ...state, isLoading: false, emailMessage: null };
    case "DELETE_EMAIL_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
