import { cn } from './cn';

// Button Variants
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning'
  | 'brand'
  | 'soft'
  | 'icon'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/95 shadow-flat',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border border-border bg-background hover:bg-muted text-foreground',
    ghost: 'hover:bg-muted text-foreground',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-flat',
    success: 'bg-success text-success-foreground hover:bg-success/90 shadow-flat',
    warning: 'bg-warning text-warning-foreground hover:bg-warning/90 shadow-flat',
    brand: 'bg-brand-600 text-brand-50 hover:bg-brand-700 shadow-flat',
    soft: 'bg-accent/20 text-accent-foreground hover:bg-accent/30',
    icon: 'rounded-full p-2 border border-border bg-background hover:bg-muted text-foreground',
    link: 'text-primary underline-offset-4 hover:underline p-0 bg-transparent active:scale-100',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs gap-1.5',
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-5 py-2.5 text-lg gap-2.5',
    xl: 'px-6 py-3 text-xl gap-3',
  };

  return cn(
    baseStyles,
    variants[variant],
    variant !== 'icon' && sizes[size],
    fullWidth && 'w-full flex',
    className
  );
}

// Badge Variants
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'soft' | 'outline';

export function badgeVariants({
  variant = 'primary',
  className,
}: {
  variant?: BadgeVariant;
  className?: string;
} = {}) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-ring';

  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    danger: 'bg-destructive/10 text-destructive border border-destructive/20',
    soft: 'bg-muted text-muted-foreground',
    outline: 'border border-border text-foreground',
  };

  return cn(baseStyles, variants[variant], className);
}
