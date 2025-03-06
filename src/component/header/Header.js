"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useNavigate } from 'react-router-dom'

// import { EmailContext } from '../../context/emailContext/EmailContext';
import styles from "./header.module.scss";
import logo from "../../../public/assets/images/logo.png";
import avatar from "../../../public/assets/images/avatar.png";
import Menu from "@/component/menu/Menu";

import { HeaderContext } from "@/context/HeaderContext";
import { RegisterContext } from "@/context/registerContext/RegisterContext";

const Header = () => {
  const [open, setOpen] = useState(false);

  const { isVisible } = useContext(HeaderContext);
  const { state } = useContext(RegisterContext);

  const navigate = useRouter();

  return (
    <>
      <div className={`${styles.header} ${!isVisible ? styles.hide : ""}`}>
        <div className={styles.contain}>
          <div className={styles.left}>
            {state.userInfo ? (
              <div className={styles.rightContent}>
                <div className={styles.profileContain}>
                  <div className={styles.imgContain}>
                    <div className={styles.img}>
                      <Image
                        src={avatar}
                        className={styles.loginCover}
                        alt="Kalaland Avatar Image"
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.infoContain}>
                  <span className={styles.name}>
                    {state.userInfo.name} {state.userInfo.family}
                  </span>
                  <span className={styles.email}>{state.userInfo.email}</span>
                </div>
              </div>
            ) : (
              <>
                <Link href="/register" className={styles.link}>
                  <button className={styles.regBtn}>ثبت نام</button>
                </Link>
                <div className={styles.seperate} />
                <Link href="/login" className={styles.link}>
                  <button className={styles.btn}>ورود</button>
                </Link>
              </>
            )}
          </div>

          <div className={styles.right}>
            <button className={styles.btn}>درباره ما</button>
            <button className={styles.btn}>جستجو</button>
            <button className={styles.btn}>مقایسه</button>
            <button className={styles.btn}>ژورنال</button>

            <Image
              className={styles.logo}
              onClick={() => navigate.push("/home")}
              src={logo}
              alt={"Kalaland logo"}
            />
          </div>

          <div className={styles.mobileLeft}>
            <div className={styles.btnContainer}>
              <button className={styles.btn} onClick={() => setOpen(!open)}>
                <div className={open ? styles.first : styles.firstClose} />
                <div className={open ? styles.second : styles.secondClose} />
              </button>
            </div>
          </div>

          <div className={styles.mobileMiddle}>
            <Image className={styles.mobileImg} src={logo} alt={"Kalaland Logo"} />
          </div>

          <div className={styles.mobileRight}>h</div>
        </div>
      </div>

      <Menu open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
