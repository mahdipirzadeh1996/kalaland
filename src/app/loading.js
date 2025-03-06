"use client"; // Mark as Client Component

import { useEffect, useState } from "react";

import styles from "./loading.module.scss";

// Custom loading component
export default function Loading() {
  const [progress, setProgress] = useState(0); // Progress percentage
  const [loadTime, setLoadTime] = useState(0); // Total load time in milliseconds

  useEffect(() => {
    // Clear any existing marks and measures
    performance.clearMarks("startLoading");
    performance.clearMarks("endLoading");
    performance.clearMeasures("loadingDuration");

    // Mark the start time
    performance.mark("startLoading");

    // Function to calculate loading progress
    const calculateProgress = () => {
      // Get all resource entries
      const resources = performance.getEntriesByType("resource");

      // Calculate the total size of all resources
      const totalSize = resources.reduce(
        (sum, resource) => sum + resource.transferSize,
        0
      );

      // Calculate the loaded size of all resources
      const loadedSize = resources.reduce((sum, resource) => {
        if (resource.duration > 0) {
          return sum + resource.transferSize;
        }
        return sum;
      }, 0);

      // Calculate the progress percentage
      const progressPercentage =
        totalSize > 0 ? (loadedSize / totalSize) * 100 : 0;
      setProgress(progressPercentage);

      // If all resources are loaded, stop the interval
      if (progressPercentage >= 100) {
        clearInterval(interval);

        // Mark the end time
        performance.mark("endLoading");

        // Measure the duration only if both marks exist
        if (
          performance.getEntriesByName("startLoading").length > 0 &&
          performance.getEntriesByName("endLoading").length > 0
        ) {
          performance.measure("loadingDuration", "startLoading", "endLoading");

          // Get the measurement
          const measure = performance.getEntriesByName("loadingDuration")[0];
          setLoadTime(measure.duration);

          // Clear the marks and measure
          performance.clearMarks("startLoading");
          performance.clearMarks("endLoading");
          performance.clearMeasures("loadingDuration");
        }
      }
    };

    // Start tracking progress
    const interval = setInterval(calculateProgress, 100);

    // Cleanup the interval
    return () => {
      clearInterval(interval);
      performance.clearMarks("startLoading"); // Clear marks on cleanup
      performance.clearMarks("endLoading"); // Clear marks on cleanup
      performance.clearMeasures("loadingDuration"); // Clear measures on cleanup
    };
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <h1 className={styles.loaderText}>Loading...</h1>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p>Progress: {progress.toFixed(2)}%</p>
      <p>Load time: {loadTime.toFixed(2)} ms</p>
      {progress >= 100 && <p>Page is ready!</p>}
    </div>
  );
}
