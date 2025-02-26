import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import './loaderPage.scss';

const override = css`
display: block;
`;

const LoaderPage = ({ isFetching }) => {
    return (
        <div className={isFetching ? 'loaderPage' : 'loaderPage close'}>
            <BounceLoader
                color={"#fff"}
                loading={isFetching}
                css={override}
                size={60}
            />
        </div>
    );
};

export default LoaderPage;