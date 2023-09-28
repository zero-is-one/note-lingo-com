import { useContext } from "react";
import { GameContext, GameContextType } from "@/contexts/GameContext";

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a Microphone Provider");
  }
  return context as GameContextType;
};
