import { AbsoluteCenter, VStack, Icon, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { concertinaLayout } from "@/config/layouts/concertina";
import { CgArrowAlignH, CgArrowsMergeAltH } from "react-icons/cg";

export const ConcertinaFingerChart = ({
  activeButtonIndex,
  isPushingBellows,
}: {
  activeButtonIndex: number;
  isPushingBellows: boolean;
}) => {
  const color = isPushingBellows ? "purple" : "orange";
  return (
    <VStack style={{ position: "relative" }}>
      <Layout>
        {concertinaLayout.map((button, i) => {
          const active = i === activeButtonIndex;

          return (
            <div key={i} style={{ gridArea: `a${i + 1}` }}>
              <Button
                fontSize={"2.3cqw"}
                height={"100%"}
                width={"100%"}
                colorScheme={color}
                padding={0}
                margin={0}
                minW={0}
                variant={active ? "solid" : "outline"}
                borderWidth={active ? 0 : ".6cqw"}
              >
                <span style={{ opacity: active ? 1 : 0.2 }}>
                  {isPushingBellows ? button.push : button.pull}
                </span>
              </Button>
            </div>
          );
        })}
      </Layout>
      <AbsoluteCenter pt={4}>
        <Icon
          color={`${color}.600`}
          boxSize={"12cqw"}
          as={isPushingBellows ? CgArrowsMergeAltH : CgArrowAlignH}
        />
      </AbsoluteCenter>
    </VStack>
  );
};

const Layout = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  container-type: inline-size;
  padding-top: 5px;
  padding-bottom: 5px;
  min-width: 300px;
  width: 100%;
  overflow: hidden;
  grid-gap: 1cqw;
  grid-template-areas:
    ". . a1 a2 a3 a4 a5  .  a6 a7 a8 a9 a10 . ."
    ". a11 a12 a13 a14 a15 . . .  a16 a17 a18 a19 a20 ."
    "a21 a22 a23 a24 a25  . . . . . a26 a27 a28 a29 a30";

  > * {
    aspect-ratio: 1;
    //box-shadow: inset 0 0 0 1px black;
    width: 100%;
    overflow: hidden;
    min-width: 0;

    :nth-child(n + 11) {
      transform: translate(50%, 0);
    }
    :nth-child(n + 16) {
      transform: translate(-50%, 0);
    }
    :nth-child(n + 21) {
      transform: translate(100%, 0);
    }
    :nth-child(n + 26) {
      transform: translate(-100%, 0);
    }
  }
`;
