"use client"
import { AvatarType } from './avatar';
import { useState, useEffect} from 'react';
import { ClientDetailsProps } from '../Client/clientdetails';
import Image from 'next/image';
import EditSettingsButton from '../Buttons/settings/editSettingsbutton';


interface AvatarProps {
    avatar: AvatarType;
}

const AvatarItem: React.FC<AvatarProps> = 
({avatar}) => {

    return (
        <div>
            
                
        </div>
    )
}

export default AvatarItem;