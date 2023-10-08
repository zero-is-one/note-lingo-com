import { Box, Text } from "@chakra-ui/react";
import { SingleNoteSheetMusic } from "../SingleNoteSheetMusic/SingleNoteSheetMusic";
import styled from "@emotion/styled";
import { InstrumentButtonAction } from "@/types";

export const CooverTablature = ({
  label,
  position,
  action,
}: {
  label: string;
  position: "top" | "bottom";
  action: InstrumentButtonAction;
}) => {
  return (
    <Box style={{ containerType: "inline-size" }}>
      <StyledText opacity={action === "pullBellowsButtonPress" ? 1 : 0}>
        —
      </StyledText>
      <StyledText opacity={position === "top" ? 1 : 0} marginTop={"8cqw"}>
        {label}
      </StyledText>
      <SingleNoteSheetMusic note={"z2"} />
      <StyledText opacity={position === "bottom" ? 1 : 0} marginBottom={"5cqw"}>
        {label}
      </StyledText>
    </Box>
  );
};

const StyledText = styled(Text)`
  line-height: 0.7;
  font-size: 20cqw;
  font-weight: bold;
  text-align: center;
`;
