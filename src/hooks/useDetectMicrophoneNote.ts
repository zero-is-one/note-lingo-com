import { useRef } from "react";
import { useMicrophonePitchDetector } from "@/hooks/useMicrophonePitchDetector";
import { Note } from "tonal";
const minClarityPercent = 0.95;
const [minPitch, maxPitch] = [60, 10000];

const countTrigger = 10;

export const useDetectMicrophoneNote = (
  callback: ({ note }: { note: string | null }) => void,
  framesPerSecond?: number | undefined
) => {
  const currentNote = useRef<string | null>();
  const currentCount = useRef<number>(0);
  const hickupCount = useRef<number>(0);

  useMicrophonePitchDetector(({ clarity, pitch }) => {
    const badClarity = clarity < minClarityPercent;
    const badPitch = pitch < minPitch || pitch > maxPitch;

    if (badClarity || badPitch) {
      hickupCount.current++;
      if (hickupCount.current > 2) {
        currentNote.current = null;
        currentCount.current = 0;
        hickupCount.current = 0;
        callback({ note: null });
      }
      return;
    }

    const note = Note.fromFreq(pitch);

    if (note === currentNote.current) {
      currentCount.current++;

      if (currentCount.current === countTrigger) {
        callback({ note });
        currentCount.current = 0;
      }

      return;
    }

    currentNote.current = note;
    currentCount.current = 0;
  }, framesPerSecond);
};
