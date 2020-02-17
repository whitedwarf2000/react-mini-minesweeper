import React, { memo, useEffect, useState } from "react";

const Timer = memo(props => {
  const { isGameStart, isRefresh } = props;

  const [seconds, setSeconds] = useState(0);

  const formatTimer = () =>
    new Date(seconds * 1000).toISOString().substr(11, 8);

  useEffect(() => {
    let interval = null;
    if (isGameStart) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isGameStart && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isGameStart]);

  useEffect(() => {
    if (isRefresh) {
      setSeconds(0);
    }
  }, [isGameStart, isRefresh]);

  return (
    <h2>Time: {formatTimer()}</h2>
  );
});

export default Timer;
