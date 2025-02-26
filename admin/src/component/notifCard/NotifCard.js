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
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import './notifCard.scss';
import DeletePlanDialog from '../deletePlanDialog/DeletePlanDialog';

import { getNotif, deleteNotif } from '../../context/notifContext/apiCalls';
import { NotifContext } from '../../context/notifContext/NotifContext';
import { EmailContext } from '../../context/emailContext/EmailContext';

const override = css`
display: block;
`;

const NotifCard = ({ item, setItem, notifStatus, setNotifStatus }) => {
    const [deleteDialog, setDeleteDialog] = useState(false);

    const { user, emailDispatch } = useContext(EmailContext);
    const { notif, isFetchingNotif, dispatchNotif } = useContext(NotifContext);

    const fetch = useRef(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (fetch.current) {
            fetch.current = false;

            getNotif(user.token, dispatchNotif, emailDispatch, navigate)
        }
    }, []);

    const columns = [
        {
            field: "date",
            headerName: "Date",
            width: 130,
            headerClassName: 'headerData',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className="listItem">
                        <span className='span'>{(new Date(Date.parse(params.row.date))).toUTCString().substring(4, 16)}</span>
                    </div>
                );
            },
        },
        {
            field: "title",
            headerName: "Title",
            width: 300,
            headerClassName: 'headerData',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className='listItem' style={{ color: '#13CC68' }}>
                        <span className='span'>{params.row.title}</span>
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

    const handleRowClick = (params) => {
        setItem(params.row);
        setNotifStatus({
            ...notifStatus,
            'editNotif': true,
            'notifList': false,
        });
    }

    return (
        <>
            {
                !isFetchingNotif ?
                    <div className='notifCardContain'>
                        <DataGrid
                            pageSize={10}
                            rows={notif !== null && notif}
                            columns={columns}
                            getRowId={r => r._id}
                            getRowHeight={() => 'auto'}
                            getEstimatedRowHeight={() => 200}
                            onRowClick={handleRowClick}
                            style={{
                                color: '#fff',
                                height: '400px',
                                backgroundColor: 'transparent',
                                overflowX: 'auto',
                                margin: '20px',
                                transition: 'height 0.5s ease-in-out',
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
                display: notif?.length !== 0 ? 'none' : 'flex'
            }}>
                There is not any notifications
            </div>
        </>
    );
};

export default NotifCard;