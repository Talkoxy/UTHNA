import ClientDetails from "@/app/components/Client/clientdetails";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

type ProfilePageProps = { 
    params: { id: string };
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
    // Await the data on the Server
    const user = await apiService.get(`/api/auth/${params.id}`);
    const userId = await getUserId();

    // 3. Pass *only* the data the ClientDetails component expects
    return (
        <main className="page_bg">
            <ClientDetails
                // This 'user' is the fetched data, NOT the 'user' from Next.js props
                user={user} 
                userId={userId}
            />
        </main>
    );
};
export default ProfilePage;