import { Flashcard } from "@/types";
import { concertinaLayout } from "@/config/layouts/concertina";
import { Heading } from "@chakra-ui/react";
export const AlternateClue = ({ flashcard }: { flashcard: Flashcard }) => {
  const isMainRow = flashcard.buttonIndex >= 10 && flashcard.buttonIndex <= 19;
  const isFrontRow = flashcard.buttonIndex <= 9;
  //const isBackRow = flashcard.buttonIndex >= 20;
  const hasConflict = !!concertinaLayout.find(
    (b, index) =>
      (b.pull === flashcard.note || b.push === flashcard.note) &&
      index !== flashcard.buttonIndex
  );

  if (!hasConflict) return <></>;
  if (flashcard.note === "G3")
    return <Heading>{flashcard.bellowState}</Heading>;
  if (isMainRow) return <></>;

  return (
    <>
      <Heading>{`${isFrontRow ? "front" : "back"}`}</Heading>
    </>
  );
};
