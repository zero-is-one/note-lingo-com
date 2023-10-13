import { Card, Center, CardBody, Button } from "@chakra-ui/react";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";

import { NoteListeningGame } from "@/components/NoteListeningGame/NoteListeningGame";
import { deck as concertinaDeck } from "@/config/decks/angloConcertinaCgWheatstone";

import { Flashcard } from "@/types";
import { InstrumentButtonNoteExplanation } from "@/components/InstrumentButtonNoteExplanation/InstrumentButtonNoteExplanation";
import { SoundButton } from "./SoundButton";
import { SampleSynthProvider } from "@/contexts/SampleSynthContext";

export const PagePracticeSound = () => {
  const { hasPermission } = useMicrophoneContext();
  if (!hasPermission) return <Start />;

  return (
    <SampleSynthProvider>
      <NoteListeningGame deck={concertinaDeck}>
        {(props) => <FlashcardContent {...{ ...props }} />}
      </NoteListeningGame>
    </SampleSynthProvider>
  );
};

export const Start = () => {
  const { requestMicrophone } = useMicrophoneContext();

  return (
    <Center h="100dvh" w="100dvw" bg="gray.100" overflow={"hidden"}>
      <Card>
        <CardBody>
          <Button onClick={requestMicrophone} colorScheme="purple" size={"lg"}>
            Start
          </Button>
        </CardBody>
      </Card>
    </Center>
  );
};

export const FlashcardContent = ({
  timerComplete,
  flashcard,
  onIncorrectGuess,
}: {
  flashcard: Flashcard;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
  timerComplete: boolean;
}) => {
  return (
    <>
      {!timerComplete && (
        <SoundButton
          colorScheme="blue"
          w={"100%"}
          size={"lg"}
          note={flashcard.note}
          playOnMount={true}
        />
      )}

      {timerComplete && (
        <>
          <InstrumentButtonNoteExplanation mb={5} flashcard={flashcard} />
          <SoundButton
            w={"100%"}
            mb={3}
            size="lg"
            colorScheme="blue"
            note={flashcard.note}
            playOnMount={true}
          />
          <Button w={"100%"} size="lg" onClick={onIncorrectGuess}>
            Next
          </Button>
        </>
      )}
    </>
  );
};
