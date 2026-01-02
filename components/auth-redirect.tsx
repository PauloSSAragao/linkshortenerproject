"use client";

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

/**
 * Client component that handles automatic redirection to dashboard
 * when a user successfully authenticates via Clerk modal
 * 
 * This component listens to Clerk's authentication state changes
 * and performs a client-side redirect when the user becomes authenticated
 */
export function AuthRedirect() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect once Clerk has finished loading and user is signed in
    if (isLoaded && isSignedIn) {
      // Refresh the router cache to update server components
      router.refresh();
      // Navigate to dashboard
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return null;
}
