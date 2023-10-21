import { useState, ReactNode } from "react";
import { Center, Card, CardBody, VStack, HStack } from "@chakra-ui/react";
import { ImBinoculars } from "react-icons/im";
import { TbCardsFilled } from "react-icons/tb";
import { CardCountdownTimer } from "../CardCountdownTimer/CardCountdownTimer";
import { AnimatePresence, motion } from "framer-motion";
import { useDetectMicrophoneNote } from "@/hooks/useDetectMicrophoneNote";
import { useSpacedRepetitionFlashcards } from "@/hooks/useSpacedRepetitionFlashcards";
import { Note } from "tonal";
import { DetectedNoteIcon } from "./DetectedNoteIcon";
import { Deck, Flashcard } from "@/types";

export const NoteListeningGame = ({
  deck,
  children,
}: {
  deck: Deck;
  children: ({
    onCorrectGuess,
    onIncorrectGuess,
    timerComplete,
    flashcard,
  }: {
    onCorrectGuess: () => void;
    onIncorrectGuess: () => void;
    timerComplete: boolean;
    flashcard: Flashcard;
  }) => ReactNode;
}) => {
  const [detectedNote, setDetectedNote] = useState<string | null>(null);
  const [totalSeenCardCount, setTotalSeenCardCount] = useState<number>(0);
  const [totalUniqueCardIdsSeen, setTotalUniqueCardIdsSeen] = useState<
    Set<string>
  >(new Set());
  const [previousNote, setPreviousNote] = useState<string | null>(null);
  const [timerComplete, setTimerComplete] = useState<boolean>(false);

  const {
    chits,
    promote: promoteChit,
    reset: resetChit,
  } = useSpacedRepetitionFlashcards(deck.flashcards);

  const selecteChitIndex = chits.findIndex(
    (chit) => chit.flashcard.note !== previousNote
  );
  const selectedChit = chits[selecteChitIndex];
  const flashcardId = `${selectedChit.flashcard.buttonIndex}-${selectedChit.flashcard.action}-${selectedChit.flashcard.note}`;

  const onCorrectGuess = () => {
    setTotalSeenCardCount(totalSeenCardCount + 1);
    setTotalUniqueCardIdsSeen(totalUniqueCardIdsSeen.add(flashcardId));
    setPreviousNote(selectedChit.flashcard.note);
    setTimerComplete(false);
    promoteChit(selectedChit.flashcard);
  };

  const onIncorrectGuess = () => {
    setTotalSeenCardCount(totalSeenCardCount + 1);

    setPreviousNote(selectedChit.flashcard.note);
    setTimerComplete(false);
    resetChit(selectedChit.flashcard);
  };

  useDetectMicrophoneNote(({ note }: { note: null | string }) => {
    if (detectedNote === note) return;
    setDetectedNote(note);

    if (note === null) return;
    if (Note.midi(note) !== Note.midi(selectedChit.flashcard.note)) return;

    if (!timerComplete) return onCorrectGuess();
    onIncorrectGuess();
  });

  return (
    <>
      <HStack
        position={"absolute"}
        left={0}
        bottom={0}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        pb={1}
      >
        <HStack p={4} onDoubleClick={onCorrectGuess}>
          <ImBinoculars size={16} />
          <span>{totalSeenCardCount}</span>
        </HStack>

        <HStack p={4} width={140} justifyContent={"center"}>
          <span>{totalUniqueCardIdsSeen.size}</span>
          <TbCardsFilled size={20} />
          <span>{deck.flashcards.length}</span>
        </HStack>

        <DetectedNoteIcon note={detectedNote} />
      </HStack>

      <Center h="100dvh" w="100dvw" bg="gray.100" overflow={"hidden"}>
        <VStack>
          <AnimatePresence mode="wait">
            <motion.div
              key={flashcardId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "linear",
                duration: 0.1,
              }}
            >
              <Card w={"calc(100vw - 32px)"}>
                <CardBody>
                  {children({
                    onCorrectGuess,
                    onIncorrectGuess,
                    timerComplete,
                    flashcard: selectedChit.flashcard,
                  })}
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>
        </VStack>
      </Center>

      <CardCountdownTimer
        key={flashcardId}
        countStartSeconds={3}
        onCompleteCallback={() => {
          setTimerComplete(true);
        }}
      />
    </>
  );
};
