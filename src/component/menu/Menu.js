"use client";
import React, { useContext } from "react";
import Link from "next/link";

import "./menu.scss";
import { RegisterContext } from "@/context/registerContext/RegisterContext";

const Menu = ({ open, setOpen }) => {
  const { state } = useContext(RegisterContext);

  return (
    <div className={open ? "menu" : "menu close"}>
      <div className="seperator" />

      <div className="main">
        <div
          className="item"
          onClick={() => {
            setOpen(false);
          }}
        >
          ژورنال
        </div>
        <div className="seperator" />
        <div
          className="item"
          onClick={() => {
            setOpen(false);
          }}
        >
          مقایسه
        </div>
        <div className="seperator" />
        <div
          className="item"
          onClick={() => {
            setOpen(false);
          }}
        >
          جستجو
        </div>
        <div className="seperator" />
        <div
          className="item"
          onClick={() => {
            setOpen(false);
          }}
        >
          درباره ما
        </div>
        <div className="seperator" />

        {state.userInfo ? (
          <div
            className="item"
            onClick={() => {
              logoutUser(dispatch);
            }}
          >
            خروج
          </div>
        ) : (
          <div className="authItem">
            <div className="innerItem">
              <Link href="/login" className="link">
                ورود
              </Link>
            </div>
            <div className="innerSeperate" />
            <div className="innerItem">
              <Link href="/register" className="link">
                ثبت نام
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
