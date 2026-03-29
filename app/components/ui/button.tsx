import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-black text-white not-disabled:hover:bg-black/90',
        destructive:
          'bg-black text-white not-disabled:hover:bg-black/90 focus-visible:ring-black/20 dark:focus-visible:ring-black/40 dark:bg-black/60',
        outline: 'border bg-black text-white not-disabled:hover:bg-black/90',
        secondary: 'bg-black text-white not-disabled:hover:bg-black/80',
        ghost:
          'bg-black text-white not-disabled:hover:bg-black/50 dark:not-disabled:hover:bg-black/50',
        link: 'text-black underline-offset-4 not-disabled:hover:underline',
      },
      size: {
        default: 'min-h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'min-h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'min-h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        'icon-xs': 'size-7',
        'icon-2xs': "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        'icon-3xs': "size-5 [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({variant, size, className}))}
      {...props}
    />
  );
}

export {Button, buttonVariants};
