import { AbsoluteCenter, VStack, Icon, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { concertinaLayout } from "@/config/layouts/concertina";
import { CgArrowAlignH, CgArrowsMergeAltH } from "react-icons/cg";
import { BellowState } from "@/types";
import { PushPullIcon } from "../PushPullIcon/PushPullIcon";

export const ConcertinaFingerChart = ({
  activeButtonIndex,
  bellowState,
}: {
  activeButtonIndex?: number;
  bellowState: BellowState;
}) => {
  const color = bellowState === "push" ? "bellowPush" : "bellowPull";
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
                colorScheme={active ? color : "teal"}
                padding={0}
                margin={0}
                minW={0}
                variant={"solid"}
                opacity={active ? 1 : 0.6}
                borderRadius={active ? "sm" : "full"}
              >
                {active ? button[bellowState] : ""}
              </Button>
            </div>
          );
        })}
      </Layout>
      <AbsoluteCenter pt={10}>
        <PushPullIcon state={bellowState} />
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

    :nth-of-type(n + 11) {
      transform: translate(50%, 0);
    }
    :nth-of-type(n + 16) {
      transform: translate(-50%, 0);
    }
    :nth-of-type(n + 21) {
      transform: translate(100%, 0);
    }
    :nth-of-type(n + 26) {
      transform: translate(-100%, 0);
    }
  }
`;
