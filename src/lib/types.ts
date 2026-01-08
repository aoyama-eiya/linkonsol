export type SocialPlatform = 'twitter' | 'instagram' | 'github' | 'linkedin' | 'youtube' | 'twitch' | 'discord' | 'tiktok' | 'website' | 'email' | 'custom';

export interface LinkItem {
    id: string;
    title: string;
    url: string;
    platform: SocialPlatform;
    active: boolean;
}

export interface ProfileData {
    name: string;
    bio: string;
    avatar: string; // Base64 or URL
    links: LinkItem[];
    theme: 'light' | 'dark' | 'monochrome' | 'solana' | 'midnight' | 'bubblegum' | 'synthwave' | 'lavender';
    walletAddress?: string;
    isPrivate: boolean;
    passwordHash?: string; // SHA256 hash of the password for private profiles
}

export const initialProfile: ProfileData = {
    name: 'Your Name',
    bio: 'Create your LinkOnSol profile.',
    avatar: '',
    links: [],
    theme: 'light',
    isPrivate: false,
};
