import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from 'lib/cn';

const typographyVariants = cva('font-frutiger', {
  variants: {
    variant: {
      xl: 'text-5xl leading-[56px]',
      p: 'leading-7',
      utility: 'text-xs font-normal',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type VariantPropType = VariantProps<typeof typographyVariants>;

const variantElementMap: Record<NonNullable<VariantPropType['variant']>, string> = {
  xl: 'h1',
  p: 'p',
  utility: 'p',
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : as ?? (variant ? variantElementMap[variant] : undefined) ?? 'div';
    return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />;
  }
);

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
