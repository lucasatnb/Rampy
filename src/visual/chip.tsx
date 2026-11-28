import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium leading-none transition-colors",
  {
    variants: {
      variant: {
        neutro: "border-border bg-surface-raised text-text-dim",
        acao: "border-primary/40 bg-primary-soft text-primary-on-soft",
        recompensa: "border-warning/35 bg-warning-soft text-warning-fg",
        sucesso: "border-success/30 bg-success-soft text-success-fg",
        erro: "border-error/30 bg-error-soft text-error-fg",
      },
    },
    defaultVariants: { variant: "neutro" },
  },
);

type ChipProps = ComponentProps<"span"> & VariantProps<typeof chipVariants>;

export function Chip({ className, variant, ...props }: ChipProps) {
  return <span className={cn(chipVariants({ variant }), className)} {...props} />;
}

export { chipVariants };
