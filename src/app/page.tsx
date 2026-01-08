import { Suspense } from 'react';
import LinkOnSolApp from '@/components/LinkOnSol';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LinkOnSol - Simple Link in Bio for Solana',
  description: 'Create a professional, decentralized Link in Bio page in seconds. Powered by Solana.',
};

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading LinkOnSol...</div>}>
      <LinkOnSolApp />
    </Suspense>
  );
}
