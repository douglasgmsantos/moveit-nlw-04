
import React, { useContext } from 'react';
import { ChallengeContext } from '../../contexts/ChallengesContext';

import styles from '../../styles/components/ExperienceBar.module.css';

const ExperienceBar: React.FC = () => {
  const { currentExperience, experienceNextLevel } = useContext(ChallengeContext);

  const percentToNextLevel = Math.floor(currentExperience * 100) / experienceNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span className={styles.currentExperience} style={{ left: "50%" }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceNextLevel} xp</span>
    </header>
  )
}

export default ExperienceBar;