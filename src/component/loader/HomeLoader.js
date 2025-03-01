'use client';

import React, { useState, useEffect } from 'react';
import { Progress } from '@nextui-org/react';
import './homeLoader.scss';

const HomeLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      }
    };

    for (let i = 0; i < totalImages; i++) {
      if (imgs[i].complete) {
        imageLoaded();
      } else {
        imgs[i].addEventListener('load', imageLoaded);
        imgs[i].addEventListener('error', imageLoaded);
      }
    }

    return () => {
      for (let i = 0; i < totalImages; i++) {
        imgs[i].removeEventListener('load', imageLoaded);
        imgs[i].removeEventListener('error', imageLoaded);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="home-loader-container">
        <Progress
          aria-label="Loading..."
          value={progress}
          className="home-loader-progress"
          color="primary"
          showValueLabel={true}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default HomeLoader;
