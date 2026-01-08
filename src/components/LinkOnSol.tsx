"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProfileData, initialProfile } from '@/lib/types';
import { encodeProfile, decodeProfile } from '@/lib/crypto';
import { ProfileView } from './ProfileView';
import { Editor } from './Editor';
import { Copy, ExternalLink, Check, Smartphone, Monitor, Globe, Edit2, Eye, Save, Settings2, Hammer } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language } from '@/lib/i18n';
import { ToolsDrawer } from './ToolsDrawer';


import { useWallet } from '@solana/wallet-adapter-react';

export default function LinkOnSolApp() {
    const { publicKey } = useWallet();
    const searchParams = useSearchParams();
    const d = searchParams.get('d');

    const [profile, setProfile] = useState<ProfileData>(initialProfile);
    const [mode, setMode] = useState<'edit' | 'view'>('edit');
    const [copied, setCopied] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    useEffect(() => {
        if (d) {
            const decoded = decodeProfile(d);
            if (decoded) {
                setProfile(decoded);
                setMode('view');
            }
        } else {
            const saved = localStorage.getItem('linkonsol_draft');
            if (saved) {
                try {
                    setProfile(JSON.parse(saved));
                } catch { }
            }
        }
    }, [d]);

    useEffect(() => {
        if (mode === 'edit') {
            localStorage.setItem('linkonsol_draft', JSON.stringify(profile));
        }
    }, [profile, mode]);

    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        // Hydration fix: only run on client
        if (typeof window !== 'undefined') {
            const encoded = encodeProfile(profile);
            setShareUrl(`${window.location.origin}?d=${encoded}`);
        }
    }, [profile]);

    const copyLink = () => {
        if (!shareUrl) return;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleMode = () => {
        setMode(mode === 'edit' ? 'view' : 'edit');
    };

    if (mode === 'view' && !d) {
        // If viewing local draft in view mode, still show toolbar to go back to edit
        // logic handled below
    }

    // if (mode === 'view' && d) ... Logic for public view is handled by early return if wanted, but let's wrap it all

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans flex flex-col items-center">

            {/* Top Toolbar */}
            <div className="w-full max-w-md p-4 flex items-center justify-between z-30 sticky top-0 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-zinc-800">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 whitespace-nowrap">LinkOn Sol</h1>
                    <div className="relative mt-1">
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-black dark:hover:text-white"
                        >
                            <Globe size={12} />
                            <span className="uppercase">{language}</span>
                        </button>
                        <AnimatePresence>
                            {isLangMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 mt-2 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-gray-100 dark:border-zinc-700 p-1 flex flex-col min-w-[80px]"
                                >
                                    {(['en', 'ja', 'ko', 'zh'] as const).map(lang => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                setLanguage(lang);
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={clsx(
                                                "text-left px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase",
                                                language === lang ? "bg-black text-white dark:bg-white dark:text-black" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700"
                                            )}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Show Edit button ONLY if it's a local draft OR if wallet matches profile address */}
                    {(!d || (d && publicKey && profile.walletAddress === publicKey.toBase58())) && (
                        <button
                            onClick={toggleMode}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-transform active:scale-95",
                                mode === 'edit' ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-200 text-gray-900 dark:bg-zinc-800 dark:text-gray-100"
                            )}
                        >
                            {mode === 'edit' ? (
                                <>
                                    <Eye size={16} />
                                    <span>{t.preview}</span>
                                </>
                            ) : (
                                <>
                                    <Edit2 size={16} />
                                    <span>{t.edit}</span>
                                </>
                            )}
                        </button>
                    )}

                    {!d && (
                        <button
                            onClick={copyLink}
                            className={clsx(
                                "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold transition-all border",
                                copied ? "bg-green-500 border-green-500 text-white" : "border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800"
                            )}
                            title={t.shareProfile}
                        >
                            {copied ? <Check size={16} /> : <ExternalLink size={16} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-md flex-1 relative pb-24">
                <ProfileView
                    data={profile}
                    isEditing={mode === 'edit'}
                    onChange={setProfile}
                    isPreview={false}
                />
            </div>

            {/* Tools Button (FAB) */}
            <AnimatePresence>
                {mode === 'edit' && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 z-30"
                    >
                        <button
                            onClick={() => setIsToolsOpen(true)}
                            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                        >
                            <Settings2 size={18} />
                            {t.tools}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ToolsDrawer
                isOpen={isToolsOpen}
                onClose={() => setIsToolsOpen(false)}
                data={profile}
                onChange={setProfile}
            />

        </div>
    );
}
