"use client"
import useCreateAvatarModal from "../../Hooks/useCreateAvatarModal"
import { getUserId } from "@/app/lib/actions"


const CreateAvatarButton = () =>{

    const createAvatarModal = useCreateAvatarModal()

    const CreateConnectPost = async () => {
        createAvatarModal.open()
        
        
    }

    return (
        <div onClick={CreateConnectPost} className="cursor-pointer btn place-items-center">
            <div>Add-Avatar</div>
        </div>
    )
}

export default CreateAvatarButton;