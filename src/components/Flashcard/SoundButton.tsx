import { useRef, useEffect } from "react";

import { useConcertinaSamplerSynthsizer } from "@/hooks/useConcertinaSamplerSynthsizer";
import { Button } from "@chakra-ui/react";

export const SoundButton = ({
  note,
  duration,
  playOnMount,
}: {
  note: string;
  duration?: string;
  playOnMount?: boolean;
}) => {
  const hasPlayedOnMount = useRef(false);

  const { synth, isReady } = useConcertinaSamplerSynthsizer();

  useEffect(() => {
    if (!playOnMount || hasPlayedOnMount.current) return;
    if (!isReady) return;

    synth.triggerAttackRelease(note, duration || "4n");
  }, [isReady]);

  return (
    <Button
      onClick={() => {
        synth.triggerAttackRelease(note, duration || "4n");
      }}
    >
      Play
    </Button>
  );
};
