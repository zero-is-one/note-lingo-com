import { InstrumentButton } from "@/types";
import { Box } from "@chakra-ui/react";

import { InstrumentButtonModifer, Instrument } from "@/types";

export const InstrumentButtonLayout = ({
  instrument,
  buttonModifiers,
}: {
  instrument: Instrument;
  buttonModifiers?: InstrumentButtonModifer[];
}) => {
  const bounds = getButtonBounds(instrument.buttons);
  const unitWidth = bounds.maxX - bounds.minX;
  const unitHeight = bounds.maxY - bounds.minY;

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        containerType: "inline-size",
        aspectRatio: unitWidth / unitHeight,
      }}
    >
      {instrument.buttons.map((button, index) => {
        const modifer = buttonModifiers?.find(
          (modifer) => modifer.id === index
        );

        return (
          <Box
            key={index}
            width={(button.size.width / unitWidth) * 100 + "%"}
            height={(button.size.height / unitHeight) * 100 + "%"}
            position="absolute"
            left={(button.position.x / unitWidth) * 100 + "%"}
            top={(button.position.y / unitHeight) * 100 + "%"}
            padding={".5%"}
            overflow={"hidden"}
          >
            <Box
              color={modifer?.color || "white"}
              background={modifer?.background || "teal"}
              // boxShadow={"0 0 0 1px #00000025 inset"}
              height={"100%"}
              width={"100%"}
              borderRadius={
                modifer?.borderRadius !== undefined
                  ? modifer?.borderRadius
                  : 10000
              }
              overflow={"hidden"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              userSelect={"none"}
              fontSize={modifer?.fontSize || "2.2cqw"}
              fontWeight={"semibold"}
              textShadow={"0 0 2.2cqw #00000068"}
            >
              {modifer?.label}
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

const getButtonBounds = (buttons: InstrumentButton[]) => {
  return buttons.reduce(
    (acc, button) => {
      const { width, height } = button.size;
      const { x, y } = button.position;

      if (x < acc.minX) {
        acc.minX = x;
      }
      if (x + width > acc.maxX) {
        acc.maxX = x + width;
      }
      if (y < acc.minY) {
        acc.minY = y;
      }
      if (y + height > acc.maxY) {
        acc.maxY = y + height;
      }
      return acc;
    },
    { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  );
};
