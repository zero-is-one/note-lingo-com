import { useState } from "react";
import { Box, HStack, Heading, Button } from "@chakra-ui/react";

import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Start } from "./Start";
import {
  angloConcertinaCgWheatstoneInstrument as concertina,
  cooverTablatureNumberingSystem,
} from "@/config/instruments/angloConcertinaCgWheatstone";
import { CooverFingerChart } from "@/components/CooverFingerChart/CooverFingerChart";
import { CooverTablature } from "../CooverTablature/CooverTablature";
import { Flashcard } from "@/types";
import { InstrumentButtonAction } from "@/types";

export const FlashcardContent = ({
  timerComplete,
  flashcard,
  onCorrectGuess,
  onIncorrectGuess,
}: {
  flashcard: Flashcard;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
  timerComplete: boolean;
}) => {
  const action = flashcard.action;
  const desiredNote = flashcard.note;
  const buttonIndex = flashcard.buttonIndex;
  const isLeftHandButton: boolean = buttonIndex
    ? concertina.buttons[buttonIndex].position.x <= 5
    : false;

  return (
    <>
      {!timerComplete && (
        <Box w="80vw">
          <CooverTablature
            label={cooverTablatureNumberingSystem[buttonIndex]}
            position={isLeftHandButton ? "bottom" : "top"}
            action={action}
          />
        </Box>
      )}

      {timerComplete && (
        <>
          <HStack mb={3} justifyContent={"center"} alignItems={"center"}>
            <Box w="40vw">
              <CooverTablature
                label={cooverTablatureNumberingSystem[buttonIndex]}
                position={isLeftHandButton ? "bottom" : "top"}
                action={action}
              />
            </Box>
            <Heading
              fontSize="15cqw"
              p={3}
              userSelect={"none"}
              onDoubleClick={onIncorrectGuess}
            >
              {desiredNote}
            </Heading>
          </HStack>
          <CooverFingerChart
            instrument={concertina}
            numberingSystem={cooverTablatureNumberingSystem}
            buttonIndex={buttonIndex}
            action={action}
          />
        </>
      )}
    </>
  );
};
