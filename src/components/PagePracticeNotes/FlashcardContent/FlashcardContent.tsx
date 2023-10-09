import { NoteFingerChart } from "@/components/NoteFingerChart/NoteFingerChart";
import { SingleNoteSheetMusic } from "@/components/SingleNoteSheetMusic/SingleNoteSheetMusic";
import { Note } from "tonal";
import { Genre } from "../types";
import { Button, VStack, Box, Heading, HStack } from "@chakra-ui/react";
import { Flashcard as FlashcardType } from "@/types";
import { SoundButton } from "./SoundButton";
import { AlternateClue } from "./AlternateClue";
import { angloConcertinaCgWheatstoneInstrument } from "@/config/instruments/angloConcertinaCgWheatstone";

export const FlashcardContent = ({
  timerComplete,
  genre,
  flashcard,
  onCorrectGuess,
  onIncorrectGuess,
  keySignature,
}: {
  flashcard: FlashcardType;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
  genre: Genre;
  timerComplete: boolean;
  keySignature?: string;
}) => {
  return (
    <Box w="85vw">
      {!timerComplete && (
        <VStack>
          {genre === "notation" && (
            <Box width={"80vw"}>
              <SingleNoteSheetMusic
                note={Note.get(flashcard.note)}
                keySignature={keySignature}
              />
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
      )}

      {timerComplete && (
        <VStack>
          <HStack>
            <Box width={"30vw"}>
              <SingleNoteSheetMusic
                note={Note.get(flashcard.note)}
                keySignature={keySignature}
              />
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
        </VStack>
      )}
    </Box>
  );
};
