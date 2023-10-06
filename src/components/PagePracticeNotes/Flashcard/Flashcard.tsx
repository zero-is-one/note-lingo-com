import { useEffect, useState, useCallback } from "react";
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
  Progress,
  HStack,
} from "@chakra-ui/react";
import { Flashcard as FlashcardType } from "@/types";
import { useCountdown } from "usehooks-ts";
import { SoundButton } from "./SoundButton";
import { AlternateClue } from "./AlternateClue";
import { angloConcertinaCgWheatstoneInstrument } from "@/config/instruments/angloConcertinaCgWheatstone";
import { Genre } from "../useGameState";

type FlashcardProps = {
  flashcard: FlashcardType;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
  genre: Genre;
};

const coutdownSeconds = 3;

export const Flashcard = ({
  genre,
  flashcard,
  onCorrectGuess,
  onIncorrectGuess,
}: FlashcardProps) => {
  const [note, setNote] = useState<string | null>(null);

  const [count, { startCountdown }] = useCountdown({
    countStart: coutdownSeconds,
    intervalMs: 1000,
  });

  const onNote = useCallback(
    ({ note: detectedNote }: { note: null | string }) => {
      if (detectedNote === note) return;
      setNote(detectedNote);

      if (detectedNote === null) return;
      if (Note.midi(detectedNote) !== Note.midi(flashcard.note)) return;

      if (count > 0) return onCorrectGuess();
      onIncorrectGuess();
    },
    [onIncorrectGuess, onCorrectGuess, count, note, flashcard.note]
  );

  useDetectMicrophoneNote(onNote);

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <>
      {count > 0 && (
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

      {count <= 0 && (
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

      <Progress
        sx={{
          "& > div:first-of-type": {
            transitionProperty: "width",
            transitionDuration: ".2s",
          },
        }}
        value={(100 * count) / coutdownSeconds}
        position={"absolute"}
        bottom={0}
        left={0}
        width={"100vw"}
        colorScheme="teal"
      />
    </>
  );
};