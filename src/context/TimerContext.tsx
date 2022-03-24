import { createContext, useEffect, useState } from "react";
import { useChallenge } from "../hooks/useChallenge";

type TimerContextType = {
  time: number,
  hasFinished: boolean,
  active: boolean,
  tamanho: string,
  StartTimer: () => void,
  StopTimer: () => void,
}

let intervalo: NodeJS.Timeout;

export const TimerContext = createContext({} as TimerContextType);

export function TimeContextProvider({children}) {

  const { StartNewChallenge, activeChallenge } = useChallenge()

  const [active, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [time, setTime] = useState(.05 * 60);
  const [tamanho, setTamanho] = useState('0%')
  const [total, setTotal] = useState(1)

  

  function StartTimer() {
    setActive(true);
  }

  function StopTimer() {
    setActive(false)
    setHasFinished(false)
    setTime(1*60)
    clearTimeout(intervalo)
  }
  

  useEffect(() => {
    if(active && time > 0) {
      intervalo = setTimeout(() => {
        setTime(prevState => --prevState)
        setTotal(prevState => prevState + 1)

        
                

      }, 1000)
    } else if(active && time == 0) {
      setHasFinished(true);
      StartNewChallenge()
    }

    

    
    setTamanho(total * 100 / 60 +'%')
    

  }, [active, time])

  

  return(
    <TimerContext.Provider 
      value={{
        tamanho,
        hasFinished,
        time,
        active,
        StartTimer,
        StopTimer
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}