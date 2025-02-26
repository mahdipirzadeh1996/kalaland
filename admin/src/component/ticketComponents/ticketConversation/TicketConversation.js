import React, { useState, useEffect, useContext, useRef } from 'react';
import {
    Edit,
    Add,
    Minus,
    User,
    Sms,
    MessageText1
} from 'iconsax-react';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useNavigate } from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import './ticketConversation.scss';
import LoaderPage from '../../loaderPage/LoaderPage';
import TicketDialog from '../../ticketDialog/TicketDialog';

import { EmailContext } from '../../../context/emailContext/EmailContext';
import { TicketInfoContext } from '../../../context/ticketInfoContext/TicketInfoContext';
import { getTicketInfo, closeTicket } from '../../../context/ticketInfoContext/apiCalls';
import { TicketContext } from '../../../context/ticketContext/TicketContext';
import { answerTicket } from '../../../context/ticketContext/apiCalls';

const override = css`
  display: block; 
`;

const TicketConversation = ({ setPageType, conversationData }) => {
    const [data, setData] = useState([]);
    const [attach, setAttach] = useState(null);
    const [fileName, setFileName] = useState('No file choosen');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ticketOpen, setTicketOpen] = useState(false);
    const [mainText, setMainText] = useState('');
    const [photo, setPhoto] = useState('');

    const { user, emailDispatch } = useContext(EmailContext);
    const { ticketInfo, isFetchingTicketInfo, dispatchTicketInfo } = useContext(TicketInfoContext);
    const { ticket, isFetchingTicket, dispatchTicket } = useContext(TicketContext);

    useEffect(() => {
        if (conversationData) {
            getTicketInfo(user.token, dispatchTicketInfo, emailDispatch, navigate, conversationData?.ticketNumber);
        }
    }, [conversationData]);

    const navigate = useNavigate();

    const handleTicketClose = () => {
        closeTicket(user.token, dispatchTicketInfo, emailDispatch, navigate, ticketInfo && ticketInfo[0]._id);
    }

    const handleAnswerTicket = () => {
        if (data !== null) {
            if (data.text === undefined || data.text === '') {
                alert("Please complete all fields!");
            } else {
                answerTicket(data, user.token, dispatchTicket, emailDispatch, navigate, ticketInfo && ticketInfo[0]._id, attach);
            }
        } else {
            alert("Please complete all fields!");
        }
    }

    return (
        <div className='container'>
            <div className='ticketConversation1'>
                {
                    conversationData?.statustick !== 'Closed' ?
                        <>
                            <div className='answerBtn' onClick={() => setOpen(!open)}>
                                <div className='iconContain'>
                                    <Edit className='icon' />
                                    Answer
                                </div>

                                {
                                    open ?
                                        <Minus className='icon' />
                                        :
                                        <Add className='icon' />
                                }
                            </div>

                            <div className={open ? 'answerContain' : 'answerContain close'}>
                                <div className='contain'>
                                    <div className='part2' style={{ flex: 1 }}>
                                        <TextareaAutosize
                                            name='text'
                                            placeholder="Enter yout text"
                                            className={'inputArea'}
                                            style={{ height: '10rem' }}
                                            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className='contain'>
                                    <div className='part' style={{ flex: 1 }}>
                                        <div className='iconContain'>
                                            Attachments
                                        </div>

                                        <input
                                            type="file"
                                            id="imgg"
                                            name={"image"}
                                            onChange={(e) => {
                                                setAttach(e.target.files[0])
                                                setFileName(e.target.files[0].name)
                                            }}
                                            hidden
                                        />

                                        <div className='inputContain'>
                                            <div className='fileBtn' onClick={() => document.getElementById('imgg').click()}>
                                                Choose File
                                            </div>

                                            <span className='fileTxt'>{fileName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='footer'>
                                    <button className='cancelBtn' onClick={() => {
                                        setPageType('history');
                                        setOpen(false);
                                    }}>Cancel</button>
                                    <button className='sendBtn' onClick={handleAnswerTicket} disabled={isFetchingTicket}>
                                        {!isFetchingTicket ?
                                            'Send'
                                            :
                                            <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                                        }
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <div className='answerBtn' onClick={() => setPageType('history')}>
                            <div className='iconContain'>
                                Go Back
                            </div>
                        </div>
                }

                {
                    ticketInfo && ticketInfo?.map((item, index) =>
                        <div className='conversationCard' key={index} onClick={() => {
                            setTicketOpen(true);
                            setMainText(item.text);

                            item.image !== '/' && setPhoto(item.image);
                        }}>
                            <div className='userContain'>
                                <img
                                    className='profileImg'
                                    src={
                                        !loading ?
                                            item.isUser ?
                                                require('../../../images/avatar.png')
                                                :
                                                require('../../../images/avatar.png')
                                            :
                                            require('../../../images/avatar.png')}
                                    alt={item.email}
                                    onLoad={() => setLoading(false)}
                                />

                                <span className='nameTxt'>{item.email}</span>
                                <span className='typeTxt'>{item.isUser ? 'Customer' : 'Admin'}</span>
                                <span className='dateTxt'>{Date(item.createdAt).substring(4, 15)}</span>
                            </div>
                            <div className='contentContain'>
                                <span className='contentTxt'>{item.text}</span>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className='ticketConversation2'>
                <div className='infoContain'>
                    <div className='infoRow'>
                        <MessageText1 className='infoIcon' />
                        <span className='infoTitle'>Ticket information</span>
                    </div>

                    <div className='infoRow'>
                        <span className='rowLeft'>Ticket number</span>
                        <span className='rowRight' style={{ color: '#0088EA' }}>{conversationData?.ticketNumber}</span>
                    </div>

                    <div className='seperator' />

                    <div className='infoRow'>
                        <span className='rowLeft'>Topic</span>
                        <span className='rowRight'>{conversationData?.topic}</span>
                    </div>

                    <div className='seperator' />

                    <div className='infoRow'>
                        <span className='rowLeft'>Status</span>
                        <span className='rowRight' style={{ color: conversationData?.statustick === 'Close' ? '#EA0F0F' : '#13CC68' }}>{conversationData?.statustick}</span>
                    </div>

                    <div className='seperator' />

                    <div className='infoRow'>
                        <span className='rowLeft'>Department</span>
                        <span className='rowRight'>{conversationData?.department}</span>
                    </div>

                    <div className='seperator' />

                    <div className='infoRow'>
                        <span className='rowLeft'>Posted</span>
                        <span className='rowRight'>{(new Date(Date.parse(conversationData?.createdAt))).toUTCString()}</span>
                    </div>

                    <div className='seperator' />

                    <div className='infoRow'>
                        <span className='rowLeft'>Last update</span>
                        <span className='rowRight'>{(new Date(Date.parse(conversationData?.updatedAt))).toUTCString()}</span>
                    </div>

                    <div className='seperator' />

                    <div className='infoRow'>
                        <span className='rowLeft'>Importance</span>
                        <span className='rowRight'>{conversationData?.importTick}</span>
                    </div>

                    <div className='seperator' />


                    {conversationData?.statustick === 'Closed' ?
                        <button className='infoBtn' disabled>
                            Ticket is closed
                        </button>
                        :
                        <button className='infoBtn' onClick={handleTicketClose} disabled={isFetchingTicketInfo}>
                            {!isFetchingTicketInfo ?
                                'Close the ticket'
                                :
                                <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                            }
                        </button>
                    }
                </div>
            </div>

            <LoaderPage isFetching={isFetchingTicketInfo} />
            {ticketOpen && <TicketDialog text={mainText} photo={photo} setPhoto={setPhoto} setTicketOpen={setTicketOpen} />}
        </div>
    )
};

export default TicketConversation;