import { AbcRenderer } from "@/components/AbcRenderer/AbcRenderer";

import { Note, AbcNotation } from "tonal";
type NoteOrNoNote = ReturnType<typeof Note.get>;

export const SingleNote = ({
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
    <div style={{ width: 400 }}>
      <AbcRenderer
        abc={notation}
        params={{ scale: 1, staffwidth: 80, responsive: "resize" }}
      />
    </div>
  );
};
