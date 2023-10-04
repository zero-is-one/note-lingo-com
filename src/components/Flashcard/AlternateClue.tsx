import { Flashcard } from "@/types";
import { angloConcertinaCgWheatstoneInstrument } from "@/config/instruments/angloConcertinaCgWheatstone";

import { Heading } from "@chakra-ui/react";
export const AlternateClue = ({ flashcard }: { flashcard: Flashcard }) => {
  const isMainRow = flashcard.buttonIndex >= 10 && flashcard.buttonIndex <= 19;
  const isFrontRow = flashcard.buttonIndex <= 9;
  //const isBackRow = flashcard.buttonIndex >= 20;
  const hasNoteConflict = angloConcertinaCgWheatstoneInstrument.buttons.some(
    (button, index) =>
      button.behaviors.find(
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
  if (isMainRow) return <></>;

  return (
    <>
      <Heading>{`${isFrontRow ? "front" : "back"}`}</Heading>
    </>
  );
};
