import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | LinkOn Sol',
    description: 'Privacy Policy for LinkOn Sol',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 p-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-4">Privacy Policy</h1>

                <p className="text-sm opacity-60">Last Updated: January 2026</p>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold">1. Introduction</h2>
                    <p>
                        LinkOn Sol ("we", "our", or "us") operates as a decentralized, client-side application living on the Solana blockchain and your browser. We prioritize your privacy by design, minimizing data collection and ensuring you retain full control over your data.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold">2. Data We Collect</h2>
                    <p>
                        <strong>We do not run a centralized database to store your user profile data.</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-2 opacity-80">
                        <li>
                            <strong>Profile Data:</strong> When you create a profile, the data is either encoded into a URL (for sharing) or stored directly on the Solana blockchain (if you choose to "Save to Blockchain"). We do not have access to this data unless you share the link with us.
                        </li>
                        <li>
                            <strong>Local Storage:</strong> We use your browser's Local Storage to save a draft of your profile so you don't lose your work. This data stays on your device.
                        </li>
                        <li>
                            <strong>Wallet Information:</strong> If you connect your Solana wallet, we view your public address to verify ownership for editing purposes. We never have access to your private keys.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold">3. Blockchain Data</h2>
                    <p>
                        Please be aware that any data you choose to "Save to Blockchain" becomes public, immutable record on the Solana network. This is the nature of blockchain technology. Do not save sensitive personal information (like home addresses, phone numbers, or passwords) to the blockchain.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold">4. Third-Party Services</h2>
                    <p>
                        We may use third-party services for hosting (e.g., Netlify, Vercel) which may collect basic access logs (IP address, user agent).
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold">5. Contact</h2>
                    <p>
                        For questions about this policy, please check our GitHub repository.
                    </p>
                </section>

                <div className="pt-8">
                    <a href="/" className="text-blue-500 hover:text-blue-600 font-bold">← Back to Home</a>
                </div>
            </div>
        </div>
    );
}
