import React, { useEffect, useContext, useState, useRef } from 'react';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
    Edit
} from 'iconsax-react';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import './userList.scss';

import { EmailContext } from '../../context/emailContext/EmailContext';
import { UsersContext } from '../../context/usersContext/UsersContext';
import { getUsers } from '../../context/usersContext/apiCalls';

const override = css`
display: block;
`;

const UserList = ({ item, setItem, usersStatus, setUsersStatus }) => {
    const { user, emailDispatch } = useContext(EmailContext);
    const { users, isFetchingUsers, dispatchUsers } = useContext(UsersContext);

    const fetch = useRef(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (fetch.current) {
            fetch.current = false;

            getUsers(user.token, dispatchUsers, emailDispatch, navigate);
        }
    }, []);

    const columns = [
        {
            field: "email",
            headerName: "Email",
            width: 130,
            headerClassName: 'headerData',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className="listItem">
                        <span className='span'>{params.row.email}</span>
                    </div>
                );
            },
        },
        {
            field: "frist_name",
            headerName: "Full name",
            width: 300,
            headerClassName: 'headerData',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className='listItem' style={{ color: '#13CC68' }}>
                        <span className='span'>{params.row.frist_name}</span>
                    </div>
                );
            },
        },
        {
            field: "edit",
            headerName: "",
            width: 100,
            headerClassName: 'headerData',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className='listItem' style={{ color: '#13CC68' }}>
                        <button className='btnEdit' onClick={() => handleEditClick(params)}>
                            <div className='innerBtn'>
                                <Edit color='#fff' size={18} />
                            </div>
                        </button>
                    </div>
                );
            },
        }
    ];

    function CustomPagination() {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);

        return (
            <Pagination
                color="primary"
                variant="outlined"
                shape="rounded"
                page={page + 1}
                count={pageCount}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    direction: 'ltr',
                    color: '#fff'
                }}
                // @ts-expect-error
                renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
        );
    }

    const handleEditClick = (params) => {
        setItem(params.row);
        setUsersStatus({
            ...usersStatus,
            'editUsers': true,
            'usersList': false,
        });
    }

    return (
        <>
            {
                !isFetchingUsers ?
                    <div className='userListContain'>
                        <div className='userList'>
                            <DataGrid
                                pageSize={10}
                                rows={users !== null && users}
                                disableSelectionOnClick
                                columns={columns}
                                getRowId={r => r._id}
                                getRowHeight={() => 'auto'}
                                getEstimatedRowHeight={() => 200}
                                style={{
                                    color: '#fff',
                                    height: '400px',
                                    backgroundColor: 'transparent',
                                    overflowX: 'auto',
                                    margin: '20px',
                                }}
                                sx={{
                                    border: 'none',
                                    '&>.MuiDataGrid-main': {
                                        '&>.MuiDataGrid-columnHeaders': {
                                            borderColor: '#414141',
                                        },
                                        '&>.MuiDataGrid-columnFooter': {
                                            borderColor: '#414141',
                                        },
                                        '& div div div div >.MuiDataGrid-cell': {
                                            borderColor: '#414141'
                                        },
                                    },
                                    '.MuiDataGrid-columnSeparator': {
                                        display: 'none',
                                    },
                                    '&.MuiDataGrid-root': {
                                        border: 'none',
                                    },
                                    "& .MuiPaginationItem-root": {
                                        color: "#fff",
                                    },
                                }}
                                components={{
                                    NoRowsOverlay: () => (
                                        <div className="noRows">
                                            <span>
                                                No history
                                            </span>
                                        </div>
                                    ),
                                    Pagination: CustomPagination,
                                }}
                            />
                        </div>
                    </div>
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
        </>
    );
};

export default UserList;