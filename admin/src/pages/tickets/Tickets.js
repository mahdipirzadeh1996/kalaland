import React, { useEffect, useState, useContext } from 'react';

import './tickets.scss';
import TicketHistory from '../../component/ticketComponents/ticketHistory/TicketHistory';
import TicketConversation from '../../component/ticketComponents/ticketConversation/TicketConversation';

import { EmailContext } from '../../context/emailContext/EmailContext';

const Tickets = ({ setTitle, setCurrent }) => {
    const [loading, setLoading] = useState(true);
    const [pageType, setPageType] = useState('history');
    const [conversationData, setConversationData] = useState(null);

    const { user } = useContext(EmailContext);

    useEffect(() => {
        setTitle('Tickets');
        setCurrent('/tickets');
    }, []);

    return (
        <div className='tickets'>
            <div className={pageType === 'history' ? 'supportContain' : 'supportContain left'}>
                <TicketHistory setPageType={setPageType} setConversationData={setConversationData} />
            </div>

            <div className={pageType === 'conversation' ? 'supportContain' : 'supportContain left'}>
                <TicketConversation setPageType={setPageType} conversationData={conversationData} />
            </div>
        </div>
    );
};

export default Tickets;