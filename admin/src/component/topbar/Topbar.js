import React, { useContext } from 'react';

import './topbar.scss';
import { EmailContext } from '../../context/emailContext/EmailContext';

const Topbar = ({ menu, setMenu, title }) => {
    const { user } = useContext(EmailContext);

    return (
        <div className={user ? 'topbar' : 'topbar close'}>
            <span className='titleTxt'>{title}</span>
        </div>
    );
};

export default Topbar;