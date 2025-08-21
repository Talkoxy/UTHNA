import ClientDetails from "@/app/components/Client/clientdetails";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";


const ProfilePage = async ({ params }: { params: { id: string } }) => {
    const user = await apiService.get(`/api/auth/${params.id}`);
    const userId = await getUserId();

    return (
            <main className="page_bg">
                <ClientDetails
                    user={user}
                    userId={userId}
                />
            </main>
    );
};

export default ProfilePage;