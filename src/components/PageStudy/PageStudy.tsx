import {
  Center,
  Card,
  Button,
  Alert,
  Text,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Flashcard } from "../Flashcard/Flashcard";
import { GameContextProvider } from "@/contexts/GameContext";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { AnimatePresence, motion } from "framer-motion";
import { useGameContext } from "@/hooks/useGameContext";
import { GiRoundStar } from "react-icons/gi";

export const PageStudy = () => {
  const { hasPermission } = useMicrophoneContext();

  if (!hasPermission) return <RequestMicrophonePermission />;

  return (
    <GameContextProvider>
      <Content />
    </GameContextProvider>
  );
};

const Content = () => {
  const { addPoint, subtractPoint, getNewActiveCard, activeCard, points } =
    useGameContext();
  const onSuccess = () => {
    addPoint();
    getNewActiveCard();
  };

  const onFailure = () => {
    subtractPoint();
    getNewActiveCard();
  };

  return (
    <>
      <HStack position={"absolute"} top={0} left={0} p={4}>
        <Icon as={GiRoundStar} />
        <Text fontSize="2xl">{points}</Text>
      </HStack>
      <Center h="100dvh" w="100dvw" bg="gray.100">
        <div key={activeCard.id}>
          <Flashcard
            flashcard={activeCard}
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </div>
      </Center>
    </>
  );
};

const RequestMicrophonePermission = () => {
  const { requestMicrophone, isPermissionDenied } = useMicrophoneContext();
  return (
    <Center h="100dvh" w="100dvw" bg="gray.100">
      <Card p={6}>
        {isPermissionDenied && (
          <Alert status="error" mb={4}>
            Permission Denied
          </Alert>
        )}
        <Button size={"lg"} onClick={requestMicrophone}>
          Start
        </Button>
      </Card>
    </Center>
  );
};
