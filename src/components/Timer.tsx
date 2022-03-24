import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../styles/components/Timer.module.scss';

import startButton from '../images/startButton.svg';
import cancelButton from '../images/cancelButton.svg';
import finishedButton from '../images/finishedButton.svg';
import { useTimer } from '../hooks/useTimer';

export function Timer() {
  const { 
    time, 
    StartTimer, 
    active, 
    hasFinished, 
    tamanho,
    StopTimer
  } = useTimer();
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  const [leftMinutes, rightMinutes] = String(minutes).padStart(2, '0').split('');
  const [leftSecond, rightSeconds] = String(seconds).padStart(2, '0').split('');

  return(
    <div className={styles.container}>
      <div className={styles.content}>
          <span>{leftMinutes}</span>
          <span>{rightMinutes}</span>
    
          <p>:</p>
        
          <span>{leftSecond}</span>
          <span>{rightSeconds}</span>
      </div>

      {!active ? (
        <button onClick={StartTimer}>
          <p>começar</p>
          <Image className={styles.img} width={22} height={22} src={startButton} />
        </button>
      ) : (
        <>
        { !hasFinished ? (
          <button className={styles.buttonAbort} onClick={StopTimer}>
            <p>Cancelar exercício</p>
            <Image src={cancelButton} width={20} height={20} />
            <div className={styles.line} style={{width: tamanho}} />
          </button>
        ) : (
          <button className={styles.buttonFinished} disabled>
            <p>Tempo finalizado</p>
            <Image className={styles.img} width={22} height={22} src={finishedButton} />
            <div className={styles.line} style={{width: tamanho}} />
          </button>
        )}
        </>
      )}
       
    </div>
  )
}