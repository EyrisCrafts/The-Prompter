import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStoreProps {
  openaiKey: string;
  groqKey: string;
  setGroqKey: (key: string) => void;
  setOpenaiKey: (key: string) => void;

  isDialogOpen: boolean;
  setDialogOpen: (isOpen: boolean) => void;
}

export const useSettingsStore = create<SettingsStoreProps>()(
  persist(
    (set) => ({
      openaiKey: "",
      groqKey: "",
      isDialogOpen: false,
      setGroqKey: (key: string) => set({ groqKey: key }),
      setOpenaiKey: (key: string) => set({ openaiKey: key }),
      setDialogOpen: (isOpen: boolean) => set({ isDialogOpen: isOpen }),
    }),
    {
        name: 'settings-storage', // name of the item in the storage (must be unique)
      },
  )
);

