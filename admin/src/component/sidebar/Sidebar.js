import React, { useState, useContext } from 'react';
import {
    User,
    MoneyRecive,
    Messages3,
    Notification,
    Ticket,
    ShoppingCart,
    LogoutCurve,
    CloseSquare
} from 'iconsax-react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import './sidebar.scss';
import { EmailContext } from '../../context/emailContext/EmailContext';
import { logout } from '../../context/emailContext/EmailActions';

const Sidebar = ({ menu, setMenu, setTitle, current, setCurrent }) => {

    const { user, emailDispatch } = useContext(EmailContext);

    const navigate = useNavigate();

    return (
        <div className={user ? menu ? "sidebar" : 'sidebar close' : 'sidebar exit'}>
            <div className='closeBtn' onClick={() => setMenu(false)}>
                <CloseSquare size="32" />
            </div>

            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <div className='logoContain'>
                        <Link className='link' to={'/home'} onClick={() => setMenu(false)}>
                            <img className='logo' src={require('../../images/logo.png')} alt={'opofinanceLogo'} />
                        </Link>

                        <div className='infoContain'>
                            {/* <span className='name'>
                                {user.fullName}
                            </span>
                            <span className='email'>
                                {user.email}
                            </span> */}
                        </div>
                    </div>

                    <ul className="sidebarList">
                        <Link to="/userController" className="link" onClick={() => {
                            setCurrent('/userController');
                            setMenu(false);
                            setTitle('User Management');
                        }}>
                            <li className={current === '/userController' ? "sidebarListItem active" : "sidebarListItem"}>
                                <User className="sidebarIcon" size={20} />
                                Users
                            </li>
                        </Link>

                        <Link to="/plans" className="link" onClick={() => {
                            setCurrent('/plans');
                            setMenu(false);
                            setTitle('Plans');
                        }}>
                            <li className={current === '/plans' ? "sidebarListItem active" : "sidebarListItem"}>
                                <MoneyRecive className="sidebarIcon" size={20} />
                                Plans
                            </li>
                        </Link>

                        <Link to="/news" className="link" onClick={() => {
                            setCurrent('/news');
                            setMenu(false);
                            setTitle('News');
                        }}>
                            <li className={current === '/news' ? "sidebarListItem active" : "sidebarListItem"}>
                                <Messages3 className="sidebarIcon" size={20} />
                                News
                            </li>
                        </Link>

                        <Link to="/notif" className="link" onClick={() => {
                            setCurrent('/notif');
                            setMenu(false);
                            setTitle('Notification');
                        }}>
                            <li className={current === '/notif' ? "sidebarListItem active" : "sidebarListItem"}>
                                <Notification className="sidebarIcon" size={20} />
                                Notification
                            </li>
                        </Link>

                        <Link to="/tickets" className="link" onClick={() => {
                            setCurrent('/tickets');
                            setMenu(false);
                            setTitle('Tickets');
                        }}>
                            <li className={current === '/tickets' ? "sidebarListItem active" : "sidebarListItem"}>
                                <Ticket className="sidebarIcon" size={20} />
                                Tickets
                            </li>
                        </Link>

                        <Link to="/withs" className="link" onClick={() => {
                            setCurrent('/withs');
                            setMenu(false);
                            setTitle('Payments');
                        }}>
                            <li className={current === '/withs' ? "sidebarListItem active" : "sidebarListItem"}>
                                <ShoppingCart className="sidebarIcon" size={20} />
                                Payments
                            </li>
                        </Link>

                        <li className="exitListItem" onClick={() => {
                            emailDispatch(logout());
                            navigate('/');
                        }}>
                            <LogoutCurve className="exitIcon" size={20} />
                            Exit
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;