"use client";
import React, { useRef, useEffect, useContext } from "react";

import styles from "./home.module.scss";
import Banner from "@/component/banner/Banner";

import { HeaderContext } from "@/context/HeaderContext";

const Home = () => {
  const { setIsVisible, lastScrollY, setLastScrollY } =
    useContext(HeaderContext);

  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollRef?.current;
      if (currentScrollY) {
        setIsVisible(
          currentScrollY.scrollTop < lastScrollY &&
            currentScrollY.scrollTop < 50
        );
        setLastScrollY(currentScrollY.scrollTop);
      }
    };

    const scrollElement = scrollRef?.current;
    scrollElement?.addEventListener("scroll", handleScroll);
    return () => scrollElement?.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={styles.home} ref={scrollRef}>
      <Banner />
    </div>
  );
};

export default Home;
