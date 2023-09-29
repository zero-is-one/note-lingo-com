import { useState, useCallback } from "react";
import { useMicrophonePitchDetector } from "@/hooks/useMicrophonePitchDetector";
import { Box, Button } from "@chakra-ui/react";
import { useMicrophoneContext } from "@/hooks/useMicrophoneContext";
import { useDetectMicrophoneNote } from "@/hooks/useDetectMicrophoneNote";

export const PageMicTest = () => {
  const {
    requestMicrophone,
    analyserNode,
    mediaStream,
    sampleRate,
    hasPermission,
  } = useMicrophoneContext();

  const [note, setNote] = useState<string | null>(null);
  const [pitch, setPitch] = useState<number | null>(null);
  const [clarity, setClarity] = useState<number | null>(null);

  const onNote = useCallback(({ pitch, clarity }) => {
    setClarity(clarity);
    setPitch(pitch);
  }, []);

  useMicrophonePitchDetector(onNote);
  useDetectMicrophoneNote(({ note }) => {
    setNote(note);
  });

  return (
    <Box p={4}>
      {!hasPermission && (
        <Button onClick={requestMicrophone}>enable mic</Button>
      )}
      {hasPermission && (
        <>
          <p>
            deviceId ID:{" "}
            {mediaStream
              ?.getAudioTracks()
              .map((d) => d.getSettings().deviceId)
              .join(", ")}
          </p>
          <p>mediaStream ID: {mediaStream?.id}</p>
          <p>analyser.size:{analyserNode?.fftSize} </p>
          <p>sampleRate:{sampleRate}</p>
          <p>Pitch: {pitch}</p>
          <p>Clarity: {clarity}</p>
          <p>Note: {note}</p>
        </>
      )}
    </Box>
  );
};
