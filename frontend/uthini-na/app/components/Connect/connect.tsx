"use client"

import CreateConnectPostButton from "../Buttons/connect/addConnectPostbutton"

const Connect = () => {
    return(
        <main className="grid place-items-center fixed inset-0">
            <CreateConnectPostButton/>
            <ConnectPosts/>
        </main>
    )
}

export default Connect;