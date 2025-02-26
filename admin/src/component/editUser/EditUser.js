import React, { useContext } from 'react';
import { ArrowCircleRight } from 'iconsax-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './editUser.scss';

import { EmailContext } from '../../context/emailContext/EmailContext';
import { UsersContext } from '../../context/usersContext/UsersContext';
import { editOneUser } from '../../context/usersContext/apiCalls';

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

const EditUser = ({ item, setItem, usersStatus, setUsersStatus }) => {
    const { user, emailDispatch } = useContext(EmailContext);
    const { isFetchingUsers, dispatchUsers } = useContext(UsersContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;

        setItem({ ...item, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (item.frist_name === undefined || item.mobile === undefined || item.frist_name === '' || item.mobile === '') {
            toast.error("Please complete all fields!");
        } else {
            editOneUser(item, item._id, user.token, dispatchUsers, emailDispatch, navigate, usersStatus, setUsersStatus);
        }
    }

    return (
        <div className='editUser'>
            <div className='inputContain'>
                <input
                    name='frist_name'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Edit full name'
                    value={item.frist_name}
                />
            </div>
            <div className='inputContain'>
                <input
                    name='type'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Edit mobile nnumber'
                    value={item.mobile}
                    type={'email'}
                />
            </div>

            <div className='inputContain'>
                <span className='switchTitle'>Is Admin</span>
                <FormControlLabel
                    control={
                        <IOSSwitch sx={{ m: 1 }}
                            checked={item.statusActive === true ? true : false } onChange={(e) => {
                                setItem({ ...item, 'statusActive': e.target.checked })
                            }} />}
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
                    setItem(null);
                    setUsersStatus({
                        ...usersStatus,
                        'editUsers': false,
                        'usersList': true,
                    });
                }}>
                    <div className='innerBtn'>
                        Cancel
                    </div>
                </button>
            </div>
        </div>
    );
};

export default EditUser;