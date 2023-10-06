import { useState } from "react";
import { useGameState } from "./useGameState";
import { deck as concertinaDeck } from "@/config/decks/angloConcertinaCgWheatstone";
import { Settings } from "./Settings";
import { Game } from "./Game";
import { MicrophoneAccessWarning } from "../MicrophoneAccessWarning/MicrophoneAccessWarning";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";

console.log({ concertinaDeck });

export const PagePracticeNotes = () => {
  const [isStarted, setIsStarted] = useState(false);
  const gameState = useGameState(concertinaDeck);
  const { requestMicrophone } = useMicrophoneContext();

  return (
    <>
      <MicrophoneAccessWarning />
      {!isStarted && (
        <Settings
          gameState={gameState}
          onStart={() => {
            setIsStarted(true);
            requestMicrophone();
          }}
        />
      )}
      {isStarted && <Game gameState={gameState} />}
    </>
  );
};
