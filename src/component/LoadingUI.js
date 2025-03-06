"use client";
import { useEffect, useState } from "react";

function LoadingUI() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const measurePerformance = () => {
      const resources = performance.getEntriesByType("resource");
      const totalResources = resources.length;
      let loadedResources = 0;

      // Check if each resource has finished loading
      resources.forEach((resource) => {
        if (resource.duration > 0) {
          loadedResources++;
        }
      });

      // Calculate loading progress
      const progress = (loadedResources / totalResources) * 100;
      setLoadingProgress(progress);

      // If all resources are loaded, set loading to false
      if (loadedResources === totalResources) {
        setIsLoading(false);
      }
    };

    // Start measuring performance after the page loads
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
    }

    // Cleanup
    return () => {
      window.removeEventListener("load", measurePerformance);
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <p>Loading... {Math.round(loadingProgress)}%</p>
          <progress value={loadingProgress} max="100" />
        </div>
      ) : (
        <p>Page fully loaded!</p>
      )}
    </div>
  )
}

export default LoadingUI;
