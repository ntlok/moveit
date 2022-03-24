import Image from 'next/image';
import styles from '../../styles/components/Profile.module.scss';
import { useChallenge } from '../hooks/useChallenge';

import levelImg from '../images/levelUp.svg';

export function Profile() {

  const { level, activeChallenge } = useChallenge()

  console.log(level)

  return (
    <div className={styles.content}>
      <img src="https://github.com/ntlok.png" alt="" />
      <div className={styles.details}>
        <strong>Nathan Nascimento</strong>
        <div className={styles.level}>
          <Image src={levelImg} />
          <span>Level {level}</span>
        </div>
      </div>
    </div>
  )
}