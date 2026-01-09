"use client";

import { FC, ReactNode, useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
    WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // Default to a public RPC, but allow user override from localStorage if available (client-side only)
    const [customEndpoint, setCustomEndpoint] = useMemo(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('linkonsol_rpc');
            if (stored) return [stored, () => { }];
        }
        // Check for environment variable
        if (process.env.NEXT_PUBLIC_RPC_URL) {
            return [process.env.NEXT_PUBLIC_RPC_URL, () => { }];
        }
        // Fallback to a generally available public RPC (limitations apply) or the user's custom one
        return ["https://api.mainnet-beta.solana.com", () => { }];
    }, []);

    const endpoint = customEndpoint;

    const wallets = useMemo(
        () => [new PhantomWalletAdapter()],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
