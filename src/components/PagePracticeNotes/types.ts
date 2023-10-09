import { Deck } from "@/types";

export type Genre = "sound" | "name" | "notation";

export type GameOptions = {
  genre: Genre;
  deck: Deck;
  startTime: number | null;
  keySignature?: string | undefined;
};
