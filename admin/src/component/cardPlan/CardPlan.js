import React, { useEffect, useContext, useState, useRef } from 'react';
import {
    EmptyWallet,
    UserAdd,
    CloudConnection,
    Code1,
    TickSquare,
    CloseSquare,
    Edit,
    CardRemove
} from 'iconsax-react';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import './cardPlan.scss';
import DeletePlanDialog from '../deletePlanDialog/DeletePlanDialog';

import { getPlans, deletePlan } from '../../context/plansContext/apiCalls';
import { PlansContext } from '../../context/plansContext/PlansContext';
import { EmailContext } from '../../context/emailContext/EmailContext';

const override = css`
display: block;
`;

const CardPlan = ({ item, setItem, planStatus, setPlanStatus, }) => {
    const [deleteDialog, setDeleteDialog] = useState(false);

    const fetch = useRef(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (fetch.current) {
            fetch.current = false;

            getPlans(user.token, dispatch, emailDispatch, navigate)
        }
    }, []);

    const { user, emailDispatch } = useContext(EmailContext);
    const { plans, isFetching, dispatch } = useContext(PlansContext);

    const setHederColor = (type) => {
        switch (type) {
            case '0':
                return ('#898888');
            case '1':
                return ('#4D77E2');
            case '2':
                return ('#D7C100');
            default:
                return ('#898888');
        }
    }

    const handleDelete = () => {
        deletePlan(item._id, user.token, dispatch, setDeleteDialog, navigate, emailDispatch);
    }

    return (
        <>
            {
                !isFetching ?
                    plans?.map((item, index) => (
                        <div className='cardContain' key={index}>
                            <div className='cardPlan'>
                                <div className='cardHeader' style={{ backgroundColor: setHederColor(item.type) }}>
                                    {item.name}
                                    <div className='triangle' style={{ backgroundColor: setHederColor(item.type) }} />

                                    <button className='btnEdit' onClick={() => {
                                        setItem(item);
                                        setPlanStatus({
                                            ...planStatus,
                                            'editPlan': true,
                                            'planList': false,
                                        });
                                    }}>
                                        <div className='innerBtn'>
                                            <Edit color='#fff' size={18} />
                                        </div>
                                    </button>

                                    <button className='btnDelete' onClick={() => {
                                        setItem(item);
                                        setDeleteDialog(true);
                                    }}>
                                        <div className='innerBtn'>
                                            <CardRemove color='#fff' size={18} />
                                        </div>
                                    </button>
                                </div>

                                <div className='bodyContain'>
                                    <div className='first'>
                                        <span className='other'>$</span>
                                        <span className='price'>{item.price}</span>
                                        <span className='other'>/{item.expireDate}months</span>
                                        <div className='line' />
                                    </div>
                                    <div className='second'>
                                        <div className='infoContain'>
                                            <div className='infoLeft'>
                                                <EmptyWallet size="18" color="#ffffff" />
                                            </div>
                                            <div className='infoMiddle'>
                                                Inventory limit
                                            </div>
                                            <div className='infoRight'>
                                                {item.inventoryLimit}
                                            </div>
                                        </div>
                                        <div className='infoContain'>
                                            <div className='infoLeft'>
                                                <UserAdd size="18" color="#ffffff" />
                                            </div>
                                            <div className='infoMiddle'>
                                                {item.statusSupport ?
                                                    'Standard support'
                                                    :
                                                    'Basic support'
                                                }
                                            </div>
                                            <div className='infoRight'>
                                                <TickSquare className='infoIcon' size={20} style={{ color: '#13CC68' }} />
                                            </div>
                                        </div>
                                        <div className='infoContain'>
                                            <div className='infoLeft'>
                                                <CloudConnection size="18" color="#ffffff" />
                                            </div>
                                            <div className='infoMiddle'>
                                                Virtual server
                                            </div>
                                            <div className='infoRight'>
                                                {item.statusVS ?
                                                    item.dateVS + '/month'
                                                    :
                                                    <CloseSquare className='infoIcon' size={20} style={{ color: '#CF1B26' }} />
                                                }
                                            </div>
                                        </div>
                                        <div className='infoContain'>
                                            <div className='infoLeft'>
                                                <Code1 size="18" color="#ffffff" />
                                            </div>
                                            <div className='infoMiddle'>
                                                Setting up
                                            </div>
                                            <div className='infoRight'>
                                                <TickSquare className='infoIcon' size={20} style={{ color: '#13CC68' }} />
                                            </div>
                                        </div>
                                        <div className='infoContain'>
                                            <div className='infoLeft'>
                                                <Code1 size="18" color="#ffffff" />
                                            </div>
                                            <div className='infoMiddle'>
                                                Access settings
                                            </div>
                                            <div className='infoRight'>
                                                {item.statusAccSt ?
                                                    <TickSquare className='infoIcon' size={20} style={{ color: '#13CC68' }} />
                                                    :
                                                    <CloseSquare className='infoIcon' size={20} style={{ color: '#CF1B26' }} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {deleteDialog &&
                                <DeletePlanDialog handleDelete={handleDelete} isFetching={isFetching} setDeleteDialog={setDeleteDialog} />
                            }
                        </div>
                    ))
                    :
                    <div className='loadContain'>
                        <BounceLoader
                            color={"#fff"}
                            loading={true}
                            css={override}
                            size={50}
                        />
                    </div>
            }
            <div className='loadContain' style={{
                display: plans?.length !== 0 ? 'none' : 'flex'
            }}>
                No News
            </div>
        </>
    );
};

export default CardPlan;