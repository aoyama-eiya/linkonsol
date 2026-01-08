import { Suspense } from 'react';
import LinkOnSolApp from '@/components/LinkOnSol';

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading LinkOnSol...</div>}>
      <LinkOnSolApp />
    </Suspense>
  );
}
