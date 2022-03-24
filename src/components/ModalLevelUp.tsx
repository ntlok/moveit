
import Image from 'next/image';
import styles from '../../styles/components/ModalLevelUp.module.scss';
import { useChallenge } from '../hooks/useChallenge';

import cancel from '../images/cancelButton.svg'
import background from '../images/modalBackground.svg'

export function ModalLevelUp() {

  const { level, CloseModal } = useChallenge()

  return(
    <div className={styles.overlay}>
      <div className={styles.content}>
        

        <div className={styles.level}>
          <header>{level}</header>
          
          <Image width={300} height={200} src={background} />
        </div>

        <div className={styles.text}>
          <strong>Parabéns</strong>
          <p>Você alcançou um novo level</p>
        </div>

        <button onClick={CloseModal} type='button'>
          <Image src={cancel} alt="" />
        </button>
      </div>
    </div>
  )
}