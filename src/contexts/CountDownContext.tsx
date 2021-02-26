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
  resetCountDown: () => void;
  startCountDown: () => void;
}
let countDownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDowContextData);

export const CountDownProvider = ({ children }: ICountDownProvider) => {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0.1 * 60);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;



  const resetCountDown = () => {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(25 * 60);
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
      startCountDown
    }}>
      {children}
    </CountDownContext.Provider>
  )
}