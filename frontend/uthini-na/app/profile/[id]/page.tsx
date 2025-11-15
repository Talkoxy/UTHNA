import ClientDetails from "@/app/components/Client/clientdetails";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

// 1. FIX: Wrap 'params' in a Promise in the type definition
type ProfilePageProps = { 
    params: Promise<{ id: string }>; // 👈 This resolves the build error
};

const ProfilePage = async ({ params }: ProfilePageProps) => {
    
    // 2. FIX: Await the params object before accessing 'id'
    const { id } = await params;
    
    // Await the data on the Server
    const user = await apiService.get(`/api/auth/${id}`); // Use the awaited 'id'
    const userId = await getUserId();

    // 3. Pass *only* the data the ClientDetails component expects
    return (
        <main className=" w-full min-h-screen connect_bg">
            <ClientDetails
                user={user} 
                userId={userId}
            />
        </main>
    );
};
export default ProfilePage;