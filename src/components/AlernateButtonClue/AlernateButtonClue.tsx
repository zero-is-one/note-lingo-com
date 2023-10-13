import { Flashcard, InstrumentBehavior } from "@/types";
import { angloConcertinaCgWheatstoneInstrument } from "@/config/instruments/angloConcertinaCgWheatstone";

import { Heading } from "@chakra-ui/react";
export const AlernateButtonClue = ({ flashcard }: { flashcard: Flashcard }) => {
  const hasNoteConflict = angloConcertinaCgWheatstoneInstrument.buttons.some(
    (button, index) =>
      (button.behaviors as InstrumentBehavior[]).find(
        (behavior) =>
          behavior.note === flashcard.note && index !== flashcard.buttonIndex
      )
  );

  if (!hasNoteConflict) return <></>;

  if (flashcard.note === "G3")
    return (
      <Heading>
        {flashcard.action === "pullBellowsButtonPress" ? "Pull" : "Push"}
      </Heading>
    );

  const position =
    flashcard.buttonIndex <= 9
      ? "Front"
      : flashcard.buttonIndex >= 20
      ? "Back"
      : "Middle";

  return (
    <>
      <Heading>{position}</Heading>
    </>
  );
};
