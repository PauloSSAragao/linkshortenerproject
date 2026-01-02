# Agent Instructions for Link Shortener Project

This document provides coding standards and guidelines for AI agents working on this Link Shortener project. Follow these instructions carefully to maintain consistency and quality across the codebase.

## ⚠️ CRITICAL: Read Documentation First ⚠️

**BEFORE GENERATING ANY CODE, YOU MUST:**
1. **ALWAYS read the relevant documentation file(s) from the `/docs` directory**
2. **DO NOT proceed with code generation until you have reviewed the applicable guidelines**
3. **Each guideline file contains essential patterns, conventions, and requirements**

Skipping this step will result in code that does not meet project standards.

## Quick Reference
For detailed guidelines on specific topics, refer to the modular
documentation in the `/docs` directory.
**ALWAYS refer to the relevant .md file BEFORE generating any code:**

| Topic | Documentation File |
|-------|-------------------|
| Styling & UI Components | [docs/styling-guidelines.md](docs/styling-guidelines.md) |
| Authentication & Security | [docs/authentication-guidelines.md](docs/authentication-guidelines.md) |

## Core Principles

### 1. Type Safety First
- Always use TypeScript strict mode
- Never use `any` without justification
- Leverage Drizzle ORM type inference
- Define explicit interfaces for all component props

### 2. Next.js App Router
- Use Server Components by default
- Only add `"use client"` when necessary (hooks, events, browser APIs)
- Leverage Server Actions for mutations
- Implement proper data fetching patterns

### 3. Component Architecture
- Use shadcn/ui components (New York style)
- Apply the `cn()` utility for all conditional classes
- Keep components small and focused
- Extract reusable logic into utilities

### 4. Database Operations
- Use Drizzle ORM for all database operations
- Always validate user input before database operations
- Implement proper error handling
- Use transactions for related operations

### 5. Authentication & Security
- Check authentication in all protected routes and actions
- Never expose sensitive data to client components
- Use Clerk for all authentication needs
- Validate and sanitize all user input
- **NEVER use `middleware.ts`** - This is deprecated in later versions of Next.js
- Use `proxy.ts` instead for request interception and routing logic

## Getting Started

When working on this project:

1. **⚠️ READ THE RELEVANT DOCUMENTATION FIRST ⚠️** - This is NOT optional. Review the applicable guide(s) from the table above BEFORE writing any code
2. **Follow the established patterns** - Check existing code for examples
3. **Maintain consistency** - Use the same conventions throughout
4. **Write clean, type-safe code** - Leverage TypeScript's full potential
5. **Test your changes** - Verify functionality before committing

## Common Workflows

### Creating a New Feature

**⚠️ STEP 0: READ THE DOCUMENTATION FILES FIRST ⚠️**

Before writing any code:
1. **MUST READ:** [docs/project-overview.md](docs/project-overview.md) for project structure
2. **MUST READ:** [docs/typescript-standards.md](docs/typescript-standards.md) for typing conventions
3. **MUST READ:** [docs/nextjs-conventions.md](docs/nextjs-conventions.md) for route/component structure
4. **MUST READ:** [docs/styling-guidelines.md](docs/styling-guidelines.md) for UI implementation
5. **MUST READ:** [docs/database-guidelines.md](docs/database-guidelines.md) for database operations
6. **MUST READ:** [docs/authentication-guidelines.md](docs/authentication-guidelines.md) for authentication

### Adding a New Page

1. Create `app/[route]/page.tsx` following App Router conventions
2. Use Server Component by default
3. Add proper TypeScript interfaces
4. Implement authentication if needed
5. Style with Tailwind CSS and shadcn/ui components

### Creating a Database Table

1. Define schema in `db/schema.ts` using Drizzle ORM
2. Export inferred types
3. Generate migration: `npm run db:generate`
4. Run migration: `npm run db:migrate`
5. Update related components/actions

### Implementing Authentication

1. Check authentication with `auth()` or `currentUser()`
2. Redirect unauthenticated users
3. Verify ownership for user-specific operations
4. Use `userId` for database relationships

## Code Review Checklist

Before submitting code, verify:

- [ ] All TypeScript types are properly defined
- [ ] No TypeScript errors or ESLint warnings
- [ ] Server/Client components are correctly designated
- [ ] Authentication is implemented where required
- [ ] User input is validated
- [ ] Error handling is comprehensive
- [ ] Styles use Tailwind CSS and `cn()` utility
- [ ] Database queries use Drizzle ORM properly
- [ ] Code follows DRY principles
- [ ] Imports use path aliases (`@/`)
- [ ] Component props have explicit interfaces
- [ ] Accessibility requirements are met

## Tech Stack Summary

**Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5  
**Styling:** Tailwind CSS v4 + shadcn/ui (New York style)  
**Database:** Drizzle ORM + Neon PostgreSQL  
**Authentication:** Clerk  
**Fonts:** Geist Sans & Geist Mono

## Path Aliases

Use these path aliases consistently:
- `@/components` - React components
- `@/lib` - Utility functions
- `@/db` - Database configuration and schema
- `@/app` - Next.js app directory

## Important Files

- `app/layout.tsx` - Root layout with Clerk provider
- `db/schema.ts` - Database schema definitions
- `lib/utils.ts` - Utility functions (including `cn`)
- `drizzle.config.ts` - Drizzle ORM configuration
- `components.json` - shadcn/ui configuration
- `proxy.ts` - Request interception and routing logic (replaces deprecated middleware.ts)

## Support and Resources

- **Detailed Guidelines**: See individual documents in [docs/](docs/)
- **Next.js Docs**: https://nextjs.org/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **Clerk**: https://clerk.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com/docs
## ⚠️ FINAL REMINDER ⚠️

**DO NOT GENERATE CODE WITHOUT FIRST READING THE RELEVANT DOCUMENTATION FILES IN THE `/docs` DIRECTORY.**

This is the most important rule for this project. Every feature area has specific guidelines that must be followed.


---

**Remember:** Consistency is key. Follow the established patterns, write type-safe code, and always prioritize user experience and security.