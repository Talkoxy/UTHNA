import {create} from "zustand";

interface createConnectPostModalStore{
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useCreateConnectPostModal = create<createConnectPostModalStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export default useCreateConnectPostModal;