import { useState, useEffect } from "react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const useCountdown = (
  showDate: string,
  showTime: string,
): CountdownTime => {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      if (!showDate || !showTime) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      try {
        const dateObj = new Date(showDate);

        if (isNaN(dateObj.getTime())) {
          console.error("Invalid show_date format:", showDate);
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true,
          });
          return;
        }

        const timeRegex = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;
        const match = showTime.match(timeRegex);

        if (!match) {
          console.error("Invalid show_time format:", showTime);
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true,
          });
          return;
        }

        let hour = parseInt(match[1]);
        const minute = parseInt(match[2]);
        const period = match[3].toUpperCase();

        if (period === "PM" && hour !== 12) {
          hour += 12;
        } else if (period === "AM" && hour === 12) {
          hour = 0;
        }

        const showDateTime = new Date(dateObj);
        showDateTime.setHours(hour, minute, 0, 0);

        const now = new Date();
        const diff = showDateTime.getTime() - now.getTime();

        if (diff <= 0) {
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true,
          });
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
        });
      } catch (error) {
        console.error("Countdown calculation error:", error, {
          showDate,
          showTime,
        });
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [showDate, showTime]);

  return countdown;
};
