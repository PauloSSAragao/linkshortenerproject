# Authentication Guidelines

This document outlines authentication standards and patterns for the Link Shortener project using Clerk.

## Core Principles

- **Clerk is the ONLY authentication method** - Do not implement custom auth or use other providers
- **Modal-based authentication** - Sign In and Sign Up must always launch as modals
- **Protected routes** - Use appropriate Clerk utilities to protect routes
- **Smart redirects** - Authenticated users accessing homepage should redirect to dashboard

## Protected Routes

### Dashboard Route Protection

The `/dashboard` route is protected and requires authentication. Implement using Clerk's `auth()`:

```typescript
// app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  // Dashboard content...
}
```

### Homepage Smart Redirect

If an authenticated user tries to access the homepage, redirect them to the dashboard:

```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Homepage content for unauthenticated users...
}
```

## Authentication Checks

### Server Components

Use `auth()` from `@clerk/nextjs/server` for authentication checks:

```typescript
import { auth } from '@clerk/nextjs/server';

export default async function ServerComponent() {
  const { userId } = await auth();
  
  if (!userId) {
    // Handle unauthenticated state
  }
  
  // Component logic...
}
```

### Server Actions

Always check authentication in Server Actions:

```typescript
'use server'

import { auth } from '@clerk/nextjs/server';

export async function myServerAction() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  // Action logic...
}
```

### Getting User Details

When you need full user information, use `currentUser()`:

```typescript
import { currentUser } from '@clerk/nextjs/server';

export default async function Component() {
  const user = await currentUser();
  
  if (!user) {
    // Handle unauthenticated state
  }
  
  // Access user.emailAddresses, user.firstName, etc.
}
```

## Modal Authentication Setup

Ensure Sign In and Sign Up always launch as modals by configuring Clerk properly:

### Root Layout Configuration

```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Using SignInButton and SignUpButton

Always use Clerk's built-in button components for modal authentication:

```typescript
'use client'

import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function AuthButtons() {
  return (
    <>
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button>Sign Up</button>
      </SignUpButton>
    </>
  );
}
```

## Database Integration

### User ID Storage

Always use Clerk's `userId` as the foreign key in your database:

```typescript
// db/schema.ts
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk userId
  shortCode: text('short_code').notNull(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

### User Ownership Verification

Always verify ownership before operations:

```typescript
'use server'

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function deleteLink(linkId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  // Verify ownership
  await db.delete(links)
    .where(and(
      eq(links.id, linkId),
      eq(links.userId, userId)
    ));
}
```

## Client-Side Authentication

### Using useUser Hook

For client components that need user information:

```typescript
'use client'

import { useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }
  
  return <div>Hello, {user.firstName}</div>;
}
```

### Using useAuth Hook

For authentication state without full user data:

```typescript
'use client'

import { useAuth } from '@clerk/nextjs';

export function AuthStatus() {
  const { isLoaded, userId } = useAuth();
  
  if (!isLoaded) {
    return null;
  }
  
  return userId ? <div>Authenticated</div> : <div>Not authenticated</div>;
}
```

## Security Best Practices

1. **Never trust client-side auth checks** - Always verify on the server
2. **Use userId for all user-related queries** - Never expose or accept email as identifier
3. **Check auth in every Server Action** - Don't assume the caller is authenticated
4. **Verify ownership** - Always check that users can only access their own data
5. **Handle edge cases** - Account for loading states, sign-out, and session expiration

## Common Patterns

### Conditional Rendering Based on Auth

```typescript
import { auth } from '@clerk/nextjs/server';

export default async function Navigation() {
  const { userId } = await auth();
  
  return (
    <nav>
      {userId ? (
        <DashboardLink />
      ) : (
        <AuthButtons />
      )}
    </nav>
  );
}
```

### Protected API Routes

```typescript
// app/api/links/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // API logic...
}
```

## Middleware (Optional)

For route-level protection using middleware:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## Error Handling

Always handle authentication errors gracefully:

```typescript
try {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: 'Please sign in to continue' };
  }
  
  // Operation...
} catch (error) {
  console.error('Auth error:', error);
  return { error: 'Authentication failed' };
}
```

## Testing Authenticated Features

When testing:
1. Sign in with a test account
2. Verify protected routes redirect properly
3. Test ownership verification
4. Verify sign out behavior
5. Test modal authentication flow

---

**Remember:** Clerk handles all authentication. Never implement custom auth, always use modal-based sign in/up, protect the dashboard route, and redirect authenticated users from the homepage.
