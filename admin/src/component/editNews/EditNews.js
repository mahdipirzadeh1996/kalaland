import React, { useContext, useState } from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { EmailContext } from '../../context/emailContext/EmailContext';
import { NewsContext } from '../../context/newContext/NewsContext';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './editNews.scss';

import { editNews } from '../../context/newContext/apiCalls';

const override = css`
display: block;
`;

const EditNews = ({ item, newsStatus, setNewsStatus }) => {
    const [news, setNews] = useState({
        title: item.title,
        description: item.description
    });

    const { user, emailDispatch } = useContext(EmailContext);
    const { isFetching, dispatchNews } = useContext(NewsContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (news.title === undefined || news.description === undefined || news.title === '' || news.description === '') {
            toast.error("Please complete all fields!");
        } else {
            editNews(news, item._id, user.token, dispatchNews, emailDispatch, navigate, newsStatus, setNewsStatus);
        }
    }

    return (
        <div className='editNews'>
            <div className='card'>
                <span className='newsTopic'>Fx News</span>

                <div className='contain'>
                    <div className='part3' style={{ flex: 1 }}>
                        <TextareaAutosize
                            name={'title'}
                            defaultValue={item.title}
                            onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })}
                            placeholder="Enter your title"
                            className={'inputArea'}
                            style={{ height: '10rem' }}
                        />
                    </div>
                </div>

                <div className='contain'>
                    <div className='part3' style={{ flex: 1 }}>
                        <TextareaAutosize
                            name={'description'}
                            defaultValue={item.description}
                            onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })}
                            placeholder="Enter your describtion"
                            className={'inputArea'}
                            style={{ height: '10rem' }}
                        />
                    </div>
                </div>

                <div className='newsFooter'>
                    <button className='btn' disabled={isFetching} onClick={handleSubmit}>
                        {!isFetching ?
                            <div className='innerBtn'>
                                Submit
                            </div>
                            :
                            <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                        }
                    </button>

                    <button className='btnCancel' onClick={() => {
                        setNewsStatus({
                            ...newsStatus,
                            'editNews': false,
                            'newsList': true,
                        });
                    }}>
                        <div className='innerBtn'>
                            Cancel
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditNews;