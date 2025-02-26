import React, { useContext, useState } from 'react';
import { ArrowCircleRight } from 'iconsax-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './addOneUser.scss';

import { EmailContext } from '../../context/emailContext/EmailContext';
import { UsersContext } from '../../context/usersContext/UsersContext';
import { addUser } from '../../context/usersContext/apiCalls';

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

const AddOneUser = ({ usersStatus, setUsersStatus }) => {
    const [userData, setUserData] = useState({
        'roles': '640fe32e3dc0f57e6f41ceb7'
    });

    const { user, emailDispatch } = useContext(EmailContext);
    const { isFetchingUsers, dispatchUsers } = useContext(UsersContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;

        setUserData({ ...userData, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userData.frist_name === undefined || userData.email === undefined || userData.mobile === undefined || userData.password === undefined || userData.frist_name === '' || userData.email === '' || userData.mobile === '' || userData.password === '') {
            toast.error("Please complete all fields!");
        } else {
            addUser(userData, user.token, dispatchUsers, emailDispatch, navigate, usersStatus, setUsersStatus);
        }
    }

    return (
        <div className='addOneUser'>
            <div className='card'>
                <div className='inputContain'>
                    <input
                        name='frist_name'
                        onChange={handleChange}
                        className='loginInput'
                        placeholder='Enter full name'
                    />
                </div>

                <div className='inputContain'>
                    <input
                        name='email'
                        onChange={handleChange}
                        className='loginInput'
                        placeholder='Enter email'
                    />
                </div>

                <div className='inputContain'> 
                    <input
                        name='mobile'
                        onChange={handleChange}
                        className='loginInput'
                        placeholder='Enter mobile (981111111111)'
                    />
                </div>

                <div className='inputContain'>
                    <span className='switchTitle'>Is Admin</span>
                    <FormControlLabel
                        control={
                            <IOSSwitch sx={{ m: 1 }}
                                checked={userData.roles === '640fe32e3dc0f57e6f41ceb7' ? false : true} onChange={(e) => {
                                    e.target.checked ? setUserData({ ...userData, 'roles': '640fe3623dc0f57e6f41cebe' }) : setUserData({ ...userData, 'roles': '640fe32e3dc0f57e6f41ceb7' })
                                }} />}
                    />
                </div>

                <div className='inputContain'>
                    <input
                        name='password'
                        onChange={handleChange}
                        className='loginInput'
                        placeholder='Enter password'
                    />
                </div>

                <div className='btnContain'>
                    <button className='btn' disabled={isFetchingUsers} onClick={handleSubmit}>
                        {!isFetchingUsers ?
                            <div className='innerBtn'>
                                Submit
                                <ArrowCircleRight color='#fff' size={20} variant='Bold' style={{ marginLeft: '5px' }} />
                            </div>
                            :
                            <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                        }
                    </button>

                    <button className='btnCancel' disabled={isFetchingUsers} onClick={() => {
                        setUsersStatus({
                            ...usersStatus,
                            'addUsers': false,
                            'usersList': true,
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

export default AddOneUser;