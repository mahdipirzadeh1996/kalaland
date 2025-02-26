import axios from "axios";
import { toast } from 'react-toastify';

import { emailFailure, emailStart, emailSuccess, logout } from "./EmailActions";

export const sendEmail = async (setEmail, email, dispatch) => {
    dispatch(emailStart());

    axios.post(window.$url +"/api/auth/sendemail", { email }).then((res) => {
        dispatch(emailSuccess(null));
        toast.success(res.data.message);
        setEmail(true);
    }).catch((error) => {
        dispatch(emailFailure());

        if (error.response.data.messages) {
            toast.error(error.response.data.messages.email);
        } else {
            toast.error('Try again!');
        }
    });
}

export const sendEmailReset = async (email, setFirst, setSecond, codeRef, dispatch) => {
    dispatch(emailStart());

    axios.post(window.$url +"/api/auth/sendemail", { email }).then((res) => {
        dispatch(emailSuccess(null));
        toast.success(res.data.message);

        setFirst(false);
        setSecond(true);
        codeRef.current.focus();
    }).catch((error) => {
        dispatch(emailFailure());

        if (error.response.data.messages) {
            toast.error(error.response.data.messages.email);
        } else {
            toast.error('Try again!');
        }
    });
}

export const verifyCode = async (email, code, setSecond, setThird, dispatch) => {
    dispatch(emailStart());

    axios.post(window.$url +"/api/auth/validate", { email, code }).then((res) => {
        dispatch(emailSuccess(null));
        toast.success(res.data.message);

        setSecond(false);
        setThird(true);
    }).catch((error) => {
        dispatch(emailFailure());

        if (error.response.data.errors.message) {
            toast.error(error.response.data.errors.message);
        } else {
            toast.error('Try again!');
        }
    });
}

export const resetPass = async (email, password, setEmail, setFirst, setThird, dispatch) => {
    dispatch(emailStart());

    axios.post(window.$url +"/api/auth/changePass", { email, password }).then((res) => {
        dispatch(emailSuccess(null));
        toast.success(res.data.message);

        setEmail(false);
        setThird(false);
        setFirst(true);
    }).catch((error) => {
        dispatch(emailFailure());

        if (error.response.data.errors.message) {
            toast.error(error.response.data.errors.message);
        } else {
            toast.error('Try again!');
        }
    });
}

export const verifyEmail = async (userData, code, setEmail, setCode, dispatch) => {
    dispatch(emailStart());

    axios.post(window.$url +"/api/auth/register", { userData, code }).then((res) => {
        dispatch(emailSuccess({
            fullName: res.data.user.first_name,
            mobile: res.data.user.mobile,
            email: res.data.user.email,
            token: res.data.user.token
        }));
        toast.success(res.data.message);
        setEmail(false);
        setCode('');
    }).catch((error) => {
        dispatch(emailFailure());

        if (error.response.data.errors.message) {
            toast.error(error.response.data.errors.message);
        } else {
            toast.error('Try again!');
        }
    });
}

export const loginAdmin = async (email, password, navigate, dispatch) => {
    dispatch(emailStart());

    axios.post(window.$url +"/api/auth/loginAdmin", { email, password }).then((res) => {
        dispatch(emailSuccess({
            token: res.data.data.accessToken
        }));
        toast.success(res.data.message);
        navigate('/');
    }).catch((error) => {
        dispatch(emailFailure());

        if (error.response.data.messages) {
            toast.error(error.response.data.messages.email);
            toast.error(error.response.data.messages.password);
        } else if (error.response.data.errors.message) {
            toast.error(error.response.data.errors.message);
        } else {
            toast.error('Try again!');
        }
    });
} 

export const logoutAdnin = async (dispatch) => {
    dispatch(logout());
}