import CustomButton from "../Buttons/custombutton";
import ProceedToTranslateButton from "../Buttons/proceedtotranslate";
import Logo from "./logo";
import { TranslateIcon } from "../icons";


const Landing = () => {
    return (
        <div className="grid grid-flow-col col-span-4 justify-items-center items-center">
            <div>
                <Logo />
            </div>
            <div className ="grid grid-flow-row col-span-3 gap-10 justify-items-center items-center">

                <div>
                    <CustomButton label="Login" link="/login"/>
                </div>
                <div>
                     
                    <CustomButton label="Signup" link="/signup"/>
                    
                </div>

                <div className="pt-10">
                    <ProceedToTranslateButton label= "Proceed To Translate" icon={<TranslateIcon/>} link={"/translate"} />
                </div>

            </div>
            
            
        </div>
    );
}
export default Landing;