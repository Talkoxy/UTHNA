'use server'

import { cookies } from "next/headers";

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 hour (Django setting: 60 minutes)
    
    const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 2; // 2 days (Django setting: 2 days)


    // 1. session_userid: User ID cookie (Should match Refresh Token life)
    (await cookies()).set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: REFRESH_TOKEN_MAX_AGE, // 2 days
        path: '/',
        sameSite: 'lax',
    });

    // 2. session_access_token: Access Token cookie
    (await cookies()).set('session_access_token', accessToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: ACCESS_TOKEN_MAX_AGE, // 1 hour (60 minutes)
        path: '/',
        sameSite: 'lax',
    });

    // 3. session_refresh_token: Refresh Token cookie
    (await cookies()).set('session_refresh_token', refreshToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: REFRESH_TOKEN_MAX_AGE, // 2 days
        path: '/',
        sameSite: 'lax',
    })

}

export async function resetAuthCookies() {
    (await cookies()).set('session_userid', '');
    (await cookies()).set('session_access_token', '');
    (await cookies()).set('session_refresh_token', '')
}

export async function getUserId(){
    const userId = (await cookies()).get('session_userid')?.value
    return userId ? userId : null;
}

export async function getAccessToken(){
    let accessToken = (await cookies()).get('session_access_token')?.value;

    return accessToken;
}