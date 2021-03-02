import { useState, useContext } from "react";

import styles from "../../styles/components/TimerCountDown.module.css";
import { CountDownContext } from "../../contexts/CountDownContext";

interface ITimer {
  timer: number;
  active: boolean;
}

const TimerCountDown = () => {
  const { changeTimerUsed } = useContext(CountDownContext);

  const [times, setTimes] = useState([
    { timer: 1 * 60, active: true },
    { timer: 5 * 60, active: false },
    { timer: 10 * 60, active: false },
    { timer: 15 * 60, active: false },
    { timer: 30 * 60, active: false }
  ]);

  const handleChangeTimer = (timer: ITimer) => {
    changeTimerUsed(timer.timer);
    timer.active = true;
    var newTimes = times.map((t: ITimer) => {
      t.active = false;
      return t
    });

    const index = newTimes.findIndex(t => t.timer == timer.timer);
    newTimes[index].active = true;

    setTimes(newTimes);
  }


  return (
    <div className={styles.containerTimerCountDown}>
      {times.map((time: ITimer) => {
        const minutes = Math.floor(time.timer / 60);
        const seconds = time.timer % 60;

        return (
          <button
            onClick={() => handleChangeTimer(time)}
            key={time.timer}
            className={`${styles.buttonTimer} ${time.active && styles.buttonActive}`}>
            {String(minutes).padStart(2, '0').split('')}:{String(seconds).padStart(2, '0').split('')}
          </button>
        )
      })}
    </div>
  )
}

export default TimerCountDown;