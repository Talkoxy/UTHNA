"use client"

const Upgrade = () =>{
    return(
        <div className="grid place-items-center fixed inset-0">
            <div className="grid grid-flow-col gap-10">
                <div className="grid gap-2 place-items-center grid-flow-row premium-card">
                    <div>R45/month</div>
                    <div className=" grid gap-3 place-items-center upgrade-text ">  
                        <div>Unlimited text translation</div>
                        <div>Unlimited Speech Translation</div>
                        <div>Connect feature</div>
                    </div>
                </div>

                <div className="grid gap-2 place-items-center grid-flow-row free-card">
                    <div>Free</div>
                    <div className=" grid gap-3 place-items-center upgrade-text  ">  
                        <div>Unlimited text translation</div>
                        <div>Limited Speech Translation</div>
                    </div>
                </div>


            </div>
        </div>
    )

}

export default Upgrade;