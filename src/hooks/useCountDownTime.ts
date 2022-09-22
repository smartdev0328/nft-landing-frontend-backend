import { useState, useEffect } from 'react';

const calculateTimeLeft = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  //const difference = +new Date('July 6, 2022 13:00:00 UTC-0000').getTime() - +new Date(new Date().toUTCString()).getTime();
  const difference = +new Date('July 6, 2022 3:15:00 UTC-0000').getTime() - +new Date(new Date().toUTCString()).getTime();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

const useCountDownTime = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return timeLeft;
};

export default useCountDownTime;
