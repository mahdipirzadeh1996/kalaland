"use client"; // Mark as Client Component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname to detect route changes

import styles from "./initialLoadTracker.module.scss"; // Import SCSS styles

export default function InitialLoadTracker() {
  const [progress, setProgress] = useState(0); // Progress percentage
  const [loadTime, setLoadTime] = useState(0); // Total load time in milliseconds
  const [isLoadingComplete, setIsLoadingComplete] = useState(false); // Track if loading is complete
  const pathname = usePathname(); // Get the current route path

  useEffect(() => {
    // Reset loading state when the route changes
    setIsLoadingComplete(false);
    setProgress(0);
    setLoadTime(0);

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

          // Set loading as complete
          setIsLoadingComplete(true);

          // Clear the marks and measure
          performance.clearMarks("startLoading");
          performance.clearMarks("endLoading");
          performance.clearMeasures("loadingDuration");
        }
      }
    };

    // Start tracking progress
    const interval = setInterval(calculateProgress, 100);

    // Use MutationObserver to detect dynamically added resources
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (
              node.tagName === "IMG" ||
              node.tagName === "SCRIPT" ||
              node.tagName === "LINK"
            ) {
              // Recalculate progress when new resources are added
              calculateProgress();
            }
          });
        }
      });
    });

    // Observe the entire document for changes
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Cleanup the interval and observer
    return () => {
      clearInterval(interval);
      observer.disconnect();
      performance.clearMarks("startLoading"); // Clear marks on cleanup
      performance.clearMarks("endLoading"); // Clear marks on cleanup
      performance.clearMeasures("loadingDuration"); // Clear measures on cleanup
    };
  }, [pathname]); // Re-run effect when the route changes

  // If loading is complete, add the "loaded" class for the fade-out transition
  const loaderClass = isLoadingComplete
    ? `${styles.loaderContainer} ${styles.loaded}`
    : styles.loaderContainer;

  return (
    <div className={loaderClass}>
      <h1 className={styles.loaderText}>Loading...</h1>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className={styles.loadTime}>Progress: {progress.toFixed(2)}%</p>
      <p className={styles.loadTime}>Load time: {loadTime.toFixed(2)} ms</p>
      {progress >= 100 && <p className={styles.pageReady}>Page is ready!</p>}
    </div>
  );
}
