import { FC, useState, useEffect } from "react";
import { ProfileData, LinkItem, SocialPlatform } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Palette, Link as LinkIcon, Trash2, Settings, Globe, Save, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import clsx from "clsx";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { saveProfileToChain, findProfileOnChain } from "@/lib/solana-storage";
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

interface ToolsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: ProfileData;
    onChange: (data: ProfileData) => void;
}

const platforms: SocialPlatform[] = ['twitter', 'instagram', 'github', 'linkedin', 'youtube', 'twitch', 'discord', 'tiktok', 'website', 'email', 'note'];

export const ToolsDrawer: FC<ToolsDrawerProps> = ({ isOpen, onClose, data, onChange }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'links' | 'design' | 'settings'>('links');
    const { publicKey, signTransaction } = useWallet();
    const { connection } = useConnection();
    const [status, setStatus] = useState<'idle' | 'saving' | 'loading' | 'success' | 'error'>('idle');
    const [statusMsg, setStatusMsg] = useState('');

    // Clear status when tab changes or drawer closes
    useState(() => {
        if (!isOpen) setStatus('idle');
    });

    const handleSaveToChain = async () => {
        if (!publicKey || !signTransaction) return;
        setStatus('saving');
        setStatusMsg(t.saving);
        try {
            await saveProfileToChain(connection, { publicKey, signTransaction } as any, data);
            setStatus('success');
            setStatusMsg(t.saved);
            setTimeout(() => setStatus('idle'), 3000);
        } catch (e: any) {
            console.error(e);
            setStatus('error');
            setStatusMsg(e.message || "Failed to save");
        }
    };

    const handleLoadFromChain = async () => {
        if (!publicKey) return;
        setStatus('loading');
        setStatusMsg(t.loading);
        try {
            const result = await findProfileOnChain(connection, publicKey);
            if (result) {
                onChange(result.profile);
                setStatus('success');
                setStatusMsg(t.loaded);
            } else {
                setStatus('error');
                setStatusMsg(t.noProfileFound);
            }
            setTimeout(() => setStatus('idle'), 3000);
        } catch (e: any) {
            console.error(e);
            setStatus('error');
            setStatusMsg("Failed to load");
        }
    };

    const addLink = () => {
        const newLink: LinkItem = {
            id: crypto.randomUUID(),
            title: '',
            url: '',
            platform: 'website',
            active: true
        };
        onChange({ ...data, links: [...data.links, newLink] });
    };

    const updateLink = (id: string, updates: Partial<LinkItem>) => {
        onChange({
            ...data,
            links: data.links.map(l => l.id === id ? { ...l, ...updates } : l)
        });
    };

    const removeLink = (id: string) => {
        onChange({
            ...data,
            links: data.links.filter(l => l.id !== id)
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 rounded-t-3xl shadow-2xl z-50 h-[85vh] flex flex-col border-t border-gray-200 dark:border-zinc-800"
                    >
                        {/* Handle / Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
                            <h2 className="text-lg font-bold">Tools</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex p-2 gap-2 border-b border-gray-100 dark:border-zinc-800 overflow-x-auto">
                            {[
                                { id: 'links', icon: LinkIcon, label: t.links },
                                { id: 'design', icon: Palette, label: t.design },
                                { id: 'settings', icon: Settings, label: 'Settings' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={clsx(
                                        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                                            : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400"
                                    )}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">

                            {/* LINKS TAB */}
                            {activeTab === 'links' && (
                                <div className="space-y-4">
                                    <button
                                        onClick={addLink}
                                        className="w-full py-4 rounded-2xl bg-purple-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-transform"
                                    >
                                        <Plus size={20} />
                                        {t.addNewLink}
                                    </button>

                                    <div className="space-y-4">
                                        {data.links.map((link) => (
                                            <div key={link.id} className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl border border-gray-100 dark:border-zinc-700 space-y-3">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={link.title}
                                                        onChange={(e) => updateLink(link.id, { title: e.target.value })}
                                                        placeholder={t.linkTitle}
                                                        className="flex-1 bg-transparent font-bold border-b border-gray-200 dark:border-zinc-600 focus:border-purple-500 outline-none pb-1"
                                                    />
                                                    <button onClick={() => removeLink(link.id)} className="text-red-500 p-1">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={link.url}
                                                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                                                    placeholder={t.linkUrlPlaceholder}
                                                    className="w-full bg-transparent text-sm text-gray-500 border-b border-gray-200 dark:border-zinc-600 focus:border-purple-500 outline-none pb-1"
                                                />
                                                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                                    {platforms.map(p => (
                                                        <button
                                                            key={p}
                                                            onClick={() => updateLink(link.id, { platform: p })}
                                                            className={clsx(
                                                                "p-2 rounded-lg border flex-shrink-0 transition-all",
                                                                link.platform === p
                                                                    ? "bg-black text-white border-black dark:bg-white dark:text-black"
                                                                    : "bg-white dark:bg-zinc-700 text-gray-500 border-transparent"
                                                            )}
                                                        >
                                                            <span className="capitalize text-xs font-semibold">{p === 'twitter' ? 'X' : p}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* DESIGN TAB */}
                            {activeTab === 'design' && (
                                <div className="grid grid-cols-2 gap-3">
                                    {['light', 'dark', 'monochrome', 'solana', 'midnight', 'bubblegum', 'synthwave', 'lavender'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => onChange({ ...data, theme: t as any })}
                                            className={clsx(
                                                "p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden h-24 shadow-sm",
                                                data.theme === t ? "border-purple-500 ring-2 ring-purple-500/20" : "border-gray-200 dark:border-zinc-800"
                                            )}
                                        >
                                            <span className="capitalize font-bold z-10 relative drop-shadow-md text-sm">{t}</span>
                                            <div className={clsx(
                                                "absolute inset-0 transition-opacity",
                                                t === 'light' ? "bg-gray-100" :
                                                    t === 'dark' ? "bg-gray-900 text-white" :
                                                        t === 'monochrome' ? "bg-zinc-200" :
                                                            t === 'solana' ? "bg-gradient-to-br from-purple-500 to-indigo-500" :
                                                                t === 'midnight' ? "bg-black text-white" :
                                                                    t === 'bubblegum' ? "bg-gradient-to-br from-pink-300 to-purple-400" :
                                                                        t === 'synthwave' ? "bg-gradient-to-b from-indigo-900 to-pink-800" :
                                                                            "bg-[#E6E6FA]"
                                            )} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* SETTINGS TAB */}
                            {activeTab === 'settings' && (
                                <div className="space-y-6">

                                    <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-2xl space-y-4 border border-gray-100 dark:border-zinc-700">
                                        <label className="text-sm font-bold opacity-70 block mb-2">{t.walletConnection}</label>
                                        <div className="flex justify-center">
                                            <WalletMultiButton style={{ width: '100%', justifyContent: 'center', backgroundColor: '#512da8' }} />
                                        </div>
                                        <p className="text-xs opacity-60 leading-relaxed text-center">{t.connectWalletMsg}</p>
                                    </div>

                                    {publicKey && (
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => onChange({ ...data, walletAddress: publicKey.toBase58() })}
                                                className="w-full py-4 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
                                            >
                                                {t.syncWalletBtn}
                                            </button>

                                            <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 space-y-3">
                                                <h3 className="text-sm font-bold opacity-70 mb-2">Blockchain Storage</h3>
                                                <p className="text-xs opacity-50 mb-3">{t.storageDescription}</p>

                                                <button
                                                    onClick={handleSaveToChain}
                                                    disabled={status === 'saving' || status === 'loading'}
                                                    className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {status === 'saving' ? (
                                                        <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                                                    ) : <Save size={16} />}
                                                    {status === 'saving' ? t.saving : t.saveToChain}
                                                </button>

                                                <button
                                                    onClick={handleLoadFromChain}
                                                    disabled={status === 'saving' || status === 'loading'}
                                                    className="w-full py-4 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {status === 'loading' ? (
                                                        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                                                    ) : <RefreshCw size={16} />}
                                                    {status === 'loading' ? t.loading : t.loadFromChain}
                                                </button>

                                                {status !== 'idle' && statusMsg && (
                                                    <div className={clsx("text-center text-xs font-bold p-2 rounded", status === 'error' ? "text-red-500 bg-red-50 dark:bg-red-900/10" : "text-green-500 bg-green-50 dark:bg-green-900/10")}>
                                                        {statusMsg}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
