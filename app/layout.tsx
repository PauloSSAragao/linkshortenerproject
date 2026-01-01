import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import "./globals.css";

/**
 * Configure Geist Sans font with CSS variable for global use
 * This font is used as the primary typeface throughout the application
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Configure Geist Mono font with CSS variable for code/monospace text
 * This font is used for code snippets and technical content
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata configuration for SEO and browser display
 * This defines the default title and description for the application
 */
export const metadata: Metadata = {
  title: "Link Shortener - Fast, Simple & Powerful URL Shortening",
  description: "Transform long URLs into short, shareable links. Track performance, analyze traffic, and optimize your online presence with our powerful link management platform.",
};

/**
 * Root layout component that wraps all pages in the application
 * Provides:
 * - Clerk authentication provider for user management
 * - Global font configuration
 * - Dark mode styling
 * - Header with authentication buttons
 * 
 * @param children - The page content to be rendered within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Global header with authentication controls */}
          <header className="p-4 border-b">
            {/* Show sign in/up buttons for unauthenticated users */}
            <SignedOut>
              <div className="flex gap-4">
                <SignInButton mode="modal">
                  <Button variant="outline">Sign in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
            {/* Show user profile button for authenticated users */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {/* Page content rendered here */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
