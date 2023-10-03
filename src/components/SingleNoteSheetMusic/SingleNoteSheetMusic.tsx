import { AbcRenderer } from "@/components/AbcRenderer/AbcRenderer";

import { Note, AbcNotation } from "tonal";
type NoteOrNoNote = ReturnType<typeof Note.get>;

export const SingleNoteSheetMusic = ({
  note,
  keySignature,
}: {
  note: NoteOrNoNote;
  keySignature?: string;
}) => {
  if (note.empty) return null;

  const notation = `X: 1
L:1/4
K:${keySignature || "C"}
${AbcNotation.scientificToAbcNotation(note.name)}
`;

  return (
    <AbcRenderer
      abc={notation}
      params={{
        selectTypes: [],
        scale: 1,
        staffwidth: 80,
        responsive: "resize",
        paddingtop: 0,
        paddingbottom: 3,
        paddingright: 3,
        paddingleft: 3,
      }}
    />
  );
};
