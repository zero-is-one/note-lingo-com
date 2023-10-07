import { NoteListeningGame } from "@/components/NoteListeningGame/NoteListeningGame";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Start } from "./Start";
import { FlashcardContent } from "./FlashcardContent";
import { deck } from "@/config/decks/angloConcertinaCgWheatstone";
import { InstrumentButtonAction } from "@/types";

const order = [
  ...["1", "2", "3", "4", "5"],
  ...["6", "7", "8", "9", "10"],
  ...["1a", "2a", "3a", "4a", "5a"],
];
import { angloConcertinaCgWheatstoneInstrument as instrument } from "@/config/instruments/angloConcertinaCgWheatstone";
import { cooverTablatureNumberingSystem } from "@/config/instruments/angloConcertinaCgWheatstone";

const d = order
  .map((label) => {
    return cooverTablatureNumberingSystem.reduce((acc: number[], el, i) => {
      if (el === label) {
        acc.push(i);
      }
      return acc;
    }, []);
  })
  .flat()
  .map((buttonIndex) => [
    {
      buttonIndex,
      action: "pushBellowsButtonPress" as InstrumentButtonAction,
      note: instrument.buttons[buttonIndex].behaviors.find(
        (behavior) => behavior.action === "pushBellowsButtonPress"
      )?.note,
    },
    {
      buttonIndex,
      action: "pullBellowsButtonPress" as InstrumentButtonAction,
      note: instrument.buttons[buttonIndex].behaviors.find(
        (behavior) => behavior.action === "pullBellowsButtonPress"
      )?.note,
    },
  ])
  .flat();

console.log(d);

export const PagePracticeCooverNotation = () => {
  const { hasPermission } = useMicrophoneContext();
  if (!hasPermission) return <Start />;

  return (
    <NoteListeningGame deck={deck}>
      {(props) => <FlashcardContent {...{ ...props }} />}
    </NoteListeningGame>
  );
};
