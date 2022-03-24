import { useContext } from "react";
import { ChallengeContext } from "../context/ChallengeContext";



export function useChallenge() {

  const useChallange = useContext(ChallengeContext);

  return useChallange
}