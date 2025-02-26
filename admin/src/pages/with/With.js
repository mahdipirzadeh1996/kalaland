import React, { useEffect, useState, useContext } from 'react';

import './with.scss';
import WithList from '../../component/withList/WithList';

import { EmailContext } from '../../context/emailContext/EmailContext';

const Payments = ({ setTitle, setCurrent }) => {
    const [loading, setLoading] = useState(true);
    const [pageType, setPageType] = useState('history');
    const [paymentsData, setPaymentsData] = useState(null);

    const { user } = useContext(EmailContext);

    useEffect(() => {
        setTitle('Payments');
        setCurrent('/withs');
    }, []);

    return (
        <div className='with'>
            <div className={'supportContain'}>
                <WithList setPageType={setPageType} setPaymentsData={setPaymentsData} />
            </div>
        </div>
    );
};

export default Payments;