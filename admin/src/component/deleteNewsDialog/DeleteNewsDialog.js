import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import './deleteNewsDialog.scss';

const override = css`
display: block;
`;

const DeleteNewsDialog = ({ handleDelete, isFetching, setDeleteDialog }) => {
    return (
        <div className='deleteNewsDialog'>
            <div className='contain'>
                <span className='title'>Are you sure?</span>

                <div className='btnContain'>
                    <button className='btn' disabled={isFetching} onClick={handleDelete}>
                        {!isFetching ?
                            <div className='innerBtn'>
                                Delete
                            </div>
                            :
                            <BounceLoader color={"#fff"} loading={true} css={override} size={15} />
                        }
                    </button>

                    <button className='btnCancel' onClick={() => setDeleteDialog(false)}>
                        <div className='innerBtn'>
                            Cancel
                        </div>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default DeleteNewsDialog;