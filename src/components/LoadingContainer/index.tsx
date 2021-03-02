import React from 'react';
import { AiOutlineLoading } from "react-icons/ai";

import styles from "../../styles/components/LoadingContainer.module.css";

const LoadingContainer: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <AiOutlineLoading size={50} color="var(--red)" />
    </div>
  )
}

export default LoadingContainer;