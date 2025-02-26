import React, { useState, useContext } from 'react';
import { ArrowCircleRight } from 'iconsax-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './addPlan.scss';

import { EmailContext } from '../../context/emailContext/EmailContext';
import { PlansContext } from '../../context/plansContext/PlansContext';
import { addPlan } from '../../context/plansContext/apiCalls';

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

const AddPlan = ({ planStatus, setPlanStatus }) => {
    const [plan, setPlan] = useState({
        'statusSupport': false,
        'statusVS': false,
        'statusAccSt': false,
    });

    const { user, emailDispatch } = useContext(EmailContext);
    const { isFetching, dispatch } = useContext(PlansContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;

        setPlan({ ...plan, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (plan.statusVS) {
            if (plan.name === undefined || plan.type === undefined || plan.expireDate === undefined || plan.price === undefined || plan.inventoryLimit === undefined || plan.dateVS === undefined || plan.name === '' || plan.type === '' || plan.expireDate === '' || plan.price === '' || plan.inventoryLimit === '' || plan.dateVS === '') {
                toast.error("Please complete all fields!");
            } else {
                addPlan(plan, user.token, dispatch, planStatus, setPlanStatus, navigate, emailDispatch);
            }
        } else {
            if (plan.name === undefined || plan.type === undefined || plan.expireDate === undefined || plan.price === undefined || plan.inventoryLimit === undefined || plan.name === '' || plan.type === '' || plan.expireDate === '' || plan.price === '' || plan.inventoryLimit === '') {
                toast.error("Please complete all fields!");
            } else {
                addPlan(plan, user.token, dispatch, planStatus, setPlanStatus, navigate, emailDispatch);
            }
        }
    }

    return (
        <div className='addPlan'>
            <div className='inputContain'>
                <input
                    name='name'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Enter package name'
                />
            </div>
            <div className='inputContain'>
                <input
                    name='type'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Enter package type'
                    type={'email'}
                />
            </div>
            <div className='inputContain'>
                <input
                    name='expireDate'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Enter package license date in month'
                    type={'number'}
                />
            </div>
            <div className='inputContain'>
                <input
                    name='price'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Enter package price'
                    type={'number'}
                />
            </div>
            <div className='inputContain'>
                <input
                    name='inventoryLimit'
                    onChange={handleChange}
                    className='loginInput'
                    placeholder='Enter inventory limit'
                />
            </div>

            <div className='inputContain'>
                <span className='switchTitle'>Support Status</span>
                <FormControlLabel
                    control={
                        <IOSSwitch sx={{ m: 1 }}
                            checked={plan.statusSupport} onChange={(e) => {
                                setPlan({ ...plan, 'statusSupport': e.target.checked });
                            }} />}
                />
            </div>

            <div className='inputContain'>
                <span className='switchTitle'>Virtual Server Status</span>
                <FormControlLabel
                    control={
                        <IOSSwitch sx={{ m: 1 }}
                            checked={plan.statusVS} onChange={(e) => {
                                setPlan({ ...plan, 'statusVS': e.target.checked });
                            }} />}
                />
            </div>

            {plan.statusVS &&
                <div className='inputContain'>
                    <input
                        name='dateVS'
                        onChange={handleChange}
                        className='loginInput'
                        placeholder='Enter virtual server time in month'
                        type={'number'}
                    />
                </div>
            }

            <div className='inputContain'>
                <span className='switchTitle'>Access Setting Status</span>
                <FormControlLabel
                    control={
                        <IOSSwitch sx={{ m: 1 }}
                            checked={plan.statusAccSt} onChange={(e) => {
                                setPlan({ ...plan, 'statusAccSt': e.target.checked });
                            }} />}
                />
            </div>



            <div className='btnContain'>
                <button className='btn' disabled={isFetching} onClick={handleSubmit}>
                    {!isFetching ?
                        <div className='innerBtn'>
                            Submit
                            <ArrowCircleRight color='#fff' size={20} variant='Bold' style={{ marginLeft: '5px' }} />
                        </div>
                        :
                        <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                    }
                </button>

                <button className='btnCancel' disabled={isFetching} onClick={() => {
                    setPlanStatus({
                        ...planStatus,
                        'addPlan': false,
                        'planList': true,
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

export default AddPlan;