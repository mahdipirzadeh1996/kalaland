"use client";
import React, { useEffect, useState, forwardRef, useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import { toast, Toaster } from "@/component/customToast/CustomToast";
import {
  User,
  Sms,
  Call,
  Location,
  Key,
  Cake,
  Eye,
  EyeSlash,
  ArrowCircleRight,
} from "iconsax-react";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import styles from "./register.module.scss";
import regImage from "../../../public/assets/images/logo.png";
import regCover from "../../../public/assets/images/regCover.png";

const override = css`
  display: block;
`;

const Register = () => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPassC, setShowPassC] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(false);

  const navigation = useRouter();

  // const { user, dispatch, isFetching } = useContext(EmailContext);

  useEffect(() => {
    if (user !== null && user) {
      navigate("/home");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData !== null) {
      if (
        userData.name === undefined ||
        userData.family === undefined ||
        userData.mobile === undefined ||
        userData.email === undefined ||
        userData.password === undefined ||
        userData.confirm_password === undefined ||
        userData.name === "" ||
        userData.family === "" ||
        userData.mobile === "" ||
        userData.email === "" ||
        userData.password === "" ||
        userData.confirm_password === ""
      ) {
        toast.error("لطفا همه ی موارد را تکمیل کنید!");
      } else {
        if (userData.password.length >= 4 && userData.password.length <= 16)
          // sendEmail(setEmail, userData.email, dispatch)
          setUser(true);
        else toast.error("تعداد کاراکترهای پسورد باید بین 4 تا 16 عدد باشد!");
      }
    } else {
      toast.error("لطفا همه ی موارد را تکمیل کنید!");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setUserData({ ...userData, [e.target.name]: value });
  };

  return (
    <div className={styles.register}>
      <div className={styles.regContain}>
        <div className={styles.regRight}>
          <span className={styles.mainTitle}>
            خوش آمدید
          </span>

          <div className={styles.regTitleContain}>
            کالالند
            <Image
              className={styles.regImage}
              src={regImage}
              alt="Kalaland Logo"
            />
            به
          </div>

          <div className={styles.sectionContain}>
            <div className={styles.section}>
              <div className={styles.titleContain}>
                <span className={styles.title}>نام</span>
                <User color="#ffffff" className={styles.titleIcon} size={35} />
              </div>

              <div className={styles.regInpContain}>
                <input
                  className={styles.regInp}
                  name="name"
                  placeholder="لطفا نام خود را وارد کنید"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.titleContain}>
                <span className={styles.title}>نام خانوادگی</span>
                <User color="#ffffff" className={styles.titleIcon} size={35} />
              </div>

              <div className={styles.regInpContain}>
                <input
                  className={styles.regInp}
                  name="family"
                  placeholder="لطفا نام خانوادگی خود را وارید"
                  // autoComplete="new-password"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.sectionContain}>
            <div className={styles.section}>
              <div className={styles.titleContain}>
                <span className={styles.title}>موبایل</span>
                <Call color="#ffffff" className={styles.titleIcon} size={35} />
              </div>

              <div className={styles.regInpContain}>
                <input
                  className={styles.regInp}
                  name="mobile"
                  placeholder="لطفا شماره موبایل خود را وارد کنید"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.titleContain}>
                <span className={styles.title}>ایمیل</span>
                <Sms color="#ffffff" className={styles.titleIcon} size={35} />
              </div>

              <div className={styles.regInpContain}>
                <input
                  className={styles.regInp}
                  name="email"
                  placeholder="لطفا ایمیل خود را وارد کنید"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.sectionContain}>
            <div className={styles.section}>
              <div className={styles.titleContain}>
                <span className={styles.title}>گذرواژه</span>
                <Key color="#ffffff" className={styles.titleIcon} size={35} />
              </div>

              <div className={styles.regInpContain}>
                <div
                  className={styles.showPass}
                  onClick={() => setShowPass(!showPass)}
                >
                  {!showPass ? (
                    <EyeSlash
                      className={styles.regIcon}
                      color="#fff"
                      size={20}
                    />
                  ) : (
                    <Eye className={styles.regIcon} color="#fff" size={20} />
                  )}
                </div>

                <input
                  className={styles.regInp}
                  type={showPass ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="لطفا گذرواژه خود را وارد کنید"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.titleContain}>
                <span className={styles.title}>تایید گذرواژه</span>
                <Key color="#ffffff" className={styles.titleIcon} size={35} />
              </div>

              <div className={styles.regInpContain}>
                <div
                  className={styles.showPass}
                  onClick={() => setShowPassC(!showPassC)}
                >
                  {!showPassC ? (
                    <EyeSlash
                      className={styles.regIcon}
                      color="#fff"
                      size={20}
                    />
                  ) : (
                    <Eye className={styles.regIcon} color="#fff" size={20} />
                  )}
                </div>

                <input
                  className={styles.regInp}
                  type={showPassC ? "text" : "password"}
                  name="confirm_password"
                  autoComplete="new-password"
                  placeholder="لطفا گذرواژه خود را مجددا وارد کنید"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            className={styles.btn}
            onClick={handleSubmit}
            // disabled={!checked || isFetching}
          >
            ثبتنام
            <ArrowCircleRight
              color="#fff"
              size={20}
              variant="Bold"
              style={{ marginLeft: "5px" }}
            />
            {/* {!isFetching ? (
              <>
                Register
                <ArrowCircleRight
                  color="#fff"
                  size={20}
                  variant="Bold"
                  style={{ marginLeft: '5px' }}
                />
              </>
            ) : (
              <BounceLoader
                color={'#fff'}
                loading={true}
                css={override}
                size={15}
              />
            )} */}
          </button>
        </div>

        <div className={styles.regLeft}>
          <Image
            className={styles.regCover}
            src={regCover}
            alt="Register Cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
