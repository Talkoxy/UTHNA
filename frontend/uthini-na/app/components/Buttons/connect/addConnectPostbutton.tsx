"use client"
import useCreateConnectPostModal from "../../Hooks/useCreateConnectPostModal"
import React from 'react';

// 1. Define the properties this button needs to receive
interface CreateConnectPostButtonProps {
    // Function to trigger the parent post list refresh
    onPostCreated: () => void; 
}


const CreateConnectPostButton: React.FC<CreateConnectPostButtonProps> = ({ onPostCreated }) => {

    const createConnectPostModal = useCreateConnectPostModal()

    const CreateConnectPost = () => {
        
        // 2. Pass the refresh function into the modal hook's state
        // This assumes your useCreateConnectPostModal hook has a setRefreshCallback action.
        createConnectPostModal.setRefreshCallback(onPostCreated);
        
        // 3. Open the modal
        createConnectPostModal.open()
    }

    return (
        <div onClick={CreateConnectPost} className="cursor-pointer btn place-items-center">
            <div>Add-Post</div>
        </div>
    )
}

export default CreateConnectPostButton;