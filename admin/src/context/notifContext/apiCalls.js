import axios from "axios";
import { toast } from 'react-toastify';

import { notifFailure, notifStart, notifSuccess } from "./NotifAction";
import { logout } from '../emailContext/EmailActions';

export const addNotif = async (notif, token, navigate, dispatch, dispatchEmail, notifStatus, setNotifStatus) => {
    dispatch(notifStart());

    let time = new Date();

    axios.post(window.$url +"/api/admin/notif/create-notif", {
        userID: notif.userID,
        title: notif.title,
        descri: notif.descri,
        type: 1,
        date: time.toISOString()
    }, {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(notifSuccess(null));
        toast.success(res.data.message);

        setNotifStatus({
            ...notifStatus,
            'addNotif': false,
            'notifList': true,
        });
    }).catch((error) => {
        dispatch(notifFailure());

        if (error.response.data.errors?.message !== undefined) {
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

export const getNotif = async (token, dispatch, dispatchh, navigate) => {
    dispatch(notifStart());

    axios.get(window.$url +"/api/admin/notif/notif-list", {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(notifSuccess(res.data.data.result));
    }).catch((error) => {
        dispatch(notifFailure());

        if (error.response.data.errors.message) {
            toast.error(error.response.data.errors.message);

            if (error.response.data.errors.message === 'Please login') {
                dispatchh(logout());

                navigate('/')
            }
        } else {
            toast.error('Try again!');
        }
    });
}

export const editPlan = async (id, title, descri, type, date, token, setItem, dispatch, dispatchEmail, navigate) => {
    dispatch(notifStart());

    axios.put(window.$url +`/api/admin/notif/edit-notif/${id}`,
        {
            id,
            title,
            descri,
            type,
            date
        },
        {
            headers: {
                token,
            },
        }
    ).then((res) => {
        dispatch(notifSuccess(null));
        setItem(res.data.package);
        toast.success(res.data.message);
    }).catch((error) => {
        dispatch(notifFailure());

        if (error.response?.data.errors.message) {
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

export const deleteNotif = async (id, token, dispatch, dispatchEmail, setDeleteDialog, navigate) => {
    await axios.delete(window.$url +`/api/admin/notif/remove-notif/${id}`, {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(notifSuccess(res.data.allPackages));
        setDeleteDialog(false);
    }).catch((error) => {
        toast.error('Try again!');
        dispatch(notifFailure());

        error.response.data.messages && toast.error(error.response.data.messages.id);
        error.response.data.errors && toast.error(error.response.data.errors.message);

        if (error.response.data.errors.message === 'Please login') {
            dispatchEmail(logout());
            navigate('/')
        }
    });
}

export const logoutAdmin = async (dispatch) => {
    dispatch(logout());
}