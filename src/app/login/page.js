"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sms, Key, Eye, EyeSlash, ArrowCircleRight } from "iconsax-react";
import { toast } from "@/component/customToast/CustomToast";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";

import styles from "./login.module.scss";
import loginImage from "../../../public/assets/images/logo.png";
import loginCover from "../../../public/assets/images/loginCover.png";

import { RegisterContext } from "@/context/registerContext/RegisterContext";
import { loginUser } from "@/context/registerContext/RegisterAction";

const override = css`
  display: block;
`;

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(RegisterContext);

  const buttonRef = useRef(null); // Ref for the registration button
  // const { user, isFetching, dispatch } = useContext(EmailContext);
  const navigate = useRouter();

  useEffect(() => {
    if (state.userInfo !== null) {
      navigate.push("/home");
    }
  }, [state.userInfo, navigate]);

  useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.key === "Enter" && !state.isLoading) {
          if (email) {
            // If email verification is active, trigger the verify button
            // verifyRef.current.click();
          } else {
            // Otherwise, trigger the registration button
            buttonRef.current.click();
          }
        }
      };
  
      // Attach the event listener to the document
      document.addEventListener("keydown", handleKeyPress);
  
      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [email, state.isLoading]);

  const handleLogin = () => {
    if (
      userEmail === "" ||
      password === "" ||
      userEmail === null ||
      password === null
    ) {
      toast.error("لطفا همه بخش ها را کامل کنید!");
    } else {
      loginUser(dispatch, userEmail, password, setEmail);
    }
  };

  return (
    <div className={styles.login}>
      {/* <Image className={styles.imgg} src={loginImage} alt='hi' /> */}
      <div className={styles.loginContain}>
        <div className={styles.loginRight}>
          <span className={styles.mainTitle}>خوش آمدید</span>
          <div className={styles.loginTitleContain}>
            کالالند
            <Image
              className={styles.loginImage}
              src={loginImage}
              alt={"Login Image"}
            />
            به
          </div>

          <div className={styles.inputContain}>
            <input
              className={styles.loginInput}
              placeholder="لطفا ایمیل خود را وارد کنید"
              type={"email"}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <Sms color="#fff" className={styles.loginIcon} size={35} />
          </div>

          <div className={styles.inputContain}>
            <div
              className={styles.showPass}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? (
                <EyeSlash color="#fff" className={styles.loginIcon} size={20} />
              ) : (
                <Eye color="#fff" className={styles.loginIcon} size={20} />
              )}
            </div>
            <input
              className={styles.loginInput}
              placeholder="گذرواژه خود را وارد کنید"
              type={showPass ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Key color="#fff" className={styles.loginIcon} size={35} />
          </div>

          <div className={styles.forgetPassContain}>
            <span className={styles.forgetPass} onClick={() => setEmail(true)}>
              فراموشی گذرواژه؟
            </span>
          </div>

          <button
            className={styles.btn}
            disabled={state.isLoading}
            ref={buttonRef}
            onClick={handleLogin}
          >
            {!state.isLoading ? (
              <div className={styles.innerBtn}>
                ورود
                <ArrowCircleRight
                  color="#fff"
                  size={20}
                  variant="Bold"
                  style={{ marginLeft: "5px" }}
                />
              </div>
            ) : (
              <BounceLoader
                color={"#fff"}
                loading={true}
                css={override}
                size={15}
              />
            )}
          </button>
        </div>

        <div className={styles.loginLeft}>
          <Image
            className={styles.loginCover}
            src={loginCover}
            alt="Kalalnd Login Cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
