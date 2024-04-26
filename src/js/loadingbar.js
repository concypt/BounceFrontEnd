import React, { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

const GlobalLoadingBar = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setProgress(30); // Start loading bar at 30%
    };

    const finishLoading = () => {
      setLoading(false);
      setProgress(100); // Finish loading bar
    };

    const startLoadingListener = () => startLoading();
    const finishLoadingListener = () => finishLoading();

  }, []);

  return (
    <>
      <LoadingBar
        progress={progress}
        color="#f11946"
        height={3}
        shadow={true}
        waitingTime={500} // Delay before showing the loading bar
        onLoaderFinished={() => setProgress(0)} // Reset progress when loading finishes
      />
      {loading ? children : null}
    </>
  );
};

export default GlobalLoadingBar;
