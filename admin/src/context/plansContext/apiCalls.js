import axios from "axios";
import { toast } from 'react-toastify';

import { plansFailure, plansStart, plansSuccess } from "./PlansAction";
import { logout } from '../emailContext/EmailActions';

export const addPlan = async (plan, token, dispatch, planStatus, setPlanStatus, navigate, dispatchEmail) => {
    dispatch(plansStart());

    axios.post(window.$url +"/api/admin/package/addPlan", { plan }, {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(plansSuccess(null));
        toast.success(res.data.message);

        setPlanStatus({
            ...planStatus,
            'addPlan': false,
            'planList': true,
        });
    }).catch((error) => {
        dispatch(plansFailure());

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

export const getPlans = async (token, dispatch, dispatchh, navigate) => {
    dispatch(plansStart());

    axios.get(window.$url +"/api/admin/package/list", {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(plansSuccess(res.data.data.result));
    }).catch((error) => {
        dispatch(plansFailure());

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

export const editPlan = async (data, id, token, setItem, dispatch, navigate, dispatchEmail) => {
    dispatch(plansStart());

    axios.put(window.$url +`/api/admin/package/edit/${id}`,
        {
            data
        },
        {
            headers: {
                token,
            },
        }
    ).then((res) => {
        dispatch(plansSuccess(null));
        setItem(res.data.package);
        toast.success(res.data.message);
    }).catch((error) => {
        dispatch(plansFailure());

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

export const deletePlan = async (id, token, dispatch, setDeleteDialog, navigate, dispatchEmail) => {
    await axios.delete(window.$url +`/api/admin/package/remove/${id}`, {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(plansSuccess(res.data.allPackages));
        setDeleteDialog(false);
    }).catch((error) => {
        toast.error('Try again!');

        error.response.data.messages && toast.error(error.response.data.messages.id);
        error.response.data.errors && toast.error(error.response.data.errors.message);

        if (error.response.data.errors.message === 'Please login') {
            dispatchEmail(logout());
            navigate('/')
        }
    });
}