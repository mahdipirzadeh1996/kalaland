import React, { useEffect, useState } from 'react';
import { Add } from 'iconsax-react';

import './notif.scss';
import NotifCard from '../../component/notifCard/NotifCard';
import AddNotif from '../../component/addNotif/AddNotif';

const Notif = ({ setTitle, setCurrent }) => {
    const [notifStatus, setNotifStatus] = useState({
        'notifList': true,
        'addNotif': false,
        'editNotif': false,
    });
    const [item, setItem] = useState(null);

    useEffect(() => {
        setTitle('Notification');
        setCurrent('/notif');
    }, []);

    return (
        <div className='notif'>
            {notifStatus.notifList &&
                <>
                    <NotifCard item={item} setItem={setItem} notifStatus={notifStatus} setNotifStatus={setNotifStatus} />

                    <button className='floatBtn' onClick={() => {
                        setNotifStatus({
                            ...notifStatus,
                            'addNotif': true,
                            'notifList': false,
                        });
                    }}>
                        <Add
                            size="32"
                            color='#fff'
                        />
                    </button>
                </>
            }

            {notifStatus.addNotif &&
                <AddNotif notifStatus={notifStatus} setNotifStatus={setNotifStatus} />
            }

            {/* {notifStatus.editNotif &&
              <EditNotif item={item} setItem={setItem} planStatus={planStatus} setPlanStatus={setPlanStatus} />
            } */}
        </div>
    );
};

export default Notif;