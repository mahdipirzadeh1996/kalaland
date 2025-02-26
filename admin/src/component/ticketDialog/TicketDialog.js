import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import './ticketDialog.scss';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none'
        },
        '&:hover fieldset': {
            border: 'none'
        },
        '&.Mui-focused fieldset': {
            border: 'none'
        }
    },
    "& .MuiInputBase-root": {
        color: '#fff',
    }
});

const TicketDialog = ({ text, photo, setPhoto, setTicketOpen }) => {
    return (
        <div className='ticketDialog'>
            <div className='contain'>
                <CssTextField
                    className='inputArea'
                    placeholder="Placeholder"
                    value={text}
                    multiline
                    InputProps={{
                        sx: {
                            "& input": {
                                color: '#fff'
                            }
                        }
                    }}
                />

                {photo !== '' &&
                    <div className='imageBtn'>
                        <a
                            rel="noreferrer"
                            href={photo}
                            target="_blank"
                        >
                            Show Image
                        </a>
                    </div>
                }

                <div className='btnContain'>
                    <button className='btnCancel' onClick={() => {
                        setTicketOpen(false);
                        setPhoto('');
                    }}>
                        <div className='innerBtn'>
                            Close
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketDialog;