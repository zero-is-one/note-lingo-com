import { AbcRenderer } from "@/components/AbcRenderer/AbcRenderer";
import { scientificToABCKeySignature } from "@/utils/abc";
import { Note, Key } from "tonal";
type NoteOrNoNote = ReturnType<typeof Note.get>;

export const SingleNoteSheetMusic = ({
  note,
  clef,
  keySignature,
  isMinor,
  isMelodic,
}: {
  note: NoteOrNoNote | string;
  clef?: "treble" | "bass" | "alto" | "tenor";
  keySignature?: string;
  isMinor?: boolean;
  isMelodic?: boolean;
}) => {
  const isNoteaString = typeof note === "string";

  if (!isNoteaString && note?.empty) return null;

  const keyObj = !isMinor
    ? Key.majorKey(keySignature || "C")
    : Key.minorKey(keySignature || "C");

  const alteration = Math.abs(keyObj.alteration);
  const staffwidth = 90 + (alteration - 1) * 10;

  const notation = `X: 1
L:1/4
K:${keySignature || "C"} clef=${clef || "treble"}
${
  isNoteaString
    ? note
    : scientificToABCKeySignature(note.name, keySignature, isMinor, isMelodic)
}
`;

  return (
    <AbcRenderer
      abc={notation}
      params={{
        selectTypes: [],
        scale: 1,
        staffwidth,
        responsive: "resize",
        paddingtop: 0,
        paddingbottom: 3,
        paddingright: 3,
        paddingleft: 3,
      }}
    />
  );
};
