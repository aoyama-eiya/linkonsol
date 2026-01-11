# LinkOnSol 🔗

**A privacy-first, serverless Web3 "Link in Bio" portfolio builder on Solana**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://linkonsol.pages.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built on Solana](https://img.shields.io/badge/Built%20on-Solana-9945FF)](https://solana.com/)

<img width="1920" height="1080" alt="LinkOnSol Hero" src="https://github.com/user-attachments/assets/0926f916-07fe-4cd1-baf7-a2bc63589e20" />

---

## 🎯 The Problem

Traditional "link in bio" tools (like Linktree, Beacons, etc.) have critical limitations:

1. **Centralized Control**: Your profile can be deleted, censored, or held hostage at any time
2. **Privacy Concerns**: Your data and visitor analytics are collected and monetized
3. **Subscription Costs**: Premium features require ongoing monthly payments
4. **No True Ownership**: You don't actually own your profile or data
5. **Web2 Lock-in**: Profiles are tied to centralized platforms with no portability

For Web3 creators, artists, developers, and communities, these limitations are unacceptable.

## 💡 The Solution

**LinkOnSol** is a completely decentralized, privacy-first alternative that leverages Solana blockchain technology to give you:

- ✅ **True Ownership**: Your profile is stored on-chain and controlled by your wallet
- ✅ **Zero Censorship**: No one can delete or modify your profile except you
- ✅ **Complete Privacy**: No tracking, no analytics collection, no data mining
- ✅ **Serverless Architecture**: No backend servers means no single point of failure
- ✅ **Free Forever**: No subscriptions, just minimal blockchain transaction fees
- ✅ **Permanent URLs**: Your profile lives on the blockchain permanently
- ✅ **Multi-language Support**: English, Japanese, Korean, and Chinese

## 👥 Who Is This For?

LinkOnSol is designed for:

- **Web3 Creators & Artists**: NFT artists, crypto influencers, and content creators who need a decentralized presence
- **Blockchain Developers**: Showcase your projects, GitHub, and social links with on-chain permanence
- **DAOs & Communities**: Create official link hubs that can't be taken down
- **Privacy Advocates**: Anyone who values data sovereignty and wants to avoid surveillance capitalism
- **Solana Ecosystem Members**: Users who already have Solana wallets and want seamless integration

## ✨ Key Features

### 🔐 Privacy-First Design
- **No Backend Servers**: All data is either stored locally or on-chain
- **No User Tracking**: We don't collect analytics, cookies, or personal information
- **Client-Side Encryption**: Profile data is compressed and encoded before storage

### ⛓️ Blockchain-Powered
- **On-Chain Storage**: Save your profile permanently to Solana using Memo transactions
- **Short URLs**: Each saved profile gets a unique transaction signature URL (`?tx=...`)
- **Wallet Integration**: Connect with Phantom, Solflare, and other Solana wallets
- **Minimal Costs**: Transaction fees are typically less than $0.01

### 🎨 Beautiful & Customizable
- **14 Premium Themes**: Light, Dark, Solana, Midnight, Synthwave, Lavender, and more
- **Custom Backgrounds**: Upload your own images or use solid colors
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion for delightful interactions

### 🌐 Multi-Platform Support
Support for all major social platforms:
- Twitter, Instagram, GitHub, LinkedIn
- YouTube, Twitch, Discord, TikTok
- Custom links for any platform
- Email and personal websites

### 🚀 Two Sharing Modes

1. **Long URL Mode** (`?d=...`): 
   - Profile data encoded directly in URL
   - Works instantly without blockchain transaction
   - Perfect for testing and quick sharing

2. **Short URL Mode** (`?tx=...`):
   - Profile saved permanently on Solana blockchain
   - Clean, short URLs using transaction signatures
   - Immutable and censorship-resistant

## 📸 Screenshots

<details>
<summary>Click to view more screenshots</summary>

<img width="1920" height="1080" alt="Theme Selection" src="https://github.com/user-attachments/assets/d4d8ddd3-16ce-44d9-97db-881b96523614" />
<img width="1920" height="1080" alt="Profile Editing" src="https://github.com/user-attachments/assets/987be19e-1ed2-400c-8999-b6c55885e4ae" />
<img width="1920" height="1080" alt="Dark Theme" src="https://github.com/user-attachments/assets/bc412e97-a9e8-45d2-b4fd-624fbf654801" />
<img width="1920" height="1080" alt="Mobile View" src="https://github.com/user-attachments/assets/704d18fe-8711-43cb-9a2c-bb0a89ac19dc" />

</details>

## 🛠️ How It Works

### Technical Architecture

1. **Client-Side Application**: Built with Next.js and React for a fast, responsive experience
2. **Local Storage**: Draft profiles are saved in browser localStorage for privacy
3. **Data Compression**: Profile data is compressed using LZ-String before encoding
4. **URL Encoding**: Compressed data is base64-encoded for URL sharing
5. **Blockchain Storage**: Profiles are saved to Solana using the Memo program
6. **Decentralized Retrieval**: Profiles can be loaded from transaction signatures

### Why Solana?

- **Fast & Cheap**: Transactions confirm in seconds and cost fractions of a cent
- **Scalable**: Can handle millions of profiles without congestion
- **Proven Infrastructure**: Battle-tested blockchain with strong developer ecosystem
- **Wallet Ecosystem**: Excellent wallet support (Phantom, Solflare, etc.)

## 🚀 Getting Started

### For Users

1. **Visit**: Go to [linkonsol.pages.dev](https://linkonsol.pages.dev/)
2. **Create**: Fill in your name, bio, and add your links
3. **Customize**: Choose a theme and upload an avatar
4. **Share**: 
   - Quick share: Copy the long URL (works immediately)
   - Permanent share: Connect wallet and save to blockchain for a short URL

### For Developers

```bash
# Clone the repository
git clone https://github.com/aoyama-eiya/linkonsol.git
cd linkonsol

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🗺️ Roadmap

### ✅ Completed (v0.1.0)
- [x] Core profile creation and editing
- [x] 14 premium themes
- [x] Multi-language support (EN, JA, KO, ZH)
- [x] Solana blockchain integration
- [x] Wallet adapter integration
- [x] URL encoding/decoding
- [x] Local draft saving
- [x] Responsive mobile design

### 🔄 In Progress (v0.2.0)
- [ ] Profile analytics (privacy-preserving, client-side only)
- [ ] QR code generation for profiles
- [ ] Profile templates and presets
- [ ] Enhanced image optimization
- [ ] Profile verification badges

### 🔮 Future Plans (v0.3.0+)
- [ ] Custom domain support (ENS/SNS integration)
- [ ] Profile NFT minting
- [ ] Collaborative profiles for teams/DAOs
- [ ] Integration with Solana Name Service
- [ ] Mobile app (React Native)
- [ ] Profile discovery and search
- [ ] Monetization features (tips, donations)

## 🏗️ Technical Stack

### Core Technologies
- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS

### Blockchain Integration
- **Blockchain**: [Solana](https://solana.com/) - High-performance blockchain
- **Wallet Adapter**: [@solana/wallet-adapter-react](https://github.com/solana-labs/wallet-adapter) - Wallet connection
- **Web3.js**: [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/) - Solana JavaScript API

### UI/UX Libraries
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready animations
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Utilities**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

### Data Management
- **Compression**: [LZ-String](https://github.com/pieroxy/lz-string) - String compression
- **Encryption**: [crypto-js](https://github.com/brix/crypto-js) - Password hashing for private profiles

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🔧 Code contributions

Please feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [linkonsol.pages.dev](https://linkonsol.pages.dev/)
- **GitHub**: [github.com/aoyama-eiya/linkonsol](https://github.com/aoyama-eiya/linkonsol)
- **Issues**: [GitHub Issues](https://github.com/aoyama-eiya/linkonsol/issues)

## 💬 Contact & Support

- **Creator**: [@aoyama-eiya](https://github.com/aoyama-eiya)
- **Issues**: Please use GitHub Issues for bug reports and feature requests

---

**Built with ❤️ for the Solana community**

*Empowering creators with true ownership and privacy*
