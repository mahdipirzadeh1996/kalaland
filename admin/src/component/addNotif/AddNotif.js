import React, { useState, useContext } from 'react';
import { ArrowCircleRight } from 'iconsax-react';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import './addNotif.scss';

import { EmailContext } from '../../context/emailContext/EmailContext';
import { NotifContext } from '../../context/notifContext/NotifContext';
import { addNotif } from '../../context/notifContext/apiCalls';

const override = css`
display: block;
`;

const AddNotif = ({ notifStatus, setNotifStatus }) => {
    const [notif, setNotif] = useState({})

    const { user, emailDispatch } = useContext(EmailContext);
    const { isFetchingNotif, dispatchNotif } = useContext(NotifContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;

        setNotif({ ...notif, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (notif.userID === undefined || notif.title === undefined || notif.descri === undefined || notif.userID === '' || notif.title === '' || notif.descri === '') {
            toast.error("Please complete all fields!");
        } else {
            addNotif(notif, user.token, navigate, dispatchNotif, emailDispatch, notifStatus, setNotifStatus);
        }
    }

    return (
        <div className='addNotif'>
            <div className='inputContain'>
                <input
                    name='userID'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Enter user ID'
                />
            </div>

            <div className='inputContain'>
                <input
                    name='title'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Enter title'
                />
            </div>

            <div className='contain'>
                <div className='part3' style={{ flex: 1 }}>
                    <TextareaAutosize
                        name={'descri'}
                        onChange={(e) => setNotif({ ...notif, [e.target.name]: e.target.value })}
                        placeholder="Enter your describtion"
                        className={'inputArea'}
                        style={{ height: '10rem' }}
                    />
                </div>
            </div>

            <div className='btnContain'>
                <button className='btn' disabled={isFetchingNotif} onClick={handleSubmit}>
                    {!isFetchingNotif ?
                        <div className='innerBtn'>
                            Submit
                            <ArrowCircleRight color='#fff' size={20} variant='Bold' style={{ marginLeft: '5px' }} />
                        </div>
                        :
                        <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                    }
                </button>

                <button className='btnCancel' disabled={isFetchingNotif} onClick={() => {
                    setNotifStatus({
                        ...notifStatus,
                        'addNotif': false,
                        'notifList': true,
                    });
                }}>
                    <div className='innerBtn'>
                        Cancel
                    </div>
                </button>
            </div>
        </div>
    )
}

export default AddNotif