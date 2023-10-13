import { NoteFingerChart } from "@/components/NoteFingerChart/NoteFingerChart";
import { SingleNoteSheetMusic } from "@/components/SingleNoteSheetMusic/SingleNoteSheetMusic";
import { Note } from "tonal";
import { VStack, Box, Heading, HStack } from "@chakra-ui/react";
import { Flashcard as FlashcardType } from "@/types";
import { angloConcertinaCgWheatstoneInstrument } from "@/config/instruments/angloConcertinaCgWheatstone";
import { BoxProps } from "@chakra-ui/react";

export const InstrumentButtonNoteExplanation = ({
  flashcard,
  keySignature,
  ...props
}: BoxProps & {
  flashcard: FlashcardType;
  keySignature?: string;
}) => {
  const note = Note.get(flashcard.note);
  return (
    <VStack {...props}>
      <HStack>
        <Box width={"40vw"}>
          <SingleNoteSheetMusic
            note={note}
            keySignature={keySignature}
            clef={note.midi! > 53 ? "treble" : "bass"}
          />
        </Box>
        <Heading fontSize="15cqw" p={3} userSelect={"none"}>
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
    </VStack>
  );
};
