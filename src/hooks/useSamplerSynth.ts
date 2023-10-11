import { useContext } from "react";
import { SampleSynthContext, SamplesMap } from "@/contexts/SampleSynthContext";

export const useSamplerSynth = (samples: SamplesMap, baseUrl?: string) => {
  const context = useContext(SampleSynthContext);

  if (!context) {
    throw new Error(
      "useSamplerSynth must be used within a SampleSynth Provider"
    );
  }

  const id = context.createSynth(samples, baseUrl);

  return { synth: context.synths.get(id), id };
};
