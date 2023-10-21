import { Button } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link as ReactRouterLink } from "react-router-dom";

export const BackButton = () => {
  return (
    <Button
      as={ReactRouterLink}
      position={"absolute"}
      top={0}
      left={0}
      to="/study"
    >
      <IoMdArrowRoundBack size={20} />
    </Button>
  );
};
