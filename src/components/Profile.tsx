import React, { useContext } from 'react';
import styles from "../styles/components/Profile.module.css";
import { ChallengeContext } from '../contexts/ChallengesContext';

const Profile: React.FC = () => {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/douglasgmsantos.png" alt="Douglas Santos" />
      <div>
        <strong>Douglas Santos</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile;