import React, { useContext, useState, useEffect, useRef } from "react";
import VerificationInput from "react-verification-input";
import { ArrowCircleRight, CloseSquare } from "iconsax-react";
import BounceLoader from "react-spinners/BounceLoader";
import { useRouter } from "next/navigation";

import "./verifyEmailDialog.scss";
import { css } from "@emotion/react";
import { toast } from "@/component/customToast/CustomToast";

import { EmailContext } from "../../context/registerContext/RegisterContext";
import { RegisterContext } from "@/context/registerContext/RegisterContext";
import {
  sendEmail,
  registerUser,
} from "@/context/registerContext/RegisterAction";

const override = css`
  display: block;
`;

const VerifyEmailDialog = ({
  email,
  setEmail,
  userDataEmail,
  userData,
  verifyRef,
}) => {
  const [code, setCode] = useState("");

  const { state, dispatch } = useContext(RegisterContext);

  let navigate = useRouter();

  const handleSubmit = () => {
    if (code.length === 4) {
      registerUser(dispatch, userData, code, setCode, setEmail);
    } else if (code.length < 4 || code.length === 0) {
      toast.error("لطفا کد را به درستی وارد کنید!");
    }
  };

  return email ? (
    <div className={email ? "verifyDialog" : "verifyDialog close"}>
      <div className={"dialogContain"}>
        <div
          className="closeBtn"
          onClick={() => {
            setCode("");
            setEmail(false);
          }}
        >
          <CloseSquare size={32} color="#fff" />
        </div>
        <div className={"dialog"}>
          <span className="title">Verifying your email</span>
          <span className="mainTxt">
            Enter the 4-digit code send to you at:
          </span>
          <span className="phoneTxt">{userDataEmail}</span>

          <VerificationInput
            removeDefaultStyles
            value={code}
            autoFocus
            length={4}
            onChange={(value) => setCode(value)}
            classNames={{
              container: "varifyContain",
              character: "varifyChar",
              characterInactive: "character--inactive",
              characterSelected: "charSelected",
            }}
          />

          <span
            className="sendAgain"
            disabled={state.isLoading}
            onClick={() => sendEmail(dispatch, userData, setEmail)}
          >
            Send again
          </span>

          <button
            className="btnValid"
            disabled={state.isLoading}
            ref={verifyRef}
            type="submit"
            onClick={handleSubmit}
          >
            Comfirm
            <ArrowCircleRight
              size="18"
              color="#ffffff"
              variant="Bold"
              style={{ marginLeft: "5px" }}
            />
          </button>
        </div>

        <div className={state.isLoading ? "loadContain" : "loadContain close"}>
          <BounceLoader
            color={"#fff"}
            loading={true}
            css={override}
            size={50}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default VerifyEmailDialog;
