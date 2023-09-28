import { useMicrophoneContext } from "./useMicrophoneContext";
import * as Pitchfinder from "pitchfinder";
import useAnimationFrame from "@phntms/use-animation-frame";
import { Note } from "tonal";
import { useCallback } from "react";

export const useMicrophoneAudioNote = (
  callback: (note: string | null) => void,
  framesPerSecond?: number | undefined
) => {
  const { mic, analyser } = useMicrophoneContext();

  const detectPitch = Pitchfinder.ACF2PLUS({
    sampleRate: mic.context.sampleRate,
    //minFrequency: 73,
    //maxFrequency: 4699,
    //ratio: 5,
    //sensitivity: 0.1,
  });

  const anim = useCallback(() => {
    const pitch = detectPitch(analyser.getValue() as Float32Array);

    const pitchWithinBounds = pitch && pitch < 4699 && pitch > 73;
    if (!pitch || !pitchWithinBounds) return callback(null);

    callback(Note.fromFreq(pitch));
  }, [callback, detectPitch, analyser]);

  useAnimationFrame(anim, framesPerSecond);
};
