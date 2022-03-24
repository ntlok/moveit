import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";



export function useTimer() {

  const useTimer = useContext(TimerContext)

  return useTimer
}