import axios from "axios";
import { toast } from 'react-toastify';

import { ticketInfoFailure, ticketInfoStart, ticketInfoSuccess } from "./TicketInfoActions";

import { logout } from '../emailContext/EmailActions';

export const getTicketInfo = async (token, dispatch, dispatchEmail, navigate, id) => {
    dispatch(ticketInfoStart());

    axios.get(window.$url +`/api/admin/ticket/ticketinfo/${id}`, {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(ticketInfoSuccess(res.data.data.result));
    }).catch((error) => {
        dispatch(ticketInfoFailure());

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

export const closeTicket = async (token, dispatch, dispatchEmail, navigate, id) => {
    dispatch(ticketInfoStart());

    axios.patch(window.$url +`/api/admin/ticket/close-ticket/${id}`,{}, {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(ticketInfoSuccess(res.data.data.result));
        window.location.reload() 
    }).catch((error) => {
        dispatch(ticketInfoFailure());

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