import LZString from 'lz-string';
import { ProfileData, initialProfile, SocialPlatform } from './types';

// Minified types for stronger compression
interface MinifiedLink {
    t: string; // title
    u: string; // url
    p: SocialPlatform; // platform
}

interface MinifiedProfile {
    n: string; // name
    b: string; // bio
    a?: string; // avatar
    l: MinifiedLink[]; // links
    t: string; // theme
    bg?: string; // backgroundImage
    w?: string; // walletAddress
}

export const encodeProfile = (data: ProfileData): string => {
    // Transform to minified structure to save bytes
    const minified: MinifiedProfile = {
        n: data.name,
        b: data.bio,
        l: data.links.map(link => ({
            t: link.title,
            u: link.url,
            p: link.platform
        })),
        t: data.theme,
    };

    // Only add optional fields if they exist and are not empty
    if (data.avatar) minified.a = data.avatar;
    if (data.backgroundImage) minified.bg = data.backgroundImage;
    if (data.walletAddress) minified.w = data.walletAddress;

    const json = JSON.stringify(minified);
    return LZString.compressToEncodedURIComponent(json);
};

export const decodeProfile = (encoded: string): ProfileData | null => {
    try {
        const json = LZString.decompressFromEncodedURIComponent(encoded);
        if (!json) return null;

        const parsed = JSON.parse(json);

        // Check if it's the old format (has 'name' property)
        if (parsed.name) {
            return parsed as ProfileData;
        }

        // Map back from minified to full ProfileData
        const minified = parsed as MinifiedProfile;
        return {
            ...initialProfile,
            name: minified.n,
            bio: minified.b,
            avatar: minified.a || '',
            theme: minified.t as any,
            backgroundImage: minified.bg,
            walletAddress: minified.w,
            links: minified.l.map(l => ({
                id: crypto.randomUUID(), // Regenerate IDs as they aren't stored
                title: l.t,
                url: l.u,
                platform: l.p,
                active: true
            }))
        };
    } catch (e) {
        console.error("Failed to decode profile", e);
        return null;
    }
};

// Simple pseudo-encryption for 'private' viewing if needed without backend
// For MVP we just use the encoding. Private profiles could require a password that is salted/hashed with the data,
// but client-side encryption implies the key is in the password.
// We can encrypt the JSON with AES using the password.
// But for now, let's stick to the URL encoding.
