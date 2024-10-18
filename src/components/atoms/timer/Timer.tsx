import React, { useEffect } from "react";

/* ---------------------------------- Style --------------------------------- */
import "./Timer.scss";

/* ---------------------------------- Utils --------------------------------- */
import { formatTime } from "../../../utils/functions";
import { useGameStore } from "../../../store/store";

/* -------------------------------------------------------------------------- */
/*                                    Timer                                   */
/* -------------------------------------------------------------------------- */
const Timer = () => {
  const { minutes, seconds, milliseconds } = formatTime(
    useGameStore((state) => state.time)
  );
  const updateTime = useGameStore((state) => state.updateTime);
  const isActive = useGameStore((store) => store.isTimerActive);

  useEffect(() => {
    let interval: number = 0;

    if (isActive) {
      interval = setInterval(() => {
        updateTime();
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, updateTime]);

  /* --------------------------------- Render --------------------------------- */
  return (
    <div className="time-container">
      <p className="time">
        {minutes}:{seconds}:{milliseconds}
      </p>
    </div>
  );
};

export default Timer;
