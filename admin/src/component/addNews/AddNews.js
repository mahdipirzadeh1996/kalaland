import React, { useContext, useState } from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { toast } from 'react-toastify';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useNavigate } from 'react-router-dom';

import './addNews.scss';

import { NewsContext } from '../../context/newContext/NewsContext';
import { EmailContext } from '../../context/emailContext/EmailContext';
import { addNews } from '../../context/newContext/apiCalls';

const override = css`
display: block;
`;

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 45,
    height: 22,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(25px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#fff',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
            '& .MuiSwitch-thumb': {
                boxSizing: 'border-box',
                width: 18,
                height: 18,
                backgroundColor: '#13CC68'
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18,
        height: 18,
        backgroundColor: 'red'
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const AddNews = ({ newsStatus, setNewsStatus }) => {
    const [news, setNews] = useState('');
    const [img, setImg] = useState(null);

    const { user, emailDispatch } = useContext(EmailContext);
    const { isFetching, dispatchNews } = useContext(NewsContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (news.title === undefined || news.description === undefined || news.image === undefined || news.title === '' || news.description === '' || news.image === '') {
            toast.error("Please complete all fields!");
        } else {
            addNews(news, user.token, dispatchNews, emailDispatch, navigate, newsStatus, setNewsStatus);
        }
    }

    return (
        <div className='addNews'>
            <div className='card'>
                <div className='imgNewsContain'>
                    <img className='imgNews' src={news.image ? URL.createObjectURL(news.image) : require('../../images/defaultImg.png')} alt='News1' />
                </div>

                <div className="addProductItem">
                    <input
                        type="file"
                        id="img"
                        name={"image"}
                        onChange={(e) => setNews({ ...news, [e.target.name]: e.target.files[0] })}
                    />
                </div>

                <span className='newsTopic'>Fx News</span>

                <div className='contain'>
                    <div className='part3' style={{ flex: 1 }}>
                        <TextareaAutosize
                            name={'title'}
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
                                Add
                            </div>
                            :
                            <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                        }
                    </button>

                    <button className='btnCancel' onClick={() => {
                        setNewsStatus({
                            ...newsStatus,
                            'addNews': false,
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

export default AddNews;