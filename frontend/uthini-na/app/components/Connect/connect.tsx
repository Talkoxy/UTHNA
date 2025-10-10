"use client"

import CreateConnectPostButton from "../Buttons/connect/addConnectPostbutton"
import ConnectPosts from "./ConnectPost/connectposts";

const Connect = () => {
    return(
        <main className="grid gap-5 place-items-center fixed inset-0 pt-40">
            <div>
                <CreateConnectPostButton/>
            </div>
            
            <div className="grid ">
                <ConnectPosts/>
            </div>
           
        </main>
    )
}

export default Connect;