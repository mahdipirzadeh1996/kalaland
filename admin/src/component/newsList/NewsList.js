import React, { useEffect, useContext, useState, useRef } from 'react';
import {
    Edit,
    CardRemove
} from 'iconsax-react';
import { useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import moment from 'moment';

import './newsList.scss';
import DeleteNewsDialog from '../deleteNewsDialog/DeleteNewsDialog';

import { getNews, deleteNews } from '../../context/newContext/apiCalls';
import { NewsContext } from '../../context/newContext/NewsContext';
import { EmailContext } from '../../context/emailContext/EmailContext';

const override = css`
display: block;
`;

const NewsList = ({ item, setItem, newsStatus, setNewsStatus }) => {
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const { user, emailDispatch } = useContext(EmailContext);
    const { news, isFetching, dispatchNews } = useContext(NewsContext);

    const fetch = useRef(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (fetch.current) {
            fetch.current = false;

            getNews(user.token, dispatchNews, emailDispatch, navigate);
        }
    }, []);

    const handleDelete = () => {
        deleteNews(item._id, user.token, dispatchNews, emailDispatch, setDeleteDialog, navigate);
    }

    return (
        <>
            {
                !isFetching ?
                    news?.map((item, index) => (
                        <div className='newsListContain' key={index}>
                            <div className='newsList'>
                                <div className='operation'>
                                    <button className='btn' onClick={() => {
                                        setItem(item);
                                        setNewsStatus({
                                            ...newsStatus,
                                            'editNews': true,
                                            'newsList': false,
                                        });
                                    }}>
                                        <div className='innerBtn'>
                                            <Edit color='#fff' size={18} />
                                        </div>
                                    </button>

                                    <button className='btn' onClick={() => {
                                        setItem(item);
                                        setDeleteDialog(true);
                                    }}>
                                        <div className='innerBtn'>
                                            <CardRemove color='#fff' size={18} />
                                        </div>
                                    </button>
                                </div>

                                <div className='imgNewsContain'>
                                    <img
                                        className='imgNews'
                                        src={!loading ? `http://69.57.163.60:3030${item.image}` : require('../../images/defaultImg.png')}
                                        alt={item.title}
                                        onLoad={() => setLoading(false)}
                                    />
                                </div>

                                <span className='newsTopic'>Fx News</span>
                                <span className='newsBold'>{item.title}</span>
                                <soan className='newss'>{item.description}</soan>

                                <div className='newsFooter'>
                                    <span className='newsLeft'>By Saeed Yoosefi</span>
                                    <span className='newsRight'>{moment.utc(item.updatedAt).local().startOf('seconds').fromNow()}</span>
                                </div>
                                {/* <span className='newsTopic'>Fx News</span>
                            <span className='newsBold'>Samson Mow Reveals Which Countries May NEVER Adopt BTC as Legal Tender… and Who Might Be Next</span>
                            <soan className='newss'>Mow also said that the real "litmus test" is getting a larger country that isn't suffering economic hardship to embrace Bitcoin as legal tender.</soan>

                            <div className='newsFooter'>
                                <span className='newsLeft'>By Ali Reazai</span>
                                <span className='newsRight'>4h ago</span>
                            </div> */}
                            </div>

                            {deleteDialog &&
                                <DeleteNewsDialog handleDelete={handleDelete} isFetching={isFetching} setDeleteDialog={setDeleteDialog} />
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
                display: news?.length !== 0 ? 'none' : 'flex'
            }}>
                No News
            </div>
        </>
    );
};

export default NewsList;