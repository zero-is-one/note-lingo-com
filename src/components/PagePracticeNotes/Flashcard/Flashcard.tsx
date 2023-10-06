import { useState, useCallback } from "react";
import { useDetectMicrophoneNote } from "@/hooks/useDetectMicrophoneNote";
import { NoteFingerChart } from "@/components/NoteFingerChart/NoteFingerChart";
import { SingleNoteSheetMusic } from "@/components/SingleNoteSheetMusic/SingleNoteSheetMusic";
import { Note } from "tonal";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  VStack,
  Text,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Flashcard as FlashcardType } from "@/types";

import { SoundButton } from "./SoundButton";
import { AlternateClue } from "./AlternateClue";
import { angloConcertinaCgWheatstoneInstrument } from "@/config/instruments/angloConcertinaCgWheatstone";
import { Genre } from "../useGameState";

import { CardCountdownTimer } from "@/components/CardCountdownTimer/CardCountdownTimer";

type FlashcardProps = {
  flashcard: FlashcardType;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
  genre: Genre;
};

export const Flashcard = ({
  genre,
  flashcard,
  onCorrectGuess,
  onIncorrectGuess,
}: FlashcardProps) => {
  const [timerComplete, setTimerComplete] = useState<boolean>(false);
  const [note, setNote] = useState<string | null>(null);

  useDetectMicrophoneNote(
    useCallback(
      ({ note: detectedNote }: { note: null | string }) => {
        if (detectedNote === note) return;
        setNote(detectedNote);

        if (detectedNote === null) return;
        if (Note.midi(detectedNote) !== Note.midi(flashcard.note)) return;

        if (!timerComplete) return onCorrectGuess();
        onIncorrectGuess();
      },
      [onIncorrectGuess, onCorrectGuess, note, flashcard.note, timerComplete]
    )
  );

  return (
    <>
      {!timerComplete && (
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          exit={{ y: -60 }}
          transition={{ duration: 0.1 }}
        >
          <Card p={6}>
            <VStack>
              {genre === "notation" && (
                <Box width={"50vw"}>
                  <SingleNoteSheetMusic note={Note.get(flashcard.note)} />
                </Box>
              )}
              {genre === "name" && (
                <Heading
                  fontSize="15cqw"
                  p={3}
                  onDoubleClick={onCorrectGuess}
                  userSelect={"none"}
                >
                  {flashcard.note}
                </Heading>
              )}
              {genre === "sound" && (
                <SoundButton
                  duration="1n"
                  playOnMount={true}
                  note={flashcard.note}
                />
              )}
              <AlternateClue flashcard={flashcard} />
            </VStack>
          </Card>
        </motion.div>
      )}

      {timerComplete && (
        <VStack>
          <Card width={"90vw"} p={5} display={"flex"} alignItems={"center"}>
            <HStack>
              <Box width={"30vw"}>
                <SingleNoteSheetMusic note={Note.get(flashcard.note)} />
              </Box>
              <Heading
                fontSize="15cqw"
                p={3}
                onDoubleClick={onCorrectGuess}
                userSelect={"none"}
              >
                {flashcard.note}
              </Heading>
            </HStack>

            <Box width={"100%"}>
              <NoteFingerChart
                instrument={angloConcertinaCgWheatstoneInstrument}
                buttonIndex={flashcard.buttonIndex}
                action={flashcard.action}
              />
            </Box>
            <SoundButton note={flashcard.note} />
            <Button mt={4} onClick={onIncorrectGuess}>
              Next
            </Button>
          </Card>

          <Text fontSize="xl">-- {note} --</Text>
        </VStack>
      )}

      <CardCountdownTimer
        countStartSeconds={3}
        onCompleteCallback={() => {
          setTimerComplete(true);
        }}
      />
    </>
  );
};
