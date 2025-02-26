import React, { useState, useEffect } from 'react';
import { Add } from 'iconsax-react';

import './userController.scss';
import UserList from '../../component/userList/UserList';
import AddOneUser from '../../component/addOneUser/AddOneUser';
import EditUser from '../../component/editUser/EditUser';

const UserController = ({ setTitle, setCurrent }) => {
    const [usersStatus, setUsersStatus] = useState({
        'usersList': true,
        'addUsers': false,
        'editUsers': false,
    });
    const [item, setItem] = useState(null);

    useEffect(() => {
        setTitle('User Management');
        setCurrent('/userController');
    }, []);

    return (
        <div className='userController'>
            {usersStatus.usersList &&
                <>
                    <UserList item={item} setItem={setItem} usersStatus={usersStatus} setUsersStatus={setUsersStatus} />

                    <button className='floatBtn' onClick={() => {
                        setUsersStatus({
                            ...usersStatus,
                            'addUsers': true,
                            'usersList': false,
                        });
                    }}>
                        <Add
                            size="32"
                            color='#fff'
                        />
                    </button>
                </>
            } 

            {usersStatus.addUsers &&
                <AddOneUser usersStatus={usersStatus} setUsersStatus={setUsersStatus} />
            }

            {usersStatus.editUsers &&
              <EditUser item={item} setItem={setItem} usersStatus={usersStatus} setUsersStatus={setUsersStatus} />
            }
        </div>
    );
};

export default UserController;