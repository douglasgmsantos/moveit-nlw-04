import React, { useContext } from 'react';

import styles from '../styles/components/CountDown.module.css';
import { CountDownContext } from '../contexts/CountDownContext';

const CountDown: React.FC = () => {
  const { minutes, seconds, hasFinished, resetCountDown, startCountDown, isActive } = useContext(CountDownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled className={`${styles.countDownButton}`}>
          Ciclo encerrado
        </button>
      ) : (
          isActive ? (
            <button type="button" onClick={resetCountDown} className={`${styles.countDownButton} ${styles.countDownButtonActive}`}>
              Abandonar ciclo
          </button>
          ) : (
              <button type="button" onClick={startCountDown} className={styles.countDownButton}>
                Iniciar um ciclo
            </button>
            )
        )}
    </div >
  )
}

export default CountDown;