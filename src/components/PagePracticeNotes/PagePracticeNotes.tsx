import { useState } from "react";
import { deck as concertinaDeck } from "@/config/decks/angloConcertinaCgWheatstone";
import { StartScreen } from "./StartScreen";
import { NoteListeningGame } from "@/components/NoteListeningGame/NoteListeningGame";
import { GameOptions } from "./types";
import { FlashcardContent } from "./FlashcardContent/FlashcardContent";

export const PagePracticeNotes = () => {
  const [gameOptions, setGameOptions] = useState<GameOptions>({
    deck: concertinaDeck,
    startTime: null,
    genre: "notation",
    keySignature: "C",
  });

  return (
    <>
      {!gameOptions.startTime ? (
        <StartScreen
          gameOptions={gameOptions}
          setGameOptions={setGameOptions}
        />
      ) : (
        <NoteListeningGame deck={gameOptions.deck}>
          {(props) => (
            <FlashcardContent
              {...{
                ...props,
                genre: gameOptions.genre,
                keySignature: gameOptions.keySignature,
              }}
            />
          )}
        </NoteListeningGame>
      )}
    </>
  );
};
