import { InstrumentButtonLayout } from "@/components/InstrumentButtonLayout/InstrumentButtonLayout";
import { InstrumentButtonModifer } from "@/types";
import { AbsoluteCenter, Box, Icon } from "@chakra-ui/react";
import { CgArrowAlignH, CgArrowsMergeAltH } from "react-icons/cg";
import { ButtonInput, NumberingSystem } from "@/types";

type Props = ButtonInput & {
  numberingSystem: NumberingSystem;
};

export const CooverFingerChart = ({
  buttonIndex,
  action,
  instrument,
  numberingSystem,
}: Props) => {
  const color = action === "pullBellowsButtonPress" ? "#FF6700" : "#6234CB";

  const modifiers: InstrumentButtonModifer[] = instrument.buttons.map(
    (button, index) => ({
      id: index,
      label: numberingSystem[index],
      fontSize: "3cqw",
      background: buttonIndex !== index ? undefined : color,
    })
  );

  return (
    <Box position={"relative"}>
      <InstrumentButtonLayout
        instrument={instrument}
        buttonModifiers={modifiers}
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
