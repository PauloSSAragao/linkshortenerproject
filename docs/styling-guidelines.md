# Styling Guidelines

This document outlines styling standards and component usage for the Link Shortener project.

## Core Principle: shadcn/ui First

**ALWAYS use shadcn/ui components for all UI elements.** Never create custom UI components when a shadcn/ui equivalent exists.

## shadcn/ui Components

### Component Style
- **Variant**: New York style (configured in `components.json`)
- **Location**: `@/components/ui`
- **Installation**: `npx shadcn@latest add [component-name]`

### Available Components
Use these shadcn/ui components for all UI needs:
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch
- **Buttons**: Button (with variants: default, destructive, outline, secondary, ghost, link)
- **Layout**: Card, Separator, Tabs, Accordion, Dialog, Sheet
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Navigation**: NavigationMenu, Breadcrumb, Pagination
- **Data Display**: Table, Badge, Avatar, Tooltip
- **Overlays**: Dialog, Sheet, Popover, DropdownMenu, AlertDialog

### Adding New Components
When you need a UI component:
1. Check if shadcn/ui provides it: https://ui.shadcn.com/docs/components
2. Install it: `npx shadcn@latest add [component-name]`
3. Import and use from `@/components/ui`

## Tailwind CSS

### Utility Classes
- Use Tailwind utility classes for all styling
- Follow mobile-first responsive design
- Use Tailwind v4 syntax

### The `cn()` Utility
**Always use the `cn()` utility for conditional classes:**

```typescript
import { cn } from "@/lib/utils"

// Good
<div className={cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
)} />

// Bad - don't concatenate strings manually
<div className={`base-class ${condition ? "conditional-class" : ""}`} />
```

### Responsive Design
Use Tailwind breakpoints consistently:
```typescript
<div className="w-full md:w-1/2 lg:w-1/3" />
```

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Component Styling Pattern

### Standard Implementation
```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function MyComponent({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button variant="default" size="default">
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Custom Variants
Extend shadcn/ui components using the `cn()` utility:
```typescript
<Button 
  className={cn("w-full", isLoading && "opacity-50")}
  disabled={isLoading}
>
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

## Color Scheme

Use CSS variables defined in `app/globals.css`:
- `background` / `foreground`
- `card` / `card-foreground`
- `popover` / `popover-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border`, `input`, `ring`

Reference via Tailwind classes:
```typescript
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
```

## Typography

### Font Stack
- **Primary**: Geist Sans (set in root layout)
- **Monospace**: Geist Mono

### Text Styling
Use Tailwind typography utilities:
```typescript
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-sm text-muted-foreground">Description</p>
```

## Forms

### Always Use shadcn/ui Form Components
```typescript
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
  <Button type="submit">Submit</Button>
</div>
```

### Form Validation
Integrate with React Hook Form and Zod for type-safe validation.

## Icons

Use Lucide React for all icons (included with shadcn/ui):
```typescript
import { Check, X, Loader2 } from "lucide-react"

<Button>
  <Check className="mr-2 h-4 w-4" />
  Save
</Button>
```

## Accessibility

shadcn/ui components are built with accessibility in mind:
- Always provide proper labels for inputs
- Use semantic HTML via shadcn/ui components
- Include ARIA attributes where needed
- Test keyboard navigation

## Best Practices

1. **Don't reinvent the wheel** - If shadcn/ui has it, use it
2. **Use `cn()` for all conditional styling** - Never manually concatenate classes
3. **Follow component composition** - Combine shadcn/ui components rather than creating custom ones
4. **Maintain consistency** - Use the same components and patterns throughout
5. **Leverage variants** - Use built-in component variants before adding custom styles
6. **Mobile-first** - Always consider responsive design from the start

## Common Patterns

### Loading States
```typescript
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

### Error States
```typescript
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

{error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

### Empty States
```typescript
<Card className="p-8 text-center">
  <p className="text-muted-foreground">No items found</p>
</Card>
```

---

**Remember**: shadcn/ui components are your building blocks. Use them for everything, style with Tailwind, and combine with `cn()` for conditional styling.
