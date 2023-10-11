import { useState, ReactNode } from "react";
import { Center, Button, Card, CardBody, VStack } from "@chakra-ui/react";
import { RiShieldStarFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
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
  const [seenCardCount, setSeenCardCount] = useState<number>(0);
  const [streakPoints, setStreakPoints] = useState<number>(0);
  const [previousNote, setPreviousNote] = useState<string | null>(null);
  const [timerComplete, setTimerComplete] = useState<boolean>(false);

  const {
    chits,
    promote: promoteChit,
    reset: resetChit,
  } = useSpacedRepetitionFlashcards(deck.flashcards);

  const chitIndex = chits.findIndex(
    (chit) => chit.flashcard.note !== previousNote
  );
  const selectedChit = chits[chitIndex];

  const onCorrectGuess = () => {
    setSeenCardCount(seenCardCount + 1);
    setStreakPoints(streakPoints + 1);
    setPreviousNote(selectedChit.flashcard.note);
    setTimerComplete(false);
    promoteChit(selectedChit.flashcard);
  };

  const onIncorrectGuess = () => {
    setSeenCardCount(seenCardCount + 1);
    setStreakPoints(0);
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

  const flashcardId = `${selectedChit.flashcard.buttonIndex}-${selectedChit.flashcard.action}`;

  return (
    <>
      <Button
        leftIcon={<TbCardsFilled />}
        colorScheme="teal"
        left={0}
        top={0}
        position={"absolute"}
        size="lg"
        p={3}
        variant="ghost"
        onDoubleClick={onCorrectGuess}
      >
        {seenCardCount}
      </Button>

      <Button
        leftIcon={<RiShieldStarFill />}
        colorScheme="teal"
        right={"50%"}
        transform={"translateX(50%)"}
        top={0}
        position={"absolute"}
        size="lg"
        p={3}
        variant="ghost"
      >
        {selectedChit.points}
      </Button>

      <Button
        rightIcon={<AiFillStar />}
        colorScheme="teal"
        right={0}
        top={0}
        position={"absolute"}
        size="lg"
        p={3}
        variant="ghost"
      >
        {streakPoints}
      </Button>

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
              <Card>
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
          <DetectedNoteIcon note={detectedNote} />
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
