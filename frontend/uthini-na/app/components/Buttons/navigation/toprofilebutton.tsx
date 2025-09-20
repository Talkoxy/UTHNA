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

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await apiService.get('/api/settings/list');
                if (response.data && response.data.length > 0) {
                    setUserSettings(response.data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch user settings:", error);
            }
        };
        fetchSettings();
    }, []);

    // 3. Conditional returns must come after all hook calls
    if (!userId) {
        return null;
    }

    if (!userSettings) {
        return null;
    }

    return (
        <div>
            <ProfileDropdown userSettings={userSettings} userId={userId} />
        </div>
    );
};

export default ToProfileButton;