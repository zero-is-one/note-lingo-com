import { Icon } from "@chakra-ui/react";
import { BellowState } from "@/types";
import { CgArrowAlignH, CgArrowsMergeAltH } from "react-icons/cg";

export const PushPullIcon = ({ state }: { state: BellowState }) => {
  const color = state === "push" ? "bellowPush" : "bellowPull";
  return (
    <Icon
      color={`${color}.500`}
      boxSize={"12cqw"}
      as={state === "push" ? CgArrowsMergeAltH : CgArrowAlignH}
    />
  );
};
