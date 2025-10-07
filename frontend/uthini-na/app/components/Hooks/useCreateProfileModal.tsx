import {create} from "zustand";

interface createProfileModalStore{
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useCreateProfileModal = create<createProfileModalStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export default useCreateProfileModal;