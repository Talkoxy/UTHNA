'use client'


const KeyFeatures = () =>{
    return(

        <main className="grid grid-flow-row place-items-center features gap-5 ">

            <div className="grid place-items-center features-heading p-10">
                <h1>Key Features</h1>
                 <p>Why Uthini Na Stands out</p>
            </div>

            <div className="grid gap-5 grid-flow-col place-items-center p-2">
                <div className="feature ">
                    <h1>Lightning-fast & precise translations</h1>
                    <p>Experience high-speed and accurate 
                        translations for text, spoken words
                        and documents are intended for 
                        Uthini Na as it grows.</p>
                    
                </div>

                <div className="feature">
                    <h1>Personalised for you</h1>
                    <p>Set your preferences, 
                        save your favourite languages, 
                        and get suggestions that match 
                        your context.
                    </p>
                    
                </div>

                <div className="feature">
                    <h1>Community and Expert Collaboration</h1>
                    <p>Get deeper cultural meaning 
                    from real people who understand 
                    the nuances.</p>
                </div>

            </div>
                

            <div className="grid gap-5 grid-flow-col place-items-center">
                <div className="feature">
                    <h1>Use it anywhere, on any device</h1>
                    <p>Seamless experience across all your devices, 
                        wherever you are.</p>

                </div>

                <div className="feature">
                    <h1>Secure and Reliable</h1>
                    <p>Your data is safe with us. 
                        Privacy and security are 
                        our top priorities.</p>

                </div>

                    
                <div className="feature">
                    <h1>Cloud powered</h1>
                    <p>Access your translations 
                        from anywhere with cloud-based technology.
                        </p>

                </div>
            </div>        
                                                                 
                

        </main>
    )
}

export default KeyFeatures;