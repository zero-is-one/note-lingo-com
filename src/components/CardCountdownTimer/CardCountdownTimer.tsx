import { useEffect } from "react";
import { Progress } from "@chakra-ui/react";
import { useCountdown } from "usehooks-ts";

export const CardCountdownTimer = ({
  countStartSeconds,
  onCompleteCallback,
}: {
  countStartSeconds: number;
  onCompleteCallback: () => void;
}) => {
  const [count, { startCountdown }] = useCountdown({
    countStart: countStartSeconds,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (count === 0) {
      onCompleteCallback();
    }
  }, [count, onCompleteCallback]);

  return (
    <Progress
      sx={{
        "& > div:first-of-type": {
          transitionProperty: "width",
          transitionDuration: ".2s",
        },
      }}
      value={(100 * count) / countStartSeconds}
      position={"absolute"}
      bottom={0}
      left={0}
      width={"100vw"}
      colorScheme="teal"
    />
  );
};
