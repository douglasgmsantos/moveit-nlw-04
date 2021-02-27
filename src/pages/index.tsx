import styles from '../styles/components/Home.module.css';
import { GetServerSideProps } from 'next'


import Head from 'next/head'

import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import CompleteChallenges from '../components/CompleteChallenges';
import CountDown from '../components/CountDown';
import ChallengeBox from '../components/ChallengeBox';

import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengeProvider } from '../contexts/ChallengesContext';

interface IProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props: IProps) {

  return (
    <ChallengeProvider
      level={Number(props.level)}
      currentExperience={Number(props.currentExperience)}
      challengeCompleted={Number(props.challengeCompleted)}
    >
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
    </ChallengeProvider>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;

  return {
    props: { level, currentExperience, challengeCompleted }
  }
}