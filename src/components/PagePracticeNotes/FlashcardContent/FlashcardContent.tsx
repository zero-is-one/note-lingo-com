import { NoteFingerChart } from "@/components/NoteFingerChart/NoteFingerChart";
import { SingleNoteSheetMusic } from "@/components/SingleNoteSheetMusic/SingleNoteSheetMusic";
import { Note } from "tonal";
import { Genre } from "../types";
import { Button, VStack, Box, Heading, HStack, Alert } from "@chakra-ui/react";
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
  const note = Note.get(flashcard.note);

  return (
    <Box w="85vw">
      {note.empty && (
        <Alert>Something went wrong. Do not recognize '{flashcard.note}'</Alert>
      )}
      {!timerComplete && !note.empty && (
        <VStack>
          {genre === "notation" && (
            <Box width={"80vw"}>
              <SingleNoteSheetMusic
                clef={note.midi! > 53 ? "treble" : "bass"} //Any note above F3 is treble clef
                note={note}
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
            <SoundButton playOnMount={true} note={flashcard.note} />
          )}
          <AlternateClue flashcard={flashcard} />
        </VStack>
      )}

      {timerComplete && (
        <VStack>
          <HStack>
            <Box width={"30vw"}>
              <SingleNoteSheetMusic
                note={note}
                keySignature={keySignature}
                clef={note.midi! > 53 ? "treble" : "bass"}
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
