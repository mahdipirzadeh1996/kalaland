import React, { useState, useContext, useEffect, useRef } from 'react';
import VerificationInput from 'react-verification-input';
import {
    Sms,
    Key,
    Eye,
    EyeSlash,
    ArrowCircleRight,
    CloseSquare
} from 'iconsax-react';
import { toast } from 'react-toastify';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import './emailDialog.scss';
import { sendEmailReset, verifyCode, resetPass } from '../../context/emailContext/apiCalls';
import { EmailContext } from '../../context/emailContext/EmailContext';

const override = css`
  display: block;
`;

const EmailDialog = ({ setEmail }) => {
    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [code, setCode] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');

    const { user, dispatch, isFetching } = useContext(EmailContext);

    const emailInputRef = useRef(null);
    const passRef = useRef(null);
    const codeRef = useRef(null);

    useEffect(() => {
        emailInputRef.current.focus();

        // window.addEventListener('keydown', downHandler);
        // window.addEventListener('keyup', upHandler);

        // return () => {
        //     window.removeEventListener('keydown', downHandler);
        //     window.removeEventListener('keyup', upHandler);
        // };
    }, []);

    // const downHandler = ({ key }) => {
    //     console.log(key)
    //     if (key === 'Enter') alert(true);
    // };

    // const upHandler = ({ key }) => {
    //     console.log(key)
    //     if (key === 'w') alert(false);
    // };

    const handleEmailKeypress = (e) => {
        if (e.charCode === 13) {
            handleEmail();
        }
    };

    const handlePassKeypress = (e) => {
        if (e.charCode === 13) {
            handlePass();
        }
    };

    const handleEmail = () => {
        if (userEmail !== '') {
            sendEmailReset(userEmail, setFirst, setSecond, codeRef, dispatch);
        } else {
            toast.error("Please enter your email!");
        }
    }

    const handleCode = () => {
        if (code.length === 4) {
            verifyCode(userEmail, code, setSecond, setThird, dispatch);
        } else {
            toast.error("Please enter your code correctly!");
        }
    }

    const handlePass = () => {
        if (pass !== '' && confPass !== '') {
            if (pass === confPass) {
                resetPass(userEmail, pass, setEmail, setFirst, setThird, dispatch);
            } else {
                toast.error('Passwords are not matched!!!');
            }
        } else {
            toast.error("Please complete all fields!");
        }
    }

    return (
        <div className={'smsDialog'}>
            <div className='dialogContain'>
                <div className='closeBtn' onClick={() => {
                    setEmail(false);
                    setFirst(true);
                    setSecond(false);
                    setThird(false);
                }}>
                    <CloseSquare size="32" />
                </div>

                <div className={first ? 'dialog' : 'dialog left'}>
                    <span className='title'>Enter your email</span>

                    <div className='inpTitleContain'>
                        <Sms color='#fff' size={18} />

                        <span className='inpTitle'>Email</span>
                    </div>

                    <div className='passContain' style={{ marginBottom: '2rem' }}>
                        <input
                            className='loginInput'
                            type={'email'}
                            onChange={(e) => setUserEmail(e.target.value)}
                            onKeyPress={handleEmailKeypress}
                            name="email"
                            ref={emailInputRef}
                        />
                    </div>

                    <button className='btnValid' disabled={isFetching} type="submit" onClick={handleEmail}>
                        {!isFetching ?
                            <>
                                Comfirm
                                <ArrowCircleRight color='#fff' size={20} variant='Bold' style={{ marginLeft: '5px' }} />
                            </>
                            :
                            <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                        }
                    </button>
                </div>

                <div className={second ? 'dialog' : 'dialog right'} >
                    <span className='title'>Forgot Password</span>
                    <span className='mainTxt'>Enter the 4-digit code send to you at: <span className='phoneTxt'>{userEmail}</span></span>

                    <VerificationInput
                        removeDefaultStyles
                        length={4}
                        validChars={'0-9'}
                        classNames={{
                            container: "varifyContain",
                            character: "varifyChar",
                            characterInactive: "character--inactive",
                            characterSelected: "charSelected",
                        }}
                        ref={codeRef}
                        onChange={(value) => setCode(value)}
                    />

                    <span className='sendAgain'>Send again</span>

                    <button className='btnValid' type='submit' onClick={handleCode} disabled={isFetching}>
                        {!isFetching ?
                            <>
                                Comfirm
                                <ArrowCircleRight color='#fff' size={20} variant='Bold' style={{ marginLeft: '5px' }} />
                            </>
                            :
                            <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                        }
                    </button>
                </div>

                <div className={third ? 'dialog' : 'dialog right'}>
                    <span className='title'>Reset Password</span>

                    <div className='inpTitleContain'>
                        <Key color='#fff' size={18} />

                        <span className='inpTitle'>New Password</span>
                    </div>

                    <div className='passContain'>
                        <input
                            className='loginInput'
                            type={showPass ? 'text' : 'password'}
                            ref={passRef}
                            onChange={(e) => setPass(e.target.value)}
                            onKeyPress={handlePassKeypress}
                        />
                        <div className='showPass' onClick={() => setShowPass(!showPass)}>
                            {
                                !showPass
                                    ?
                                    <EyeSlash color='#fff' size={18} style={{ fontSize: '16px' }} />
                                    :
                                    <Eye color='#fff' size={18} style={{ fontSize: '16px' }} />
                            }
                        </div>
                    </div>

                    <div className='inpTitleContain'>
                        <Key color='#fff' size={18} />

                        <span className='inpTitle'>Confirm Password</span>
                    </div>

                    <div className='passContain' style={{ marginBottom: '2rem' }}>
                        <input
                            className='loginInput'
                            type={showPass ? 'text' : 'password'}
                            onChange={(e) => setConfPass(e.target.value)}
                            onKeyPress={handlePassKeypress}
                        />
                    </div>

                    <button className='btnValid' onClick={handlePass} disabled={isFetching}>
                        {!isFetching ?
                            <>
                                Comfirm
                                <ArrowCircleRight color='#fff' size={20} variant='Bold' style={{ marginLeft: '5px' }} />
                            </>
                            :
                            <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailDialog;