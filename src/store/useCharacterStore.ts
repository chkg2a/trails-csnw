import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CharacterStore {
  searchTerm: string;
  attackType: string;
  job: string;
  role: string;
  elementType: string;
  setSearchTerm: (value: string) => void;
  setAttackType: (value: string) => void;
  setJob: (value: string) => void;
  setRole: (value: string) => void;
  setElementType: (value: string) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      searchTerm: "",
      attackType: "",
      job: "",
      role: "",
      elementType: "",
      setSearchTerm: (value) => set({ searchTerm: value }),
      setAttackType: (value) => set({ attackType: value }),
      setJob: (value) => set({ job: value }),
      setRole: (value) => set({ role: value }),
      setElementType: (value) => set({ elementType: value }),
    }),
    { name: "character-store" } // Saves state in localStorage
  )
);
