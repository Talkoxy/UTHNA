"use client"

import useCreateSettingsModal from "../../Hooks/useCreateSettingsModal";
import CreateSettingModal from '../../Modals/CreateSettingsModal';



const AddSettingsButton = ({}) => {


    const CreateSettingModal = useCreateSettingsModal()

    const CreateSettings = () => {
   
        CreateSettingModal.open()
    }

    return (
        <div onClick={CreateSettings} className="cursor-pointer btn place-items-center">
            <div>Add-Settings</div>
        </div>
    )
}

export default AddSettingsButton;