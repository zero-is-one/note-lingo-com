import { useState } from "react";
import { useMicrophoneAudioNote } from "@/hooks/useMicrophoneAudioNote";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { ConcertinaFingerChart } from "../ConcertinaFingerChart/ConcertinaFingerChart";
import { SingleNote } from "../SingleNote/SingleNote";
import { Note } from "tonal";
import { useConcertinaSamplerSynthsizer } from "@/hooks/useConcertinaSamplerSynthsizer";
import { Button } from "@chakra-ui/react";

export const Flashcard = () => {
  const synth = useConcertinaSamplerSynthsizer();
  const [note, setNote] = useState<string | null>(null);
  const mic = useMicrophoneContext();
  const t = useMicrophoneAudioNote((n) => {
    setNote(n);
  }, 100);

  return (
    <div onClick={mic.requestMicrophone} style={{ width: "90vw" }}>
      <ConcertinaFingerChart activeButtonIndex={3} isPushingBellows={true} />
      <SingleNote note={Note.get("D#5")} />
      <Button
        onClick={() => {
          synth.triggerAttackRelease("C4", "8n");
        }}
        colorScheme="red"
      >
        play
      </Button>
      <div>note - {note}</div>
    </div>
  );
};
