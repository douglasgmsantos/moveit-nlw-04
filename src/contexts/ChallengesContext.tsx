import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';

import LevelUpModal from "../components/LevelUpModal";

interface IChallengesProvider {
  children: ReactNode
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengeContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  activeChallenge: IChallenge;
  experienceNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as IChallengeContextData);

export const ChallengeProvider = ({ children, ...rest }: IChallengesProvider) => {
  const [level, setLevel] = useState(rest.level || 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0);
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted || 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengeCompleted', String(challengeCompleted));

  }, [level, currentExperience, challengeCompleted])

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const closeLevelUpModal = () => setIsLevelUpModalOpen(false);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  const startNewChallenge = () => {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === "granted") {
      new Notification('Novo Desafio ', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  const resetChallenge = () => setActiveChallenge(null);

  const completeChallenge = () => {
    if (!activeChallenge)
      return;

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceNextLevel) {
      finalExperience -= experienceNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }



  return (
    <ChallengeContext.Provider value={{
      level,
      currentExperience,
      challengeCompleted,
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceNextLevel,
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}