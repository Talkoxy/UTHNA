"use client";
import Translatebtn from "../Buttons/translatebutton";
const Translate = () => {
    return (
        <div className="grid place-items-center fixed inset-0">
            <div className="grid grid-flow-row gap-8">

                <div className="grid grid-flow-row gap-8" >
                    <div className="grid grid-flow-col gap-8">

                            <div>
                                <textarea
                                className="translation-textarea"
                                placeholder="Enter text to translate"
                            />
                            </div>
                            


                            <div>
                                <select
                                    className="dropmenu"
                                >
                                    <option value="">Select language</option>
                                    <option value="zu">Zulu</option>
                                    <option value="xh">Xhosa</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                    </div>

                    <div className=" grid place-items-center">
                        <Translatebtn
                            label="Translate"
                        />
                    </div>


                </div>



                <div className="grid grid-flow-row gap-8">

                    <div className="grid grid-flow-col gap-8">
                        <div>
                            <select className="dropmenu">
                                <option value="">Select language</option>
                                <option value="zu">Zulu</option>
                                <option value="xh">Xhosa</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        <div>
                            <textarea
                                className="translation-textarea"
                                placeholder="Result of translation"
                            />

                        </div>

                    </div>

                        <div className=" grid grid-flow-col place-items-center">
                            

                            <div>like translation</div>

                            <Translatebtn
                                label="Save Translation"
                            />
                        </div>
                       

                </div>


            </div>





        </div>
    )
}
export default Translate;