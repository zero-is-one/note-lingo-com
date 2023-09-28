import { Note as NoteImp, NoNote } from "@tonaljs/core";

export type Note = NoteImp;

export type NoteOrNoNote = Note | NoNote;

export type BellowState = "push" | "pull";

export type FlashcardGenre = "sound" | "name" | "notation";

export type Flashcard = {
  id: string;
  note: string;
  buttonIndex: number;
  bellowState: BellowState;
  genre: FlashcardGenre;
};
