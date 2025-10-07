import {create} from "zustand";
// import { use } from 'react'; // NOTE: This import is not used and can be removed

interface useEditSettingsModal{
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

    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useEditSettingsModal = create<useEditSettingsModal>((set) => ({

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



    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),

    
}));

export default useEditSettingsModal;