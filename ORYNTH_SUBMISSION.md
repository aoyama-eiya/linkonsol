# LinkOnSol - Orynth Submission Guide

## Product Submission Details

Use this information when submitting LinkOnSol to Orynth or similar platforms.

---

## Basic Information

**Product Name**: LinkOnSol

**Tagline**: Privacy-first, serverless Web3 "Link in Bio" portfolio builder on Solana

**Category**: Web3 Tools / Social / Creator Tools

**Website**: https://linkonsol.pages.dev/

**GitHub**: https://github.com/aoyama-eiya/linkonsol

**Status**: Live & Active Development (v0.1.0)

---

## What is LinkOnSol?

LinkOnSol is a decentralized alternative to traditional "link in bio" platforms like Linktree. It empowers Web3 creators, artists, and developers to create beautiful portfolio pages that are stored on the Solana blockchain, ensuring true ownership, zero censorship, and complete privacy.

Unlike centralized platforms that can delete your profile, collect your data, or charge subscription fees, LinkOnSol is:
- **Truly yours**: Controlled by your Solana wallet
- **Censorship-resistant**: Stored permanently on-chain
- **Privacy-first**: No tracking, no analytics, no data collection
- **Free forever**: No subscriptions, only minimal blockchain fees (~$0.01)

---

## The Problem We're Solving

Traditional "link in bio" platforms have critical flaws:

1. **Centralized Control**: Platforms can delete or censor your profile at any time
2. **Privacy Invasion**: Your data and visitor analytics are collected and sold
3. **Subscription Costs**: Premium features require $5-15/month ongoing payments
4. **No Ownership**: You don't actually own your profile or data
5. **Platform Lock-in**: Profiles can't be moved or exported

For the Web3 community—NFT artists, crypto influencers, DAO members, and blockchain developers—these limitations are unacceptable. We need tools that align with Web3 values: ownership, privacy, and decentralization.

---

## Our Solution

LinkOnSol leverages Solana blockchain technology to provide:

✅ **True Ownership**: Your profile is controlled by your wallet, not a company
✅ **Zero Censorship**: No one can delete or modify your profile except you
✅ **Complete Privacy**: No backend servers, no tracking, no data mining
✅ **Permanent Storage**: Profiles live on-chain forever
✅ **Beautiful Design**: 14 premium themes with smooth animations
✅ **Multi-language**: English, Japanese, Korean, and Chinese support

---

## Who Is This For?

**Primary Users**:
- Web3 creators and NFT artists who need a decentralized online presence
- Blockchain developers showcasing their projects
- DAOs and communities creating official link hubs
- Privacy advocates who reject surveillance capitalism
- Solana ecosystem members who already use Solana wallets

**Use Cases**:
- NFT artist portfolio pages
- Crypto influencer link hubs
- Developer project showcases
- DAO community resources
- Event organizer landing pages

---

## Key Features

### 🔐 Privacy-First Architecture
- No backend servers—all processing happens client-side
- No user tracking, cookies, or analytics
- Profile data compressed and encoded for privacy

### ⛓️ Blockchain-Powered
- Profiles saved permanently to Solana using Memo transactions
- Short URLs using transaction signatures (`?tx=abc123`)
- Wallet integration with Phantom, Solflare, and more
- Transaction costs under $0.01

### 🎨 Beautiful & Customizable
- 14 professionally designed themes
- Custom avatar and background images
- Responsive design for all devices
- Smooth animations powered by Framer Motion

### 🌐 Platform Support
- Twitter, Instagram, GitHub, LinkedIn
- YouTube, Twitch, Discord, TikTok
- Custom links for any platform
- Email and personal websites

---

## Technical Implementation

**Frontend**: Next.js 16 + TypeScript + Tailwind CSS 4
**Blockchain**: Solana (using @solana/web3.js and wallet-adapter)
**Storage**: 
- Local: Browser localStorage for drafts
- On-chain: Solana Memo program for permanent storage
**Data Handling**: LZ-String compression + base64 encoding
**Hosting**: Cloudflare Pages (serverless)

**Why Solana?**
- Fast transactions (400ms confirmation)
- Low costs ($0.00025 per transaction)
- Excellent wallet ecosystem
- Proven scalability

---

## Current Status

**Version**: 0.1.0 (Live)

**Completed Features**:
- ✅ Core profile creation and editing
- ✅ 14 premium themes
- ✅ Multi-language support (EN, JA, KO, ZH)
- ✅ Solana blockchain integration
- ✅ Wallet adapter integration
- ✅ URL encoding/decoding
- ✅ Local draft saving
- ✅ Responsive mobile design

**Active Development**:
- Profile analytics (privacy-preserving, client-side only)
- QR code generation
- Profile templates and presets
- Enhanced image optimization

**Roadmap** (v0.3.0+):
- Solana Name Service integration
- Profile NFT minting
- Collaborative profiles for DAOs
- Mobile app (React Native)

---

## Traction & Metrics

**Launch Date**: January 2026
**Status**: Live and actively developed
**Open Source**: MIT License
**Repository**: Public on GitHub with full source code
**Community**: Accepting contributions and feedback

---

## Why List on Orynth?

We're listing on Orynth because:

1. **Early-stage Product**: We're in active development and want to engage early adopters
2. **Community Building**: We want to connect with Web3 creators who value privacy and ownership
3. **Feedback Loop**: We're eager to hear from users and iterate quickly
4. **Transparency**: We believe in building in public and sharing our journey

We're not looking for funding—LinkOnSol is free and open-source. We're looking for:
- Early users to test and provide feedback
- Contributors to help build new features
- Community members who share our vision for decentralized creator tools

---

## Links & Resources

- **Live Demo**: https://linkonsol.pages.dev/
- **GitHub Repository**: https://github.com/aoyama-eiya/linkonsol
- **Documentation**: See README.md in repository
- **Contributing Guide**: CONTRIBUTING.md
- **Security Policy**: SECURITY.md

---

## Creator Information

**Developer**: @aoyama-eiya
**Location**: Japan
**Background**: Web3 developer focused on privacy-preserving applications
**Other Projects**: Oonanji (On-premise LLM solutions)

**Contact**:
- GitHub: https://github.com/aoyama-eiya
- Issues: https://github.com/aoyama-eiya/linkonsol/issues

---

## Commitment to Quality

We are committed to:

✅ **Transparency**: Full source code available, clear documentation
✅ **Privacy**: No data collection, no tracking, no surveillance
✅ **Security**: Following best practices, responsible disclosure
✅ **Community**: Open to contributions, responsive to feedback
✅ **Sustainability**: Free and open-source, no VC funding required

---

## Differentiation

**vs. Linktree**:
- ✅ Decentralized (not centralized)
- ✅ No subscriptions (vs. $5-15/month)
- ✅ No data collection (vs. analytics tracking)
- ✅ True ownership (vs. platform control)

**vs. Other Web3 Link Tools**:
- ✅ Solana-based (faster, cheaper than Ethereum)
- ✅ Serverless architecture (no backend to maintain)
- ✅ Beautiful design (not just functional)
- ✅ Multi-language support (global audience)

---

## Final Notes

LinkOnSol is a real, working product that's live and actively used. We're building in public, iterating based on feedback, and committed to creating the best decentralized "link in bio" tool for the Web3 community.

We believe in the values that Orynth represents: transparency, community, and building real products. We're excited to be part of this ecosystem and to connect with other builders and creators.

Thank you for considering LinkOnSol! 🚀
