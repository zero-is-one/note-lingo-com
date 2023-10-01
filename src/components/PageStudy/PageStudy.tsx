import { useState } from "react";
import {
  Center,
  Card,
  Button,
  Alert,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { TbCardsFilled } from "react-icons/tb";
import { Flashcard } from "../Flashcard/Flashcard";
import { GameContextProvider } from "@/contexts/GameContext";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { useGameContext } from "@/hooks/useGameContext";
import { AnimatePresence, motion } from "framer-motion";
import { deck } from "@/config/decks/concertina";
import { FlashcardGenre } from "@/types";

export const PageStudy = () => {
  const [genres, setGenres] = useState<FlashcardGenre[]>([
    "sound",
    "name",
    "notation",
  ]);
  const { hasPermission } = useMicrophoneContext();

  if (!hasPermission)
    return (
      <RequestMicrophonePermission setGenres={setGenres} genres={genres} />
    );

  const filteredDeck = deck.filter((card) => genres.includes(card.genre));

  return (
    <GameContextProvider deck={filteredDeck}>
      <Content />
    </GameContextProvider>
  );
};

const Content = () => {
  const {
    onIncorrectGuess,
    onCorrectGuess,
    activeCard,
    totalPoints,
    cardPoints,
    streakPoints,
  } = useGameContext();

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
            key={activeCard.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "linear",
              duration: 0.1,
            }}
          >
            <Flashcard
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

const RequestMicrophonePermission = ({
  genres,
  setGenres,
}: {
  genres: FlashcardGenre[];
  setGenres: (flashcardGenre: FlashcardGenre[]) => void;
}) => {
  const { requestMicrophone, isPermissionDenied } = useMicrophoneContext();
  return (
    <Center h="100dvh" w="100dvw" bg="gray.100">
      <Card p={6}>
        {isPermissionDenied && (
          <Alert status="error" mb={4}>
            Permission Denied
          </Alert>
        )}

        <HStack>
          {(["sound", "name", "notation"] as FlashcardGenre[]).map((genre) => (
            <Checkbox
              key={genre}
              size={"lg"}
              mb={5}
              isChecked={genres.includes(genre)}
              onChange={(e) => {
                const g: FlashcardGenre[] = e.target.checked
                  ? [...genres, genre]
                  : genres.filter((g) => g !== genre);

                setGenres(g);
              }}
            >
              {genre}
            </Checkbox>
          ))}
        </HStack>

        <Button size={"lg"} onClick={requestMicrophone}>
          Start
        </Button>
      </Card>
    </Center>
  );
};
