import { useState } from "react";
import {
  Card,
  Center,
  CardBody,
  Button,
  FormLabel,
  Stack,
  Box,
  Select,
  FormControl,
  VStack,
} from "@chakra-ui/react";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { AlernateButtonClue } from "../AlernateButtonClue/AlernateButtonClue";
import { NoteListeningGame } from "@/components/NoteListeningGame/NoteListeningGame";
import { deck as concertinaDeck } from "@/config/decks/angloConcertinaCgWheatstone";
import { SingleNoteSheetMusic } from "@/components/SingleNoteSheetMusic/SingleNoteSheetMusic";
import { Flashcard } from "@/types";
import { InstrumentButtonNoteExplanation } from "@/components/InstrumentButtonNoteExplanation/InstrumentButtonNoteExplanation";
import { SampleSynthProvider } from "@/contexts/SampleSynthContext";
import { Note } from "tonal";

type GameOptions = {
  keySignature: string;
};

export const PagePracticeSheetNotation = () => {
  const { hasPermission } = useMicrophoneContext();
  const [gameOptions, setGameOptions] = useState<GameOptions>({
    keySignature: "C",
  });

  if (!hasPermission)
    return <Start gameOptions={gameOptions} setGameOptions={setGameOptions} />;

  return (
    <SampleSynthProvider>
      <NoteListeningGame deck={concertinaDeck}>
        {(props) => (
          <FlashcardContent gameOptions={gameOptions} {...{ ...props }} />
        )}
      </NoteListeningGame>
    </SampleSynthProvider>
  );
};

export const Start = ({
  gameOptions,
  setGameOptions,
}: {
  gameOptions: GameOptions;
  setGameOptions: (options: GameOptions) => void;
}) => {
  const { requestMicrophone } = useMicrophoneContext();

  return (
    <Center h="100dvh" w="100dvw" bg="gray.100">
      <Card minWidth={300}>
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack spacing="4">
              <FormControl>
                <FormLabel>Key Signature</FormLabel>
                <Select
                  value={gameOptions.keySignature}
                  size="lg"
                  onChange={(e) => {
                    setGameOptions({
                      ...gameOptions,
                      keySignature: e.target.value as string,
                    });
                  }}
                >
                  {["C", "G", "D", "A", "E", "F", "Bb", "Eb", "Ab"].map(
                    (value) => (
                      <option key={value} value={value}>
                        {value.replace("b", "♭").replace("#", "♯")} Major
                      </option>
                    )
                  )}
                </Select>
              </FormControl>

              <Box>
                <Button
                  colorScheme="purple"
                  variant="solid"
                  size={"lg"}
                  w={"100%"}
                  onClick={async () => {
                    setGameOptions({
                      ...gameOptions,
                    });
                    await requestMicrophone();
                  }}
                >
                  Start Session
                </Button>
              </Box>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
};

export const FlashcardContent = ({
  timerComplete,
  flashcard,
  onIncorrectGuess,
  gameOptions,
}: {
  flashcard: Flashcard;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
  timerComplete: boolean;
  gameOptions: GameOptions;
}) => {
  const note = Note.get(flashcard.note);
  return (
    <>
      {!timerComplete && (
        <VStack>
          <SingleNoteSheetMusic
            clef={note.midi! > 53 ? "treble" : "bass"} //Any note above F3 is treble clef
            note={note}
            keySignature={gameOptions.keySignature}
          />
          <AlernateButtonClue flashcard={flashcard} />
        </VStack>
      )}

      {timerComplete && (
        <>
          <InstrumentButtonNoteExplanation mb={5} flashcard={flashcard} />
          <Button w={"100%"} size="lg" onClick={onIncorrectGuess}>
            Next
          </Button>
        </>
      )}
    </>
  );
};
