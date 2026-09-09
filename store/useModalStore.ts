import { create } from "zustand";
interface ModalStore {
  Open: boolean;
  setOpen: (Open: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  Open: false,
  setOpen: (Open: boolean) => set({ Open }),
}));
