import {create} from "zustand";

interface createAvatarStore{
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useCreateAvatarModal = create<createAvatarStore>((set) => ({



    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export default useCreateAvatarModal;