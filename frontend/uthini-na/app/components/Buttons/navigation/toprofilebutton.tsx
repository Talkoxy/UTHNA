'use client';

import { getUserId } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import ProfileDropdown from '@/app/components/Dropdown/ProfileDropdown';
import { ClientSettingsType } from "../../ClientSettings/clientsettings";
import apiService from "@/app/services/apiService";

const ToProfileButton = () => {
    // 1. All useState and other hooks should be at the top level
    const [userId, setUserId] = useState<string | null>(null);
    const [userSettings, setUserSettings] = useState<ClientSettingsType | null>(null);
    

    // 2. All useEffect hooks should be called unconditionally
    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId();
    }, []);

    // 3. Conditional returns must come after all hook calls
    if (!userId) {
        return null;
    }


    return (
        <div>
            <ProfileDropdown  userId={userId}  />
        </div>
    );
};

export default ToProfileButton;