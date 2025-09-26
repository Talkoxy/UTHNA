import {create} from "zustand";

interface createSettingsModalStore{
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useCreateSettingsModal = create<createSettingsModalStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export default useCreateSettingsModal;