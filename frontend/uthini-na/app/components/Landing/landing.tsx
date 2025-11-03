import Custombtn from "../Buttons/custombutton";
import ProceedToTranslateButton from "../Buttons/proceedtotranslate";
import Logo from "./logo";
import { TranslateIcon } from "../icons";
import MMVV from "../mmvv/mmvv";



const Landing = () => {

    return (
        <div className="grid place-items-center scroll-landing">
            <div>
                <Logo />
            </div>

            <div>
                <MMVV/>
            </div>
        </div>
    );
}
export default Landing;