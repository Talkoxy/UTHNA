import {create} from "zustand";

interface AddSettingsModalStore{
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddSettingsModal = create<AddSettingsModalStore>((set) => ({

    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export default useAddSettingsModal;