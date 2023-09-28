import { useMemo, useEffect, useState } from "react";
import { Sampler, SamplerOptions } from "tone";
type SamplesMap = SamplerOptions["urls"];

export const useSamplerSynthsizer = (
  samples?: SamplesMap,
  baseUrl?: string
) => {
  const [isReady, setIsReady] = useState(false);

  const synth = useMemo(() => {
    setIsReady(false);
    const sampler = new Sampler(
      samples,
      () => {
        console.log("sampler loaded");
        setIsReady(true);
      },
      baseUrl
    ).toDestination();
    return sampler;
  }, [samples, baseUrl]);

  // useEffect(() => {
  //   return () => {
  //     synth.disconnect();
  //     synth.dispose();
  //   };
  // }, [synth]);

  return { synth, isReady };
};
