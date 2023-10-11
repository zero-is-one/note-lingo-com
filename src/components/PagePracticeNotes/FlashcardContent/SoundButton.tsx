import { useRef, useEffect } from "react";

import { useConcertinaSamplerSynth } from "@/hooks/useConcertinaSamplerSynth";
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

  const { synth } = useConcertinaSamplerSynth();

  useEffect(() => {
    if (!playOnMount) return;
    if (!synth) return;

    console.log("1", synth);
    synth.triggerAttackRelease(note, duration || "4n");

    // setTimeout(() => {
    //   console.log("2", synth);
    //   synth.triggerAttackRelease("G5", duration || "4n");
    // }, 1000);

    return () => {
      console.log("release", synth);
      synth.releaseAll();
    };
  }, []);

  return (
    <Button
      onClick={() => {
        synth?.triggerAttackRelease("C4", duration || "4n");
        setTimeout(() => {
          synth?.releaseAll();
          synth?.triggerAttackRelease("G4", duration || "4n");
        }, 100);
      }}
    >
      Play
    </Button>
  );
};
