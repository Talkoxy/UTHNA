import ClientSettings from "@/app/components/ClientSettings/clientsettings";
import { getUserId } from "@/app/lib/actions";

const SettingsPage = async () => {
    const userId = await getUserId();

    return (
            <main className="page_bg">
                <ClientSettings user_id={userId}/>
            </main>
    );
};

export default SettingsPage;