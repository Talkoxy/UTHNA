"use client"

import ConnectPosts from "./ConnectPost/connectposts";

const Connect = () => {
    return(
        <main className="grid gap-5 place-items-center fixed inset-0 pt-40">
            <div className="grid place-items-center pb-20">
                <ConnectPosts/>
            </div>
                
           
        </main>
    )
}

export default Connect;