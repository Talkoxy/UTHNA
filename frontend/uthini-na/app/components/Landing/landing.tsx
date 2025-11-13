import Custombtn from "../Buttons/custombutton";
import ProceedToTranslateButton from "../Buttons/proceedtotranslate";
import Logo from "./logo";
import { TranslateIcon } from "../icons";
import MMVV from "../mmvv/mmvv";
import KeyFeatures from "../KeyFeatures/KeyFeatures";



const Landing = () => {

    return (
        <div className="grid place-items-center grid-flow-row scroll-landing ">
            <div>
                <Logo />
            </div>

            <div className="grid place-items-center gap-4 landing-section ">
                <h1 >Breaking Language Barriers Across Africa</h1>
                <p>A digital translation web application for 
                    African languages. Breaking barriers, 
                    preserving culture, and connecting communities.
                </p>

                <div>
                    <Custombtn label='Try Our Beta' link='/translate' className="grdnt-btn"/>
                </div>

            </div>

            <div>
                <MMVV/>
            </div>
            <div >
                <KeyFeatures/>
            </div>


        </div>
    );
}
export default Landing;