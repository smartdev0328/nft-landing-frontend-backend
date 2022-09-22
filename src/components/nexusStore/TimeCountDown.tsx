import useCountDownTime from 'hooks/useCountDownTime';
import React from 'react';

const TimeCountDown = () => {
  const timeLeft = useCountDownTime();

  return (
    <div>
      <span>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </span>
    </div>
  );
};

export default TimeCountDown;
