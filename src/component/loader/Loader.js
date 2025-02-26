import React, { useState, useEffect } from "react";

import "./loader.scss";

const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const imgs = document.images;
    const totalImages = imgs.length;
    let loadedImages = 0;

    const imageLoaded = () => {
      loadedImages++;
      const progressPercentage = (loadedImages / totalImages) * 100;
      setProgress(progressPercentage);

      if (loadedImages === totalImages) {
        onLoadComplete();
      }
    };

    for (let i = 0; i < totalImages; i++) {
      if (imgs[i].complete) {
        imageLoaded();
      } else {
        imgs[i].addEventListener("load", imageLoaded);
        imgs[i].addEventListener("error", imageLoaded);
      }
    }

    return () => {
      for (let i = 0; i < totalImages; i++) {
        imgs[i].removeEventListener("load", imageLoaded);
        imgs[i].removeEventListener("error", imageLoaded);
      }
    };
  }, [onLoadComplete]);

  return (
    <div className={"loaderContainer"}>
      <div className={"progressBar"} style={{ width: `${progress}%` }}></div>
      <p>Loading... {Math.round(progress)}%</p>
    </div>
  );
};

export default Loader;
