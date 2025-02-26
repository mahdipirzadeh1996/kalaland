"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useNavigate } from 'react-router-dom'

// import { EmailContext } from '../../context/emailContext/EmailContext';
import styles from "./header.module.scss";
import logo from "../../../public/assets/images/logo.png";

import { HeaderContext } from "@/context/HeaderContext";

const Header = ({ open, setOpen, openAbout, setOpenAbout }) => {
  // const { user } = useContext(EmailContext);
  const { isVisible } = useContext(HeaderContext);
  const user = false;
  const [loading, setLoading] = useState(true);

  return (
    <div className={`${styles.header} ${!isVisible ? styles.hide : ""}`}>
      <div className={styles.contain}>
        <div className={styles.left}>
          {/* <Image
            width={80}
            height={80}
            onClick={() => user && navigate('/dashboard')}
            src={require('../../images/logo.png')}
            alt={'opofinanceLogo'}
          /> */}
          <Image className={styles.logo} src={logo} alt={"Kalaland logo"} />

          {user ? (
            <div className={styles.rightContent}>
              <div className={styles.infoContain}>
                <span className={styles.name}>{user.fullName}</span>
                <span className={styles.email}>{user.email}</span>
              </div>
              <div className={styles.profileContain}>
                <div className={styles.imgContain}>
                  <div className={styles.img}>
                    <Image
                      src={
                        !loading
                          ? window.$url + user.avatar
                          : require("../../../public/assets/images/avatar.png")
                      }
                      className={styles.loginCover}
                      alt="Avatar Imager"
                      onLoad={() => setLoading(false)}
                    />
                  </div>
                </div>
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
          {/* <button className={styles.btn} onClick={() => setOpenAbout(true)}>
            About
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
