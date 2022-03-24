import { GetServerSideProps } from 'next'
import styles from '../../styles/Home.module.scss'
import { Challenge } from '../components/Challenge'
import { ChallengesComplated } from '../components/ChallengesComplated'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { Timer } from '../components/Timer'
import { ChallengeContextProvider } from '../context/ChallengeContext'
import { TimeContextProvider } from '../context/TimerContext'

interface HomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengeContextProvider 
      currentExperience={props.currentExperience}
      level={props.level}
      challengeCompleted={props.challengeCompleted}
    >
      <div className={styles.container}>
        <ExperienceBar />

        <TimeContextProvider>
          <section className={styles.mainContent}>
            <div className={styles.leftContent}>
                <Profile />
                <ChallengesComplated/>
                <Timer />
            </div>
            <div className={styles.rightContent}>
              <Challenge />
            </div>
          </section>
        </TimeContextProvider>
      </div>
    </ChallengeContextProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (cpx) => {

  const { challengeCompleted, currentExperience, level} = cpx.req.cookies;
  
  return {
    props: {
      challengeCompleted: Number(challengeCompleted),
      level: Number(level),
      currentExperience: Number(currentExperience)
    }
  } 
}