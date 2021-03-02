import React, { useContext } from 'react';

import styles from '../../styles/components/CompleteChallenges.module.css'
import { ChallengeContext } from '../../contexts/ChallengesContext';


const CompleteChallenges: React.FC = () => {
  const { challengeCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completeChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengeCompleted}</span>
    </div>
  )
}

export default CompleteChallenges;