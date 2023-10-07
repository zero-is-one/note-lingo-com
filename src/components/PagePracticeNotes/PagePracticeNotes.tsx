import { useState } from "react";

import { deck as concertinaDeck } from "@/config/decks/angloConcertinaCgWheatstone";
import { StartScreen } from "./StartScreen";
import { Game } from "./Game";
import { MicrophoneAccessWarning } from "../MicrophoneAccessWarning/MicrophoneAccessWarning";

import { GameOptions } from "./types";

export const PagePracticeNotes = () => {
  const [gameOptions, setGameOptions] = useState<GameOptions>({
    deck: concertinaDeck,
    startTime: null,
    genre: "notation",
  });

  return (
    <>
      <MicrophoneAccessWarning />
      {!gameOptions.startTime ? (
        <StartScreen
          gameOptions={gameOptions}
          setGameOptions={setGameOptions}
        />
      ) : (
        <Game gameOptions={gameOptions} />
      )}
    </>
  );
};
