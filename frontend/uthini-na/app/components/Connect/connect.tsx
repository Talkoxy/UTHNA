"use client"

import CreateConnectPostButton from "../Buttons/connect/addConnectPostbutton"
import ConnectPosts from "./ConnectPost/connectposts";

const Connect = () => {
    return(
        <main className="grid place-items-center fixed inset-0 pt-35">
            <div className="grid place-items-center gap-5">
                <div> 
                    <CreateConnectPostButton/>
                </div>

                <div> 
                    <ConnectPosts/>
                </div>
            </div>
                
            
           
        </main>
    )
}

export default Connect;