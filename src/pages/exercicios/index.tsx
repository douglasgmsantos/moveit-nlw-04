import { GetServerSideProps } from 'next';

import { useSession } from 'next-auth/client';
import Head from 'next/head';

import ExperienceBar from "../../components/ExperienceBar";
import Profile from "../../components/Profle";
import CompleteChallenges from '../../components/CompleteChallenges';
import CountDown from '../../components/CountDown';
import ChallengeBox from '../../components/ChallengeBox';
import Menu from '../../components/Menu';
import TimerCountDown from '../../components/TimerCountDown';

import { CountDownProvider } from '../../contexts/CountDownContext';
import { ChallengeProvider } from '../../contexts/ChallengesContext';

import styles from '../../styles/components/Exercicios.module.css';
import LoadingContainer from '../../components/LoadingContainer';


interface IProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

function Exercicios({
  level,
  currentExperience,
  challengeCompleted
}: IProps) {
  const [session, loading] = useSession();

  return (
    <ChallengeProvider
      level={Number(level)}
      currentExperience={Number(currentExperience)}
      challengeCompleted={Number(challengeCompleted)}
    >
      {Boolean(session) && !loading ? (
        <div className={styles.main}>
          <Menu />
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
                  <TimerCountDown />
                  <CountDown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountDownProvider>
          </div>
        </div>
      ) : (
          <LoadingContainer />
        )

      }

    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies;
  const isAuthenticated = (req) => {
    if (!req ?.headers ?.cookie) {
      return false;
    }

    const match = req.headers.cookie
      .split(';')
      .find((item) => item.trim().startsWith('authenticated='));

    if (!match) {
      return false;
    }

    return Boolean(match.split('=')[1]);
  };

  if (!isAuthenticated(ctx.req)) {
    ctx.res.writeHead(303, { Location: '/login' });
    ctx.res.end();
  }

  return {
    props: { level: level || 1, currentExperience: currentExperience || 0, challengeCompleted: challengeCompleted || 0 }
  }
}

export default Exercicios;