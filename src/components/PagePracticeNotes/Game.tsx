import { useState } from "react";
import { Center, Button } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { TbCardsFilled } from "react-icons/tb";
import { Flashcard } from "./Flashcard/Flashcard";
import { AnimatePresence, motion } from "framer-motion";
import { GameOptions } from "./types";
import { useSpacedRepetitionFlashcards } from "@/hooks/useSpacedRepetitionFlashcards";

export const Game = ({ gameOptions }: { gameOptions: GameOptions }) => {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [streakPoints, setStreakPoints] = useState<number>(0);
  const [previousNote, setPreviousNote] = useState<string | null>(null);

  const { chits, promote, reset } = useSpacedRepetitionFlashcards(
    gameOptions.deck.flashcards
  );

  const chitIndex = chits.findIndex(
    (chit) => chit.flashcard.note !== previousNote
  );
  const selectedChit = chits[chitIndex];

  const onCorrectGuess = () => {
    setTotalPoints(totalPoints + chits[0].points);
    setStreakPoints(streakPoints + 1);
    setPreviousNote(selectedChit.flashcard.note);
    promote(selectedChit.flashcard);
  };

  const onIncorrectGuess = () => {
    setStreakPoints(0);
    setPreviousNote(selectedChit.flashcard.note);
    reset(selectedChit.flashcard);
  };

  return (
    <>
      <Button
        leftIcon={<FaTrophy />}
        colorScheme="teal"
        left={0}
        top={0}
        position={"absolute"}
        size="lg"
        p={3}
        variant="ghost"
      >
        {totalPoints}
      </Button>

      <Button
        leftIcon={<TbCardsFilled />}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedChit.flashcard.buttonIndex}-${selectedChit.flashcard.action}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "linear",
              duration: 0.1,
            }}
          >
            <Flashcard
              genre={gameOptions.genre}
              flashcard={selectedChit.flashcard}
              onCorrectGuess={onCorrectGuess}
              onIncorrectGuess={onIncorrectGuess}
            />
          </motion.div>
        </AnimatePresence>
      </Center>
    </>
  );
};
