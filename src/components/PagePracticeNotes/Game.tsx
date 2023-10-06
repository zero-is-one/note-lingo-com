import { Center, Button } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { TbCardsFilled } from "react-icons/tb";
import { Flashcard } from "./Flashcard/Flashcard";

import { AnimatePresence, motion } from "framer-motion";

type GameStateType = ReturnType<typeof useGameState>;
import { useGameState } from "./useGameState";

export const Game = ({ gameState }: { gameState: GameStateType }) => {
  const {
    onIncorrectGuess,
    onCorrectGuess,
    activeCard,
    totalPoints,
    cardPoints,
    streakPoints,
  } = gameState;

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
        {cardPoints}
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
            key={`${activeCard.note}-${activeCard.buttonIndex}-${activeCard.action}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "linear",
              duration: 0.1,
            }}
          >
            <Flashcard
              genre={gameState.genre}
              flashcard={activeCard}
              onCorrectGuess={onCorrectGuess}
              onIncorrectGuess={onIncorrectGuess}
            />
          </motion.div>
        </AnimatePresence>
      </Center>
    </>
  );
};
