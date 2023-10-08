import { NoteListeningGame } from "@/components/NoteListeningGame/NoteListeningGame";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Start } from "./Start";
import { FlashcardContent } from "./FlashcardContent";
import { cooverDeck } from "@/config/decks/angloConcertinaCgWheatstone";

export const PagePracticeCooverNotation = () => {
  const { hasPermission } = useMicrophoneContext();
  if (!hasPermission) return <Start />;

  return (
    <NoteListeningGame deck={cooverDeck}>
      {(props) => <FlashcardContent {...{ ...props }} />}
    </NoteListeningGame>
  );
};
