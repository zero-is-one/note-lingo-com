import { Flashcard, InstrumentBehavior } from "@/types";
import { angloConcertinaCgWheatstoneInstrument } from "@/config/instruments/angloConcertinaCgWheatstone";
import { RxTextAlignBottom, RxTextAlignTop } from "react-icons/rx";

import { HStack, Heading, Icon } from "@chakra-ui/react";
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
      <HStack>
        {position === "Back" && <Icon boxSize={10} as={RxTextAlignBottom} />}
        <Heading>{position}</Heading>
        {position === "Front" && <Icon boxSize={10} as={RxTextAlignTop} />}
      </HStack>
    </>
  );
};
