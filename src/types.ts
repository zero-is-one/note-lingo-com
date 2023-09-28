import { Note as NoteImp, NoNote } from "@tonaljs/core";

export type Note = NoteImp;

export type NoteOrNoNote = Note | NoNote;

export type BellowState = "push" | "pull";

export type Flashcard = {
  id: string;
  note: string;
  buttonIndex: number;
  bellowState: BellowState;
};

export type Deck = {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
};
