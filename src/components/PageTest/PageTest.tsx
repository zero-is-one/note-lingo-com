import { CooverFingerChart } from "@/components/CooverFingerChart/CooverFingerChart";
import { CooverTablature } from "../CooverTablature/CooverTablature";
import {
  angloConcertinaCgWheatstoneInstrument as concertina,
  cooverTablatureNumberingSystem,
} from "@/config/instruments/angloConcertinaCgWheatstone";

export const PageTest = () => {
  return (
    <div>
      <div style={{ width: "80vw", padding: 5 }}>
        <CooverTablature
          label="3"
          position="bottom"
          action="pushBellowsButtonPress"
        />
        <CooverFingerChart
          instrument={concertina}
          numberingSystem={cooverTablatureNumberingSystem}
          buttonIndex={5}
          action={"pushBellowsButtonPress"}
        />
      </div>
    </div>
  );
};
