import axios from "axios";
import { toast } from 'react-toastify';

import { usersFailure, usersStart, usersSuccess } from "./UsersAction";
import { logout } from '../emailContext/EmailActions';

export const addUser = async (data, token, dispatchUsers, dispatchEmail, navigate, usersStatus, setUsersStatus) => {
    dispatchUsers(usersStart());

    axios.post(window.$url +"/api/admin/user/create-user", {
        frist_name: data.frist_name,
        username: data.username,
        email: data.email,
        mobile: data.mobile,
        roles: data.roles,
        password: data.password
    }, {
        headers: {
            token
        }
    }).then((res) => {
        dispatchUsers(usersSuccess(res.data.data.result));
        toast.success(res.data.message);

        setUsersStatus({
            ...usersStatus,
            'addUsers': false,
            'usersList': true,
        });
    }).catch((error) => {
        dispatchUsers(usersFailure());

        if (error.response.data.errors) {
            toast.error(error.response.data.errors.message);

            if (error.response.data.errors.message === 'Please login') {
                dispatchEmail(logout());

                navigate('/')
            }
        } else {
            toast.error('Try again!');
        }
    });
}

export const getUsers = async (token, dispatchUsers, dispatchEmail, navigate) => {
    dispatchUsers(usersStart());

    axios.get(window.$url +"/api/admin/user/user-list", {
        headers: {
            token
        }
    }).then((res) => {
        dispatchUsers(usersSuccess(res.data.data.result));
    }).catch((error) => {
        dispatchUsers(usersFailure());

        if (error.response.data.errors.message) {
            toast.error(error.response.data.errors.message);

            if (error.response.data.errors.message === 'Please login') {
                dispatchEmail(logout());

                navigate('/')
            }
        } else {
            toast.error('Try again!');
        }
    });
}

export const editOneUser = async (data, id, token, dispatch, dispatchEmail, navigate, usersStatus, setUsersStatus) => {
    dispatch(usersStart());

    axios.put(window.$url +`/api/admin/user/edit-user/${id}`,
        {
            frist_name: data.frist_name,
            mobile: data.mobile,
            statusActive: data.statusActive
        },
        {
            headers: {
                token,
            },
        }
    ).then((res) => {
        dispatch(usersSuccess(data));

        setUsersStatus({
            ...usersStatus,
            'editUsers': false,
            'usersList': true,
        });
        
        console.log(res.data);
        toast.success(res.data.message);
    }).catch((error) => {
        dispatch(usersFailure());

        error.response.data.messages && toast.error(error.response.data.messages.id);
        error.response.data.errors && toast.error(error.response.data.errors.message);
        
        if (error.response.data.errors.message === 'Please login') {
            dispatchEmail(logout());
            navigate('/')
        }
    });
}

export const deleteUser = async (id, token, dispatch, setDeleteDialog, navigate, dispatchEmail) => {
    dispatch(usersStart());

    await axios.delete(window.$url +`/api/admin/user/remove-user/${id}`, {
        headers: {
            token
        }
    }).then((res) => {
        toast("Delete successfuly!");
        getUsers(token, dispatch, dispatchEmail, navigate);
        setDeleteDialog(false);
    }).catch((error) => {
        dispatch(usersFailure());

        toast.error('Try again!');

        error.response.data.messages && toast.error(error.response.data.messages.id);
        error.response.data.errors && toast.error(error.response.data.errors.message);
        
        if (error.response.data.errors.message === 'Please login') {
            dispatchEmail(logout());
            navigate('/')
        }
    });
}