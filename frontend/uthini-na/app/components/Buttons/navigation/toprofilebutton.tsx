'use client';

import { getUserId } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import ProfileDropdown from '@/app/components/Dropdown/ProfileDropdown';

const ToProfileButton = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId();
    }, []);

    if (!userId) {
        return null;
    };

    return (
        <div className="">
            <ProfileDropdown userId={userId} />
        </div>
    );

  
};

export default ToProfileButton;