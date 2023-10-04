import { angloConcertinaCgWheatstoneInstrument as concertina } from "@/config/instruments/angloConcertinaCgWheatstone";
import { InstrumentButtonLayout } from "@/components/InstrumentButtonLayout/InstrumentButtonLayout";
import { InstrumentButtonAction, InstrumentButtonModifer } from "@/types";
import { AbsoluteCenter, Box, Icon } from "@chakra-ui/react";
import { CgArrowAlignH, CgArrowsMergeAltH } from "react-icons/cg";

export const AngloConcertinaCgWheatstoneFingerChart = ({
  buttonIndex,
  action,
}: {
  buttonIndex: number;
  action: InstrumentButtonAction;
}) => {
  console.log(concertina.buttons[buttonIndex]);
  concertina.buttons[buttonIndex];

  const note = concertina.buttons[buttonIndex].behaviors.find(
    (behavior) => behavior.action === action
  )?.note;

  const base = {
    id: buttonIndex,
    borderRadius: 0,
    label: note,
  };

  const modifierMap: Record<InstrumentButtonAction, InstrumentButtonModifer> = {
    pullBellowsButtonPress: { ...base, background: "#FF6700" },
    pushBellowsButtonPress: { ...base, background: "#6234CB" },
  };

  const modifer = modifierMap[action];

  return (
    <Box position={"relative"}>
      <InstrumentButtonLayout
        instrument={concertina}
        buttonModifiers={[modifer]}
      />
      <AbsoluteCenter>
        <Icon
          color={modifer.background}
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
