import styles from '../../styles/components/ChallangeComplated.module.scss';
import { useChallenge } from '../hooks/useChallenge';

export function ChallengesComplated() {

  const { challengeCompleted } = useChallenge()



  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <strong>Desafios completados</strong>
        <span>{challengeCompleted}</span>
      </div>
      <div className={styles.line} />
    </div>
  )
}