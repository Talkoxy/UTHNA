"use client"
import useCreateConnectPostModal from "../../Hooks/useCreateConnectPostModal"


const CreateConnectPostButton = () =>{

    const createConnectPostModal = useCreateConnectPostModal()

    const CreateConnectPost = () => {
        createConnectPostModal.open()
    }

    return (
        <div onClick={CreateConnectPost} className="cursor-pointer btn place-items-center">
            <div>Add-Post</div>
        </div>
    )
}

export default CreateConnectPostButton;