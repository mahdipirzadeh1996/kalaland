import axios from "axios";
import { toast } from 'react-toastify';

import { newsFailure, newsStart, newsSuccess } from "./NewsAction";
import { logout } from '../emailContext/EmailActions';

export const addNews = async (data, token, dispatchNews, dispatchEmail, navigate, newsStatus, setNewsStatus) => {
    dispatchNews(newsStart());
    
    const formData = new FormData();

    formData.append("imgName", "img");
    formData.append("data", JSON.stringify(data));
    formData.append("image", data.image);

    axios.post(window.$url +"/api/admin/news/create-news", formData, {
        headers: {
            token
        }
    }).then((res) => {
        dispatchNews(newsSuccess(res.data.message));
        toast.success(res.data.message);

        setNewsStatus({
            ...newsStatus,
            'addNews': false,
            'newsList': true,
        });
    }).catch((error) => {
        dispatchNews(newsFailure());

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

export const getNews = async (token, dispatchNews, dispatchEmail, navigate) => {
    dispatchNews(newsStart());

    axios.get(window.$url +"/api/admin/news/news-list", {
        headers: {
            token
        }
    }).then((res) => {
        dispatchNews(newsSuccess(res.data.data.result));
    }).catch((error) => {
        dispatchNews(newsFailure());

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

export const editNews = async (data, id, token, dispatchNews, dispatchEmail, navigate, newsStatus, setNewsStatus) => {
    dispatchNews(newsStart());

    axios.put(window.$url +`/api/admin/news/edit-news/${id}`,
        {
            data
        },
        {
            headers: {
                token,
            },
        }
    ).then((res) => {
        dispatchNews(newsSuccess(res.data.news));

        setNewsStatus({
            ...newsStatus,
            'editNews': false,
            'newsList': true,
        });
        
        toast.success(res.data.message);
    }).catch((error) => {
        dispatchNews(newsFailure());
        console.log('error: '+ error)

        error.response.data.messages && toast.error(error.response.data.messages.id);
        error.response.data.errors && toast.error(error.response.data.errors.message);
        
        if (error.response.data.errors.message === 'Please login') {
            dispatchEmail(logout());
            navigate('/')
        }
    });
}

export const deleteNews = async (id, token, dispatch, dispatchEmail, setDeleteDialog, navigate) => {
    await axios.delete(window.$url +`/api/admin/news/remove-news/${id}`, {
        headers: {
            token
        }
    }).then((res) => {
        // dispatch(newsSuccess(res.data.allNews));
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