import { angloConcertinaCgWheatstoneInstrument as concertina } from "@/config/instruments/angloConcertinaCgWheatstone";
import { InstrumentButtonLayout } from "@/components/InstrumentButtonLayout/InstrumentButtonLayout";
import { InstrumentBehavior, InstrumentButtonModifer } from "@/types";
import { AbsoluteCenter, Box, Icon } from "@chakra-ui/react";
import { CgArrowAlignH, CgArrowsMergeAltH } from "react-icons/cg";
import { ButtonInput } from "@/types";

export const NoteFingerChart = ({
  buttonIndex,
  action,
  instrument,
}: ButtonInput) => {
  const note = (
    concertina.buttons[buttonIndex].behaviors as InstrumentBehavior[]
  ).find((behavior) => behavior.action === action)?.note;

  const color = action === "pullBellowsButtonPress" ? "#FF6700" : "#6234CB";

  const modifer: InstrumentButtonModifer = {
    id: buttonIndex,
    borderRadius: 0,
    label: note,
    background: color,
  };

  return (
    <Box position={"relative"}>
      <InstrumentButtonLayout
        instrument={instrument}
        buttonModifiers={[modifer]}
      />
      <AbsoluteCenter bottom={0}>
        <Icon
          color={color}
          boxSize={"12cqw"}
          as={
            action === "pushBellowsButtonPress"
              ? CgArrowsMergeAltH
              : CgArrowAlignH
          }
        />
      </AbsoluteCenter>
    </Box>
  );
};
