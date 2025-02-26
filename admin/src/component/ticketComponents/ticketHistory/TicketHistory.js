import React, { useEffect, useState, useContext, useRef } from 'react';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';

import './ticketHistory.scss';
import LoaderPage from '../../loaderPage/LoaderPage';

import { EmailContext } from '../../../context/emailContext/EmailContext';
import { TicketContext } from '../../../context/ticketContext/TicketContext';
import { getTickets } from '../../../context/ticketContext/apiCalls';

const TicketHistory = ({ setPageType, setConversationData }) => {
    const [openCount, setOpenCount] = useState(0);
    const [closeCount, setCloseCount] = useState(0);
    const [answerCount, setAnswerCount] = useState(0);
    const [arrOpen, setArrOpen] = useState([]);
    const [arrClose, setArrClose] = useState([]);
    const [arrAnswered, setArrAnswered] = useState([]);
    const [tickStatus, setTickstatus] = useState('open');
    const [arr, setArr] = useState([]);

    const { user, dispatchEmail } = useContext(EmailContext);
    const { tickets, isFetchingTicket, dispatchTicket } = useContext(TicketContext);

    const navigate = useNavigate();

    const fetch = useRef(true);
    useEffect(() => {
        if (fetch.current) {
            fetch.current = false;

            getTickets(user.token, dispatchTicket, dispatchEmail, navigate);
        }
    }, []);

    useEffect(() => {
        if (tickets !== null) {
            let temp = 0;
            let temp1 = 0;
            let temp2 = 0;
            setArrOpen([]);
            setArrClose([]);
            setArrAnswered([]);
            for (let i = 0; i < tickets.length; i++) {
                if (tickets[i].statustick === 'Open') {
                    temp++;
                    setArrOpen(arrOpen => [...arrOpen, tickets[i]]);
                }
            }
            for (let i = 0; i < tickets.length; i++) {
                if (tickets[i].statustick === 'Closed') {
                    temp1++;
                    setArrClose(arrClose => [...arrClose, tickets[i]]);
                }
            }
            for (let i = 0; i < tickets.length; i++) {
                if (tickets[i].statustick === 'Answered') {
                    temp2++;
                    setArrAnswered(arrAnswered => [...arrAnswered, tickets[i]]);
                }
            }
            setOpenCount(temp);
            setCloseCount(temp1);
            setAnswerCount(temp2);
        }
    }, [tickets]);

    useEffect(() => {
        switch (tickStatus) {
            case 'open':
                setArr(arrOpen);
                break;
            case 'close':
                setArr(arrClose);
                break;
            case 'answered':
                setArr(arrAnswered);
                break;
            default:
                setArr(arrOpen);
                break;
        }
    }, [tickStatus, arrOpen, arrClose, arrAnswered, tickets]);

    const columns = [
        {
            field: "department",
            headerName: "Department",
            width: 90,
            headerClassName: 'headerData',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className="listItem" style={{ color: '#0088EA' }}>
                        {params.row.department}
                    </div>
                );
            },
        },
        {
            field: "topic",
            headerName: "Topic",
            width: 200,
            headerClassName: 'headerData',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className='listItem'>
                        <span className='spanHash'>{params.row.ticketNumber}</span>
                        <span className='span'>{params.row.topic}</span>
                    </div>
                );
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
            headerClassName: 'headerData',
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className='listItem'>
                        <span className='span' style={{ color: params.row.statustick === 'Open' ? '#13CC68' : '#EA0F0F' }}>{params.row.statustick}</span>
                    </div>
                );
            },
        },
        {
            field: "lastUpdate",
            headerName: "last update",
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div className="listItem" style={{ color: '#13CC68' }}>
                        {(new Date(Date.parse(params.row.updatedAt))).toUTCString()}
                    </div>
                );
            },
        },
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
        setConversationData(params.row);
        setPageType('conversation');
    };

    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 13,
        height: 13,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#fff'
    }));
    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#13CC68'
    });

    function BpRadio(props) {
        return (
            <Radio
                sx={{
                    '&:hover': {
                        bgcolor: 'transparent',
                    },
                }}
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                {...props}
            />
        );
    }

    return (
        <div className='container'>
            <div className='ticketHistory1'>
                <DataGrid
                    pageSize={10}
                    rows={arr}
                    disableSelectionOnClick
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
                                borderColor: '#414141',
                                cursor: 'pointer'
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

            <div className='ticketHistory2'>
                <div className='ticketStatus'>
                    <FormControl>
                        <FormLabel className='statusTxt'>Your tickets</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="open"
                            name="radio-buttons-group"
                            onChange={(e) => setTickstatus(e.target.value)}
                        >
                            <div className='combine'>
                                <FormControlLabel value="open" control={<BpRadio />} label="Open" />
                                <div className='count'>
                                    {openCount}
                                </div>
                            </div>
                            <div className='seperator' />
                            <div className='combine'>
                                <FormControlLabel value="close" control={<BpRadio />} label="Close" />
                                <div className='count'>
                                    {closeCount}
                                </div>
                            </div>
                            <div className='seperator' />
                            <div className='combine'>
                                <FormControlLabel value="answered" control={<BpRadio />} label="Answered" />
                                <div className='count'>
                                    {answerCount}
                                </div>
                            </div>
                            <div className='seperator' />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>

            <LoaderPage isFetching={isFetchingTicket} />
        </div>
    )
};

export default TicketHistory;