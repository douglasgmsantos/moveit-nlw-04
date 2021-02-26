import styles from '../styles/components/Home.module.css';

import Head from 'next/head'

import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import CompleteChallenges from '../components/CompleteChallenges';
import CountDown from '../components/CountDown';
import ChallengeBox from '../components/ChallengeBox';

import { CountDownProvider } from '../contexts/CountDownContext';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      <CountDownProvider>
        <section>
          <div>
            <Profile />
            <CompleteChallenges />
            <CountDown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountDownProvider>
    </div>
  )
}
