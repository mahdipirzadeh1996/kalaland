import { axiosFrontInstance } from "@/utils/axios";
import { toast } from "@/component/customToast/CustomToast";

export const fetchUser = async (dispatch) => {
  dispatch({ type: "FETCH_USER_START" });
  try {
    // Make the API call to your backend using axiosInstance
    const response = await axiosFrontInstance.get("/api/check");

    dispatch({ type: "FETCH_USER_SUCCESS", payload: response.data.user });
  } catch (error) {
    dispatch({ type: "FETCH_USER_FAILURE", payload: error });

    if (error.response?.data?.error?.errors) {
      toast.error(error.response.data.error.errors.message);
    } else if (error.response?.data?.error?.messages) {
      Object.values(error.response.data.error.messages).forEach(
        (errorMessage) => {
          toast.error(errorMessage);
        }
      );
    } else {
      toast.error(
        error.response?.data?.error ||
          "خطایی در احراز هویت رخ داد. لطفا مجددا تلاش کنید!"
      );
    }
  }
};

export const sendEmail = async (dispatch, userData, setEmail) => {
  dispatch({ type: "SEND_EMAIL_START" });

  try {
    const response = await fetch("/api/sendemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data; // Handle errors
    }

    dispatch({
      type: "SEND_EMAIL_SUCCESS",
      payload: data.message,
    });
    toast.success(data.message);
    setEmail(true);
  } catch (error) {
    dispatch({
      type: "SEND_EMAIL_FAILURE",
      payload: error,
    });

    if (error.error.errors) {
      toast.error(error.error.errors.message);
    } else if (error.error.messages) {
      Object.values(error.error.messages).forEach((errorMessage) => {
        toast.error(errorMessage);
      });
    } else {
      toast.error(
        error.error || "خطایی در ثبت‌نام رخ داد. لطفا مجددا تلاش کنید!"
      );
    }
  }
};

export const registerUser = async (
  dispatch,
  userData,
  code,
  setCode,
  setEmail
) => {
  dispatch({ type: "REGISTER_START" });

  try {
    const response = await axiosFrontInstance.post("/api/login", {
      userData,
      code,
    });

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.data.user,
    });

    toast.success(response.data.message);
    setEmail(false);
    setCode("");
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error,
    });

    if (error.response?.data?.error?.errors) {
      toast.error(error.response.data.error.errors.message);
    } else if (error.response?.data?.error?.messages) {
      Object.values(error.response.data.error.messages).forEach(
        (errorMessage) => {
          toast.error(errorMessage);
        }
      );
    } else {
      toast.error(
        error.response?.data?.error ||
          "خطایی در احراز هویت رخ داد. لطفا مجددا تلاش کنید!"
      );
    }
  }
};

export const loginUser = async (dispatch, email, password, setEmail) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const response = await axiosFrontInstance.post("/api/login", {
      email,
      password,
    });

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.user,
    });

    toast.success(response.data.message);
    setEmail(false);
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error,
    });

    if (error.response?.data?.error?.errors) {
      toast.error(error.response.data.error.errors.message);
    } else if (error.response?.data?.error?.messages) {
      Object.values(error.response.data.error.messages).forEach(
        (errorMessage) => {
          toast.error(errorMessage);
        }
      );
    } else {
      toast.error(
        error.response?.data?.error ||
          "خطایی در احراز هویت رخ داد. لطفا مجددا تلاش کنید!"
      );
    }
  }
};

export const logoutUser = async (dispatch) => {
  dispatch({ type: "LOGOUT_START" });

  try {
    // Make the API call to your backend using axiosInstance
    const response = await axiosFrontInstance.post("/api/logout");

    dispatch({ type: "LOGOUT_SUCCESS" });

    toast.success(response.data.message);
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAILURE",
      payload: error.response?.data || error,
    });

    if (error.response?.data?.error?.errors) {
      toast.error(error.response.data.error.errors.message);
    } else if (error.response?.data?.error?.messages) {
      Object.values(error.response.data.error.messages).forEach(
        (errorMessage) => {
          toast.error(errorMessage);
        }
      );
    } else {
      toast.error(
        error.response?.data?.error ||
          "خطایی در خروج از حساب کاربری رخ داد. لطفا مجددا تلاش کنید!"
      );
    }
  }
};

export const updateUser = async (dispatch, userData) => {
  dispatch({ type: "UPDATE_EMAIL_START" });
  try {
    const response = await axiosFrontInstance.put(
      `/api/user/${userData.id}`,
      userData
    );
    dispatch({ type: "UPDATE_EMAIL_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_EMAIL_FAILURE", payload: error.message });
  }
};

export const deleteUser = async (dispatch, userId) => {
  dispatch({ type: "DELETE_EMAIL_START" });
  try {
    await axiosFrontInstance.delete(`/api/user/${userId}`);
    dispatch({ type: "DELETE_EMAIL_SUCCESS", payload: userId });
  } catch (error) {
    dispatch({ type: "DELETE_EMAIL_FAILURE", payload: error.message });
  }
};
