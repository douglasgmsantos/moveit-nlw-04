import React, { useContext } from 'react';
import { useSession } from 'next-auth/client';

import { ImArrowUp } from "react-icons/im";

import { ChallengeContext } from '../../contexts/ChallengesContext';

import styles from "../../styles/components/Profile.module.css";

const Profile: React.FC = () => {
  const { level } = useContext(ChallengeContext);
  const [session] = useSession();

  return (
    <div className={styles.profileContainer}>
      <img src={session.user.image} alt={session.user.name} />
      <div>
        <strong>{session.user.name}</strong>
        <p>
          <ImArrowUp />
          level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile;