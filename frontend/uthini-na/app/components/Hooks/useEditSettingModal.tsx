import { create } from "zustand";

interface EditSettingsStore { // Renamed the interface to follow convention
    settingsId: string | null;
    setSettingsId: (id: string | null) => void;

    userPrefferedSourceLanguage : string | null;
    setUserPrefferedSourceLanguage:(userPrefferedSourceLanguge: string | null) => void;

    userPrefferedTargetLanguage : string | null;
    setUserPrefferedTargetLanguage:(userPrefferedTargetLanguage: string | null) => void;

    subscriptionStatus : string | null;
    setSubscriptionStatus : (subscriptionStatus: string | null ) => void;

    profileVisibility : string| null;
    setProfileVisibility : (profileVisibility: string | null) => void; 
    
    // --- NEW REAL-TIME UPDATE FIELDS ---
    // State to hold the function that refreshes the parent settings list
    refreshCallback: (() => void) | null;
    // Setter to store the refresh function passed from the button
    setRefreshCallback: (callback: (() => void) | null) => void;
    // --- END NEW FIELDS ---

    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useEditSettingsModal = create<EditSettingsStore>((set) => ({

    settingsId: null,
    setSettingsId:(id) => set({settingsId:id}),

    userPrefferedSourceLanguage:null,
    setUserPrefferedSourceLanguage:(userPrefferedSourceLanguage) => set({userPrefferedSourceLanguage:userPrefferedSourceLanguage}),

    userPrefferedTargetLanguage:null,
    setUserPrefferedTargetLanguage:(userPrefferedTargetLanguage) => set({userPrefferedTargetLanguage:userPrefferedTargetLanguage}),

    subscriptionStatus:null,
    setSubscriptionStatus:(subscriptionStatus) => set({subscriptionStatus:subscriptionStatus}),

    profileVisibility:null,
    setProfileVisibility:(profileVisibility) => set({profileVisibility:profileVisibility}),
    
    // --- INITIALIZE NEW FIELDS ---
    refreshCallback: null,
    setRefreshCallback: (callback) => set({ refreshCallback: callback }),
    // --- END INITIALIZATION ---

    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),

}));

export default useEditSettingsModal;