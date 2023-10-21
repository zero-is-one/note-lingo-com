import { NoteListeningGame } from "@/components/NoteListeningGame/NoteListeningGame";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Start } from "./Start";
import { FlashcardContent } from "./FlashcardContent";
import { cooverDeck } from "@/config/decks/angloConcertinaCgWheatstone";
import { BackButton } from "../BackButton/BackButton";

export const PagePracticeCooverNotation = () => {
  const { hasPermission } = useMicrophoneContext();

  return (
    <>
      <BackButton />
      {!hasPermission && <Start />}
      {hasPermission && (
        <NoteListeningGame deck={cooverDeck}>
          {(props) => <FlashcardContent {...{ ...props }} />}
        </NoteListeningGame>
      )}
    </>
  );
};
