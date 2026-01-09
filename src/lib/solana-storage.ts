import { Connection, PublicKey, Transaction, TransactionInstruction, SystemProgram } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { ProfileData } from "./types";
import { encodeProfile, decodeProfile } from "./crypto";

const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcQb");
const PREFIX = "LINKONSOL::";

export const saveProfileToChain = async (
    connection: Connection,
    wallet: WalletContextState,
    profile: ProfileData
): Promise<string> => {
    if (!wallet.publicKey || !wallet.sendTransaction) throw new Error("Wallet not connected");

    const encoded = encodeProfile(profile);
    const memoContent = `${PREFIX}${encoded}`;

    // Check size limit (approx 1KB safe limit for memo)
    if (new TextEncoder().encode(memoContent).length > 1000) {
        throw new Error("Profile data is too large to save on-chain. Try reducing bio length or number of links.");
    }

    const transaction = new Transaction();

    // 1. Memo Instruction
    transaction.add(
        new TransactionInstruction({
            keys: [{ pubkey: wallet.publicKey, isSigner: true, isWritable: true }],
            programId: MEMO_PROGRAM_ID,
            data: Buffer.from(memoContent, "utf-8"),
        })
    );

    // 2. Self-transfer (0 SOL) just to ensure it's processed as a valid transfer-like tx if needed, 
    // but Memo-only txs are valid. However, some RPCs might drop them if no fee is paid? 
    // No, fee is paid by the payer. Pure memo tx is fine.

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    const signature = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');

    return signature;
};

export const findProfileOnChain = async (
    connection: Connection,
    publicKey: PublicKey
): Promise<{ profile: ProfileData, signature: string } | null> => {
    // Fetch last 20 transactions. If user trades A LOT, this might miss it, 
    // but increasing limit slows it down. 20 is a good start for MVP.
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 20 });

    for (const sigInfo of signatures) {
        if (sigInfo.err) continue;

        const tx = await connection.getParsedTransaction(sigInfo.signature, {
            maxSupportedTransactionVersion: 0
        });

        if (!tx || !tx.meta || !tx.transaction) continue;

        // Inspect log messages or memo instruction
        // Memo usually appears in logMessages like "Program Memo... invoke" 
        // But better to check instruction data if parsed.

        // Check inner instructions or top level instructions
        const instructions = tx.transaction.message.instructions;

        for (const ix of instructions) {
            // @ts-ignore
            if (ix.program === 'spl-memo' || ix.programId.toString() === MEMO_PROGRAM_ID.toString()) {
                // @ts-ignore
                const parsed = ix.parsed;
                // Memo instruction parsed data is just the string usually if standard spl-memo
                // However, often raw data is simpler to read if not parsed correctly.
                // Let's rely on checking logs if parsing fails, or decoded data.

                let memoText = "";

                // If standard parsed
                if (typeof parsed === 'string') {
                    memoText = parsed;
                } else if (parsed && typeof parsed === 'object') {
                    // sometimes it's object?
                    memoText = JSON.stringify(parsed);
                }
                // If not parsed, we might need to look at raw data, but getParsedTransaction attempts it.
            }
        }

        // Alternative: Use Log Messages (Simpler and often more robust for Memo)
        const logs = tx.meta.logMessages || [];
        for (const log of logs) {
            // Logs look like: "Program Memo... consume ... data: <base64> or string?"
            // Actually Memo logs are just "Program MemoSq... invoke [1]" etc. 
            // The DATA is in the instruction. 
        }

        // Let's try to extract from instruction manually if parsed fails
        // We iterate instructions again
        for (const ix of instructions) {
            if (ix.programId.toString() === MEMO_PROGRAM_ID.toString()) {
                // @ts-ignore - 'data' exists on PartedInstruction if not fully parsed, but we asked for parsed
                // If it is parsed, it might be in 'parsed'.
                // Let's assume standard behavior:
                // We can also blindly look at parsing.

                // However, the easiest way with 'getParsedTransaction' is that Memo content shows up in `parsed` field of the instruction.
                // @ts-ignore
                if (ix.parsed && typeof ix.parsed === 'string') {
                    // @ts-ignore
                    const content = ix.parsed as string;
                    if (content.startsWith(PREFIX)) {
                        const encoded = content.substring(PREFIX.length);
                        const decoded = decodeProfile(encoded);
                        if (decoded) {
                            return { profile: decoded, signature: sigInfo.signature };
                        }
                    }
                }
            }
        }
    }

    return null;
};
