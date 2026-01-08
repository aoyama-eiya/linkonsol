"use client";

import { ProfileData, LinkItem, SocialPlatform } from "@/lib/types";
import { FC, useState, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import {
    Plus,
    Trash2,
    GripVertical,
    Image as ImageIcon,
    Link as LinkIcon,
    Palette,
    Share,
    Eye,
    Settings
} from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface EditorProps {
    data: ProfileData;
    onChange: (data: ProfileData) => void;
}

const platforms: SocialPlatform[] = ['twitter', 'instagram', 'github', 'linkedin', 'youtube', 'twitch', 'discord', 'tiktok', 'website', 'email'];

export const Editor: FC<EditorProps> = ({ data, onChange }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'appearance' | 'settings'>('profile');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { publicKey } = useWallet();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange({ ...data, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const addLink = () => {
        const newLink: LinkItem = {
            id: Math.random().toString(36).substr(2, 9),
            title: 'New Link',
            url: 'https://',
            platform: 'website',
            active: true,
        };
        onChange({ ...data, links: [...data.links, newLink] });
    };

    const updateLink = (id: string, updates: Partial<LinkItem>) => {
        onChange({
            ...data,
            links: data.links.map(l => l.id === id ? { ...l, ...updates } : l),
        });
    };

    const removeLink = (id: string) => {
        onChange({
            ...data,
            links: data.links.filter(l => l.id !== id),
        });
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden h-full flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 dark:border-zinc-800 p-2">
                {[
                    { id: 'profile', icon: Settings, label: t.profile },
                    { id: 'links', icon: LinkIcon, label: t.links },
                    { id: 'appearance', icon: Palette, label: t.design },
                    { id: 'settings', icon: Share, label: t.share },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={clsx(
                            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all",
                            activeTab === tab.id
                                ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                                : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
                        )}
                    >
                        <tab.icon size={16} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence mode="wait">
                    {activeTab === 'profile' && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.profileImage}</label>
                                <div className="flex items-center gap-4">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-20 h-20 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity border-2 border-dashed border-gray-300 dark:border-zinc-700 overflow-hidden"
                                    >
                                        {data.avatar ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={data.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-gray-400" />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-sm text-blue-600 font-medium hover:underline"
                                    >
                                        {t.uploadImage}
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.displayName}</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => onChange({ ...data, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                                    placeholder={t.yourName}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.bio}</label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => onChange({ ...data, bio: e.target.value })}
                                    rows={4}
                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none"
                                    placeholder={t.bioPlaceholder}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.walletAddress}</label>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={data.walletAddress || ''}
                                            onChange={(e) => onChange({ ...data, walletAddress: e.target.value })}
                                            className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                                            placeholder={t.enterWalletPlaceholder}
                                        />
                                        {publicKey && (
                                            <button
                                                onClick={() => onChange({ ...data, walletAddress: publicKey.toBase58() })}
                                                className="px-4 bg-purple-100 text-purple-700 rounded-xl text-xs font-bold hover:bg-purple-200 transition-colors whitespace-nowrap"
                                            >
                                                {t.useConnected}
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex justify-end">
                                        <WalletMultiButton style={{ height: 36, fontSize: 14, padding: '0 16px', backgroundColor: '#512da8' }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'links' && (
                        <motion.div
                            key="links"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-4"
                        >
                            <button
                                onClick={addLink}
                                className="w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                            >
                                <Plus size={18} />
                                {t.addNewLink}
                            </button>

                            <div className="space-y-3">
                                {data.links.map((link) => (
                                    <div key={link.id} className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-gray-100 dark:border-zinc-700 group">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex-1 space-y-3">
                                                <input
                                                    type="text"
                                                    value={link.title}
                                                    onChange={(e) => updateLink(link.id, { title: e.target.value })}
                                                    className="w-full bg-transparent font-medium focus:outline-none border-b border-transparent focus:border-gray-300"
                                                    placeholder={t.linkTitle}
                                                />
                                                <input
                                                    type="text"
                                                    value={link.url}
                                                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                                                    className="w-full bg-transparent text-sm text-gray-500 focus:outline-none border-b border-transparent focus:border-gray-300"
                                                    placeholder={t.linkUrlPlaceholder}
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeLink(link.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="flex gap-2 flex-wrap">
                                            {platforms.map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => updateLink(link.id, { platform: p })}
                                                    className={clsx(
                                                        "p-2 rounded-lg border transition-all flex items-center justify-center gap-1",
                                                        link.platform === p
                                                            ? "bg-black text-white border-black dark:bg-white dark:text-black"
                                                            : "bg-white text-gray-600 border-gray-200 dark:bg-zinc-900 dark:text-gray-400 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                                    )}
                                                    title={p}
                                                >
                                                    {/* We can show icon here if needed, but text is fine for selection for now, or maybe small icons? */}
                                                    <span className="capitalize text-xs">{p === 'twitter' ? 'X' : p}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'appearance' && (
                        <motion.div
                            key="appearance"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {['light', 'dark', 'monochrome', 'solana', 'midnight', 'bubblegum', 'synthwave', 'lavender'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => onChange({ ...data, theme: t as any })}
                                    className={clsx(
                                        "p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group h-24",
                                        data.theme === t ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-200 dark:border-zinc-800 hover:border-gray-300"
                                    )}
                                >
                                    <span className="capitalize font-medium z-10 relative drop-shadow-md">{t}</span>
                                    {/* Preview swatch */}
                                    <div className={clsx(
                                        "absolute inset-0 transition-opacity",
                                        t === 'light' ? "bg-gray-200" :
                                            t === 'dark' ? "bg-gray-900" :
                                                t === 'monochrome' ? "bg-zinc-500" :
                                                    t === 'solana' ? "bg-gradient-to-br from-purple-500 to-indigo-500" :
                                                        t === 'midnight' ? "bg-black" :
                                                            t === 'bubblegum' ? "bg-gradient-to-br from-pink-300 to-purple-400" :
                                                                t === 'synthwave' ? "bg-gradient-to-b from-indigo-900 to-pink-800" :
                                                                    "bg-[#E6E6FA]"
                                    )} />
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'settings' && (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6 text-center pt-8"
                        >
                            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900">
                                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">{t.readyToLaunch}</h3>
                                <p className="text-sm text-blue-700 dark:text-blue-300 mb-6">
                                    {t.readyMessage}
                                </p>
                                {/* The parent component handles the actual sharing logic, this is just info */}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
