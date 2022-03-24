import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

import challenges from '../../challange.json';
import { ModalLevelUp } from "../components/ModalLevelUp";


export type ChallegeType = {
  type?: 'body' | 'eye',
  description?: string,
  amount?: number,
}

type ChallengeContextType = {
  level: number,
  currentExperience: number,
  challengeCompleted: number,
  activeChallenge: ChallegeType,
  experienceToNextLevel: number,
  ChallengeFinished: () => void,
  ChallengeCanceled?: () => void,
  StartNewChallenge?: () => void,
  CloseModal?: () => void,
}

type ChallengeProviderProps = {
  children: ReactNode,
  level?: number,
  currentExperience?: number,
  challengeCompleted?: number,
}

export const ChallengeContext = createContext({} as ChallengeContextType);


export function ChallengeContextProvider({ children, ...rest }: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level || 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0);
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted|| 0);
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [modal, setModal] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengeCompleted', String(challengeCompleted))

  }, [level, currentExperience, challengeCompleted])

  function ChallengeFinished() {

    const { amount } = activeChallenge

    let experienceResult = currentExperience + amount

    if ( experienceResult >= experienceToNextLevel) {
      const result = currentExperience - experienceToNextLevel;

      setCurrentExperience(result)
      setLevel(prevState => ++prevState)
      setModal(true)
    }


    setChallengeCompleted(prevState => ++prevState );
    setCurrentExperience(prevState => prevState + amount)
    setActiveChallenge(null)
    


  }

  function ChallengeCanceled() {
    setCurrentExperience(prevState => prevState);
    setActiveChallenge(null)
  }

  function StartNewChallenge() {
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeIndex];

    setActiveChallenge(challenge);

    if(Notification.permission === 'granted') {
      new Notification('Novo Desafio!', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function CloseModal() {
    setModal(false)
  }

  return(
    <ChallengeContext.Provider 
      value={{
        level,
        currentExperience,
        challengeCompleted,
        ChallengeFinished,
        experienceToNextLevel,
        ChallengeCanceled,
        activeChallenge,
        StartNewChallenge,
        CloseModal
      }}
    >
      {children}

      { modal && <ModalLevelUp />}
    </ChallengeContext.Provider>
  )
}