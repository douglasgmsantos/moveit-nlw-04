import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { ChallengeContext } from "./ChallengesContext";

interface ICountDownProvider {
  children: ReactNode
}

interface CountDowContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: Boolean;
  timeUsed: number;
  resetCountDown: () => void;
  startCountDown: () => void;
  changeTimerUsed: (timer: number) => void;
}
let countDownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDowContextData);

export const CountDownProvider = ({ children }: ICountDownProvider) => {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [timeUsed, setTimeUsed] = useState(1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(1 * 60);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;


  const changeTimerUsed = (time: number) => {
    setTimeUsed(time);
    setTime(time)
  }

  const resetCountDown = () => {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(timeUsed);
    setHasFinished(false);
  }

  const startCountDown = () => {
    setIsActive(true);
  }

  useEffect(() => {
    if (isActive && time > 0)
      countDownTimeout = setTimeout(() => setTime(time - 1), 1000)
    else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }


  }, [isActive, time])

  return (
    <CountDownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      resetCountDown,
      startCountDown,
      timeUsed,
      changeTimerUsed
    }}>
      {children}
    </CountDownContext.Provider>
  )
}