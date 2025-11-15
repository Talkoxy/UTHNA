import Custombtn from "../Buttons/custombutton";

import Logo from "./logo";

import MMVV from "../mmvv/mmvv";
import KeyFeatures from "../KeyFeatures/KeyFeatures";
import EasyTranslation from "../EasyTranslations/EasyTranslation";
import Team from "../Team/Team";




const Landing = () => {

    return (
        <div className="grid md:grid-col-1 place-items-center grid-flow-row">
            <div>
                <Logo />
            </div>

            <div className="grid place-items-center gap-4 landing-section">
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

            <div>
                <EasyTranslation/>
            </div>

            <div >
                <Team/>
            </div>



        </div>
    );
}
export default Landing;