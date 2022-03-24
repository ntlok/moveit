import styles from '../../styles/components/ExperienceBar.module.scss';
import { useChallenge } from '../hooks/useChallenge';

export function ExperienceBar() {

  const { experienceToNextLevel, currentExperience } = useChallenge()


  const experienceWidth = currentExperience * 100 / experienceToNextLevel

  

  const data = {
    width: experienceWidth + '%'
  }


  return (
    <div className={styles.container}>
      <span>0 xp</span>
      <div>
        <div style={data}>
          <span>{currentExperience} xp</span>
        </div>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </div>
  )
}