"use client";

import { ProfileData, LinkItem } from "@/lib/types";
import { FC, useRef } from "react";
import { motion } from "framer-motion";
import {
    Twitter,
    Instagram,
    Github,
    Linkedin,
    Youtube,
    Twitch,
    Globe,
    Mail,
    Wallet,
    Music // Fallback
} from "lucide-react";
import {
    FaXTwitter,
    FaInstagram,
    FaGithub,
    FaLinkedin,
    FaYoutube,
    FaTwitch,
    FaDiscord,
    FaTiktok,
    FaGlobe,
    FaEnvelope
} from "react-icons/fa6";
import clsx from "clsx";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useLanguage } from "@/lib/i18n";
import { SolanaStats } from "./SolanaStats";
import { PublicKey } from "@solana/web3.js";

const iconMap: Record<string, any> = {
    twitter: FaXTwitter,
    x: FaXTwitter,
    instagram: FaInstagram,
    github: FaGithub,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    twitch: FaTwitch,
    discord: FaDiscord,
    tiktok: FaTiktok,
    website: FaGlobe,
    email: FaEnvelope,
    custom: FaGlobe,
};

interface ProfileViewProps {
    data: ProfileData;
    isPreview?: boolean;
    isEditing?: boolean;
    onChange?: (data: ProfileData) => void;
}

export const ProfileView: FC<ProfileViewProps> = ({ data, isPreview = false, isEditing = false, onChange }) => {
    const { t } = useLanguage();
    const { name, bio, avatar, links, theme, walletAddress } = data;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onChange) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange({ ...data, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    // Theme configurations
    const themeClasses = {
        light: "bg-white text-gray-900",
        dark: "bg-gray-950 text-gray-50",
        monochrome: "bg-zinc-100 text-zinc-900",
        solana: "bg-gradient-to-br from-purple-900 to-indigo-900 text-white",
        midnight: "bg-black text-white",
        bubblegum: "bg-gradient-to-br from-pink-300 to-purple-400 text-white",
        synthwave: "bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-cyan-300",
        lavender: "bg-[#E6E6FA] text-slate-800",
    };

    const buttonClasses = {
        light: "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200",
        dark: "bg-gray-900 hover:bg-gray-800 text-white border border-gray-800",
        monochrome: "bg-white hover:bg-gray-50 text-black border-2 border-black shadow-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
        solana: "bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20",
        midnight: "bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800",
        bubblegum: "bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white border-2 border-white/40 shadow-sm",
        synthwave: "bg-black/40 hover:bg-black/60 backdrop-blur-md text-cyan-400 border border-pink-500 shadow-[0_0_10px_rgba(255,0,228,0.3)] hover:shadow-[0_0_20px_rgba(255,0,228,0.6)]",
        lavender: "bg-white hover:bg-[#F0F0FF] text-slate-700 border border-slate-200 shadow-sm",
    };

    const currentTheme = themeClasses[theme] || themeClasses.light;
    const currentButton = buttonClasses[theme] || buttonClasses.light;

    return (
        <div className={clsx("min-h-screen py-10 px-4 flex flex-col items-center transition-colors duration-500 font-sans", currentTheme, isPreview ? "min-h-[600px] rounded-xl overflow-hidden border shadow-inner" : "")}>

            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center max-w-md w-full text-center space-y-4 mb-8"
            >
                <div
                    className={clsx("relative w-24 h-24 rounded-full overflow-hidden border-4 border-opacity-20 border-current shadow-xl", isEditing && "cursor-pointer hover:opacity-80 transition-opacity")}
                    onClick={() => isEditing && fileInputRef.current?.click()}
                >
                    {avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatar} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl font-bold opacity-50">
                            {name.charAt(0)}
                        </div>
                    )}
                    {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold">Edit</span>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>

                <div className="w-full">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => onChange && onChange({ ...data, name: e.target.value })}
                            className="bg-transparent text-2xl font-bold tracking-tight text-center w-full focus:outline-none focus:border-b border-current/20 pb-1 placeholder-current/50"
                            placeholder={t.yourName}
                        />
                    ) : (
                        <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
                    )}

                    {isEditing ? (
                        <textarea
                            value={bio}
                            onChange={(e) => onChange && onChange({ ...data, bio: e.target.value })}
                            className="bg-transparent opacity-80 mt-2 text-sm leading-relaxed whitespace-pre-wrap text-center w-full focus:outline-none resize-none focus:border-b border-current/20 pb-1 scrollbar-hide placeholder-current/50"
                            placeholder={t.bioPlaceholder}
                            rows={3}
                        />
                    ) : (
                        <p className="opacity-80 mt-2 text-sm leading-relaxed whitespace-pre-wrap">{bio}</p>
                    )}
                </div>

                {/* Solana Badge / Wallet */}
                {walletAddress && (
                    <div className="flex items-center space-x-2 text-xs opacity-70 bg-opacity-10 bg-current px-3 py-1 rounded-full">
                        <Wallet size={12} />
                        <span>{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
                        {isEditing && (
                            <button onClick={() => onChange && onChange({ ...data, walletAddress: '' })} className="ml-2 hover:text-red-500">
                                ×
                            </button>
                        )}
                    </div>
                )}
            </motion.div>

            {/* Solana Stats (New Feature for Investors) */}
            <div className="mb-8 w-full max-w-md flex justify-center">
                <SolanaStats showBalance={!!walletAddress} walletAddress={walletAddress} />
            </div>

            {/* Links */}
            <div className="w-full max-w-md space-y-4">
                {links.filter(l => l.active).map((link, i) => {
                    const Icon = iconMap[link.platform] || Globe;
                    return (
                        <motion.a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={clsx(
                                "flex items-center p-4 rounded-xl w-full group relative overflow-hidden",
                                currentButton
                            )}
                        >
                            <div className="mr-4">
                                <Icon size={24} />
                            </div>
                            <span className="font-semibold flex-grow text-center pr-8">{link.title}</span>
                        </motion.a>
                    );
                })}
            </div>

            {/* Branding */}
            {/* Branding & CTA for Viewers */}
            {!isPreview && (
                <footer className="mt-16 w-full flex flex-col items-center gap-6">
                    <div className="text-center space-y-3">
                        <div className="bg-gradient-to-r from-purple-900/10 to-blue-900/10 dark:from-white/5 dark:to-white/5 p-4 rounded-xl border border-white/20 dark:border-white/10 backdrop-blur-sm">
                            <p className="font-bold text-sm mb-2">{t.ctaTitle}</p>
                            <a
                                href="/"
                                className="inline-block px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold rounded-full hover:opacity-80 transition-opacity"
                            >
                                {t.ctaButton}
                            </a>
                        </div>
                    </div>

                    <div className="opacity-40 text-[10px] flex flex-col items-center gap-1">
                        <div>
                            {t.poweredBy} <span className="font-bold">Link On Sol</span>
                        </div>
                        <div>{t.copyright}</div>
                    </div>
                </footer>
            )}
        </div>
    );
};
