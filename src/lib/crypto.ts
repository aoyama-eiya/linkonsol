import LZString from 'lz-string';
import { ProfileData, initialProfile } from './types';

export const encodeProfile = (data: ProfileData): string => {
    const json = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(json);
};

export const decodeProfile = (encoded: string): ProfileData | null => {
    try {
        const json = LZString.decompressFromEncodedURIComponent(encoded);
        if (!json) return null;
        return JSON.parse(json);
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
