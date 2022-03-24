import Image from 'next/image';
import styles from '../../styles/components/Challange.module.scss';

import eye from '../images/eye.svg'
import body from '../images/body.svg'
import levelUp from '../images/bigArrowUp.svg';
import { ChallegeType } from '../context/ChallengeContext';
import { useChallenge } from '../hooks/useChallenge';
import { useTimer } from '../hooks/useTimer';



export function Challenge() {


  const { ChallengeFinished, ChallengeCanceled, activeChallenge } = useChallenge()
  const { StopTimer } = useTimer()

  function Completed() {
    ChallengeFinished()
    StopTimer()
  }

  function Canceled() {
    StopTimer()
    ChallengeCanceled()
  }

  const image = activeChallenge?.type == 'body' ? body : eye;


  return(
    <>
      { activeChallenge ? (

        <div className={styles.challenge}>
          <div className={styles.content}>
            <strong>Ganhe {activeChallenge.amount}px</strong>
            <div className={styles.line} />
    
            <Image src={image} />
    
            <h2>Exercite-se</h2>
    
            <p>
              {activeChallenge.description}
            </p>
          </div>
  
          <div className={styles.buttons}>
            <button onClick={Canceled}>Falhei</button>
            <button onClick={Completed}>Completei</button>
          </div>
        </div>
      ) : (
        <div className={styles.messageBox}>
          <span>Inicie um ciclo <br /> para receber desafios</span>
  
          <div>
            <Image src={levelUp} />
            <p>Avance de level completando os desafios</p>
          </div>
        </div>
      )

      }
    </>
    
  )
}

// export function Challenge({amount, type, description}: ChallegeType) {

//   const { ChallengeFinished, ChallengeCanceled } = useChallenge()
//   const { StopTimer } = useTimer()

//   function Completed() {
//     ChallengeFinished()
//     StopTimer()
//   }

//   function Canceled() {
//     StopTimer()
//     ChallengeCanceled
//   }

//   const image = type == 'body' ? body : eye;

//   return(
//     <div className={styles.challenge}>
//       <div className={styles.content}>
//         <strong>Ganhe {amount}px</strong>
//         <div className={styles.line} />

//         <Image src={image} />

//         <h2>Exercite-se</h2>

//         <p>
//           {description}
//         </p>
//       </div>

//       <div className={styles.buttons}>
//         <button onClick={Canceled}>Falhei</button>
//         <button onClick={Completed}>Completei</button>
//       </div>
//     </div>
//   )
// }