import axios from "axios";
import { toast } from 'react-toastify';

import { ticketStart, ticketSuccess, ticketFailure } from "./TicketAction";
import { logout } from '../emailContext/EmailActions';

export const getTickets = async (token, dispatch, dispatchEmail, navigate) => {
    dispatch(ticketStart());

    axios.get(window.$url +"/api/admin/ticket/all-conversation", {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(ticketSuccess(res.data.data.result));
    }).catch((error) => {
        dispatch(ticketFailure());

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

export const answerTicket = async (data, token, dispatch, dispatchEmail, navigate, parentID, attach) => {
    dispatch(ticketStart());

    axios.post(window.$url +"/api/admin/ticket/add", {
        text: data.text,
        parentID
    }, {
        headers: {
            token
        }
    }).then((res) => {
        if (attach !== null) {
            toast.success(res.data.data.message)
            addAttach(attach, token, dispatch, dispatchEmail, navigate, res.data.data.result._id, res.data.data.result);
        } else {
            toast.success(res.data.data.message)
            dispatch(ticketSuccess(res.data.data.result));
            window.location.reload();
        }
    }).catch((error) => {
        dispatch(ticketFailure());

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

export const addAttach = async (attach, token, dispatch, dispatchEmail, navigate, id, data) => {
    const formData = new FormData();

    formData.append("imgName", "img");
    formData.append("ticket", attach);

    axios.patch(window.$url +`/api/admin/ticket/edit-imagetiket/${id}`, formData, {
        headers: {
            token
        }
    }).then((res) => {
        dispatch(ticketSuccess(data));
        toast.success(res.data.data.message);
        window.location.reload();
    }).catch((error) => {
        dispatch(ticketFailure());

        if (error.response.data.errors) {
            toast.error(error.response.data.errors.message);

            if (error.response.data.errors.message === 'Please login') {
                dispatchEmail(logout());

                navigate('/')
            }
        } else {
            toast.error('Try again!');
            console.log(error)
        }
    });
}

// export const editOneUser = async (data, id, token, dispatch, dispatchEmail, navigate, usersStatus, setUsersStatus) => {
//     dispatch(usersStart());

//     axios.patch(`/api/admin/ticket/close-ticket/${id}`,
//         {},
//         {
//             headers: {
//                 token,
//             },
//         }
//     ).then((res) => {
//         dispatch(usersSuccess(data));

//         setUsersStatus({
//             ...usersStatus,
//             'editUsers': false,
//             'usersList': true,
//         });
        
//         toast.success(res.data.message);
//     }).catch((error) => {
//         dispatch(usersFailure());

//         error.response.data.messages && toast.error(error.response.data.messages.id);
//         error.response.data.errors && toast.error(error.response.data.errors.message);
        
//         if (error.response.data.errors.message === 'Please login') {
//             dispatchEmail(logout());
//             navigate('/')
//         }
//     });
// }

// export const deleteNews = async (id, token, dispatch, dispatchEmail, setDeleteDialog, navigate) => {
//     await axios.delete(`/api/admin/news/remove-news/${id}`, {
//         headers: {
//             token
//         }
//     }).then((res) => {
//         dispatch(newsSuccess(res.data.allNews));
//         setDeleteDialog(false);
//     }).catch((error) => {
//         toast.error('Try again!');

//         error.response.data.messages && toast.error(error.response.data.messages.id);
//         error.response.data.errors && toast.error(error.response.data.errors.message);
        
//         if (error.response.data.errors.message === 'Please login') {
//             dispatchEmail(logout());
//             navigate('/')
//         }
//     });
// }