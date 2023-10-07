import { useState, useCallback, useEffect } from "react";
import {
  Card,
  Center,
  CardBody,
  Box,
  HStack,
  Heading,
  Button,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { Start } from "./Start";
import {
  angloConcertinaCgWheatstoneInstrument as concertina,
  cooverTablatureNumberingSystem,
} from "@/config/instruments/angloConcertinaCgWheatstone";
import { CooverFingerChart } from "@/components/CooverFingerChart/CooverFingerChart";
import { CooverTablature } from "../CooverTablature/CooverTablature";
import { useDetectMicrophoneNote } from "@/hooks/useDetectMicrophoneNote";
import { Note } from "tonal";
import { InstrumentButtonAction } from "@/types";
import { CardCountdownTimer } from "@/components/CardCountdownTimer/CardCountdownTimer";
import { TbCardsFilled } from "react-icons/tb";
import { BsMusicNote } from "react-icons/bs";

export const PagePracticeCooverNotation = () => {
  const { hasPermission } = useMicrophoneContext();
  const [detectedNote, setDetectedNote] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [buttonIndex, setButtonIndex] = useState<number | null>(null);
  const [action, setAction] = useState<InstrumentButtonAction | null>(null);
  const [count, setCount] = useState<number>(0);
  const isLeftHandButton: boolean = buttonIndex
    ? concertina.buttons[buttonIndex].position.x <= 5
    : false;

  const desiredNote = concertina.buttons[buttonIndex || 0].behaviors.find(
    (b) => b.action === action
  )?.note;

  const getCard = useCallback(() => {
    console.log("getCard");
    setShowAnswer(false);
    setCount(count + 1);
    setAction(
      (
        [
          "pullBellowsButtonPress",
          "pushBellowsButtonPress",
        ] as InstrumentButtonAction[]
      )[Math.floor(Math.random() * 2)]
    );

    setButtonIndex(Math.floor(Math.random() * concertina.buttons.length));
  }, [setShowAnswer, setCount, setAction, setButtonIndex, count]);

  useDetectMicrophoneNote(
    useCallback(
      ({ note: newDetectedNote }: { note: null | string }) => {
        if (newDetectedNote === detectedNote) return;
        setDetectedNote(newDetectedNote);

        if (newDetectedNote === null || desiredNote === undefined) return;
        if (Note.midi(newDetectedNote) !== Note.midi(desiredNote)) return;

        getCard();
      },
      [detectedNote, desiredNote, setDetectedNote, getCard]
    )
  );

  useEffect(() => {
    getCard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(buttonIndex, action);

  if (!hasPermission) return <Start />;
  if (!action || buttonIndex === null) return;

  return (
    <>
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
        {count}
      </Button>
      <Center h="100dvh" w="100dvw" bg="gray.100" overflow={"hidden"}>
        <AnimatePresence mode="wait">
          <motion.div
            key={buttonIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: "linear",
              duration: 0.1,
            }}
          >
            <Card w="90vw">
              <CardBody>
                {!showAnswer && (
                  <CooverTablature
                    label={cooverTablatureNumberingSystem[buttonIndex]}
                    position={isLeftHandButton ? "bottom" : "top"}
                    action={action}
                  />
                )}

                {showAnswer && (
                  <>
                    <HStack
                      mb={3}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Box w="40vw">
                        <CooverTablature
                          label={cooverTablatureNumberingSystem[buttonIndex]}
                          position={isLeftHandButton ? "bottom" : "top"}
                          action={action}
                        />
                      </Box>
                      <Heading
                        fontSize="15cqw"
                        p={3}
                        onDoubleClick={getCard}
                        userSelect={"none"}
                      >
                        {desiredNote}
                      </Heading>
                    </HStack>
                    <CooverFingerChart
                      instrument={concertina}
                      numberingSystem={cooverTablatureNumberingSystem}
                      buttonIndex={buttonIndex}
                      action={action}
                    />
                  </>
                )}
              </CardBody>
            </Card>
            <Center>
              <Button
                leftIcon={!detectedNote ? <BsMusicNote /> : undefined}
                colorScheme="teal"
                variant="ghost"
                size="lg"
                fontSize={"4cqw"}
              >
                {detectedNote}
              </Button>
            </Center>
            <CardCountdownTimer
              countStartSeconds={3}
              onCompleteCallback={() => {
                setShowAnswer(true);
              }}
            />
          </motion.div>
        </AnimatePresence>
      </Center>
    </>
  );
};
