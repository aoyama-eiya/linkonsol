# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in LinkOnSol, please report it responsibly:

### How to Report

1. **DO NOT** open a public issue
2. Email the maintainer directly (create an issue with "SECURITY" in the title for private discussion)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Timeline**: Depends on severity
  - Critical: 24-48 hours
  - High: 1 week
  - Medium: 2 weeks
  - Low: 1 month

## Security Considerations

### Privacy & Data Protection

LinkOnSol is designed with privacy as a core principle:

- **No Backend Servers**: All data is stored locally or on-chain
- **No Analytics**: We don't track users or collect personal data
- **No Cookies**: No tracking cookies or third-party scripts
- **Client-Side Only**: All processing happens in your browser

### Blockchain Security

- **Wallet Integration**: We use official Solana wallet adapters
- **No Private Keys**: We never ask for or store private keys
- **Transaction Transparency**: All blockchain transactions are visible on-chain
- **Minimal Permissions**: We only request necessary wallet permissions

### Data Storage

1. **Local Storage**:
   - Draft profiles stored in browser localStorage
   - Cleared when you clear browser data
   - Not accessible to other websites

2. **On-Chain Storage**:
   - Profiles stored using Solana Memo program
   - Publicly readable (by design)
   - Immutable once saved
   - Controlled by your wallet

### Best Practices for Users

1. **Wallet Security**:
   - Use hardware wallets for maximum security
   - Never share your seed phrase
   - Verify transaction details before signing

2. **Profile Privacy**:
   - Don't include sensitive information in your profile
   - Remember: on-chain data is public and permanent
   - Use the private profile feature for sensitive content

3. **URL Sharing**:
   - Long URLs (`?d=...`) contain your full profile data
   - Anyone with the URL can view your profile
   - Short URLs (`?tx=...`) are public on the blockchain

## Known Limitations

- Profile data in URLs can be large (use short URLs for better UX)
- On-chain storage is permanent and cannot be deleted
- Private profiles use client-side password protection (not cryptographically secure against determined attackers)

## Security Updates

We will announce security updates through:

- GitHub Security Advisories
- README updates
- Release notes

## Responsible Disclosure

We appreciate security researchers who:

- Report vulnerabilities privately
- Give us reasonable time to fix issues
- Don't exploit vulnerabilities

Thank you for helping keep LinkOnSol secure! 🔒
