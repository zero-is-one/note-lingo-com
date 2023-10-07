import { useState, useCallback, useEffect } from "react";
import { NoteListeningGame } from "@/components/NoteListeningGame/NoteListeningGame";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Start } from "./Start";
import { FlashcardContent } from "./FlashcardContent";
import { deck } from "@/config/decks/angloConcertinaCgWheatstone";
export const PagePracticeCooverNotation = () => {
  const { hasPermission } = useMicrophoneContext();
  if (!hasPermission) return <Start />;

  return (
    <NoteListeningGame deck={deck}>
      {(props) => <FlashcardContent {...{ ...props }} />}
    </NoteListeningGame>
  );
};
