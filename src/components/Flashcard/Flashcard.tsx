import { useEffect, useState, useCallback } from "react";
import { useMicrophoneAudioNote } from "@/hooks/useMicrophoneAudioNote";
import { ConcertinaFingerChart } from "../ConcertinaFingerChart/ConcertinaFingerChart";
import { SingleNote } from "../SingleNote/SingleNote";
import { Note } from "tonal";

import {
  Button,
  Card,
  VStack,
  Text,
  Box,
  Heading,
  Progress,
} from "@chakra-ui/react";
import { Flashcard as FlashcardType } from "@/types";

import { useCountdown } from "usehooks-ts";
import { PushPullIcon } from "../PushPullIcon/PushPullIcon";
import { SoundButton } from "./SoundButton";

type FlashcardProps = {
  flashcard: FlashcardType;
  onSuccess: () => void;
  onFailure: () => void;
};

type FlashcardGenre = "sound" | "name" | "notation";

const coutdownSeconds = 3;

export const Flashcard = ({
  flashcard,
  onSuccess,
  onFailure,
}: FlashcardProps) => {
  const [note, setNote] = useState<string | null>(null);
  //random genre to start
  const [genre] = useState<FlashcardGenre>(
    ["sound", "name", "notation"][
      Math.floor(Math.random() * 3)
    ] as FlashcardGenre
  );

  const [count, { startCountdown }] = useCountdown({
    countStart: coutdownSeconds,
    intervalMs: 1000,
  });

  const onNote = useCallback(
    (n) => {
      if (n === note) return;
      setNote(n);

      if (n !== flashcard.note) return;
      if (count > 0) return onSuccess();

      onFailure();
    },
    [onFailure, onSuccess, count, note, flashcard.note]
  );

  useMicrophoneAudioNote(onNote, 10);

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <>
      {count > 0 && (
        <Card p={6}>
          <VStack>
            {genre === "notation" && (
              <Box width={"50vw"}>
                <SingleNote note={Note.get(flashcard.note)} />
              </Box>
            )}
            {genre === "name" && (
              <Heading fontSize="15cqw" p={3}>
                {flashcard.note}
              </Heading>
            )}
            {genre === "sound" && (
              <SoundButton
                duration="1n"
                playOnMount={true}
                note={flashcard.note}
              />
            )}
            <PushPullIcon state={flashcard.bellowState} />
          </VStack>
        </Card>
      )}

      {count <= 0 && (
        <VStack>
          <Card width={"90vw"} p={5} display={"flex"} alignItems={"center"}>
            <Box width={"40%"}>
              <SingleNote note={Note.get(flashcard.note)} />
            </Box>
            <Box width={"100%"}>
              <ConcertinaFingerChart
                activeButtonIndex={flashcard.buttonIndex}
                bellowState={flashcard.bellowState}
              />
            </Box>
            <SoundButton note={flashcard.note} />
            <Button mt={4} onClick={onFailure}>
              Next
            </Button>
          </Card>

          <Text fontSize="xl">-- {note} --</Text>
        </VStack>
      )}

      <Progress
        value={(100 * count) / coutdownSeconds}
        position={"absolute"}
        bottom={0}
        left={0}
        width={"100vw"}
        colorScheme="teal"
      />
    </>
  );
};
