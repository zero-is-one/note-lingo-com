import { useMemo } from "react";
import { Sampler, SamplerOptions } from "tone";
type SamplesMap = SamplerOptions["urls"];

export const useSamplerSynthsizer = (
  samples?: SamplesMap,
  onload?: () => void,
  baseUrl?: string
) => {
  const sampler = useMemo(() => {
    const sampler = new Sampler(samples, onload, baseUrl).toDestination();
    return sampler;
  }, [samples, onload]);

  return sampler;
};
