import { useState, useEffect } from "react";

import { useConcertinaSamplerSynth } from "@/hooks/useConcertinaSamplerSynth";
import { Button } from "@chakra-ui/react";

export const SoundButton = ({
  note,
  durationMs,
  playOnMount,
}: {
  note: string;
  durationMs?: number;
  playOnMount?: boolean;
}) => {
  const [playCount, setPlayCount] = useState(0);

  const { synth } = useConcertinaSamplerSynth();

  useEffect(() => {
    if (!playOnMount && playCount === 0) return;
    if (!synth) {
      setTimeout(() => {
        console.log("waiting for synth");
        setPlayCount((count) => count + 1);
      }, 100);
      return;
    }

    synth.triggerAttack(note);

    const timer = setTimeout(() => {
      synth.releaseAll();
    }, durationMs || 1000);

    return () => {
      clearTimeout(timer);
      synth.releaseAll();
    };
  }, [playCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Button
      onClick={() => {
        setPlayCount(playCount + 1);
      }}
    >
      Play
    </Button>
  );
};
