import { create } from "zustand";

interface CreateConnectPostModalStore{ // Renamed to follow standard PascalCase
    isOpen: boolean;
    open: () => void;
    close: () => void;
    
    // --- NEW REAL-TIME UPDATE FIELDS ---
    /**
     * Function passed from the parent ConnectPosts component to trigger a list refresh 
     * upon successful post creation.
     */
    refreshCallback: (() => void) | null;
    
    /**
     * Setter for the refresh callback. Called by CreateConnectPostButton.
     */
    setRefreshCallback: (callback: (() => void) | null) => void;
    // --- END NEW FIELDS ---
}

const useCreateConnectPostModal = create<CreateConnectPostModalStore>((set) => ({
    
    // Existing state and actions
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
    
    // --- INITIALIZE NEW FIELDS ---
    refreshCallback: null,
    setRefreshCallback: (callback) => set({ refreshCallback: callback }),
    // --- END INITIALIZATION ---
}));

export default useCreateConnectPostModal;