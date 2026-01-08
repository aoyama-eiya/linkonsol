"use client";

import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Coins } from "lucide-react";

const SOL_PRICE_API = "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd,jpy";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface SolanaStatsProps {
    showBalance?: boolean;
    walletAddress?: string;
}

export const SolanaStats = ({ showBalance, walletAddress }: SolanaStatsProps) => {
    const { connection } = useConnection();
    const { data: priceData } = useSWR(SOL_PRICE_API, fetcher, { refreshInterval: 60000 });
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        if (showBalance && walletAddress) {
            try {
                const pubKey = new PublicKey(walletAddress);
                connection.getBalance(pubKey).then((bal) => {
                    setBalance(bal / LAMPORTS_PER_SOL);
                }).catch(() => {
                    setBalance(null); // Fail silently
                });
            } catch (e) {
                // Invalid address
            }
        }
    }, [showBalance, walletAddress, connection]);

    if (!priceData || !walletAddress) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 w-full max-w-md"
        >
            <div className="flex gap-2">
                {/* Price Ticker */}
                <div className="flex-1 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md p-3 rounded-xl border border-white/20 dark:border-zinc-700 shadow-sm flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-bold">
                        <TrendingUp size={16} className="text-purple-500" />
                        <span>SOL Price</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-bold text-base">${priceData.solana.usd}</span>
                    </div>
                </div>

                {/* Balance Display */}
                {showBalance && balance !== null && (
                    <div className="flex-1 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md p-3 rounded-xl border border-white/20 dark:border-zinc-700 shadow-sm flex items-center justify-between text-xs font-medium">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-bold">
                            <Coins size={16} className="text-green-500" />
                            <span>Wallet</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="font-bold text-base">{balance.toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
