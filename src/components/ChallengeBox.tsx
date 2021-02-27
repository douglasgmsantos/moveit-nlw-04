import React, { useContext } from 'react';

import styles from '../styles/components/ChallengeBox.module.css';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';

const ChallengeBox: React.FC = () => {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
  const { resetCountDown } = useContext(CountDownContext)

  const handleChakkengeSucceded = () => {
    completeChallenge()
    resetCountDown();
  }
  const handleChakkengeFailed = () => {
    resetChallenge();
    resetCountDown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeBoxActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button type="button" onClick={handleChakkengeFailed} className={styles.challengFailedButton}>Falhei</button>
            <button type="button" onClick={handleChakkengeSucceded} className={styles.challengSucceededButton}>Finalizei</button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeBoxNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
              Avance de level completando o desafio.
            </p>
          </div>
        )}
    </div>
  )
}

export default ChallengeBox;