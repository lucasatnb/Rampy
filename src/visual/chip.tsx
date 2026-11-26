import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium leading-none transition-colors",
  {
    variants: {
      variant: {
        neutro: "border-border bg-surface-2/80 text-text-dim",
        acao: "border-action/40 bg-action/15 text-action-accent",
        recompensa: "border-reward/35 bg-reward/10 text-reward",
        sucesso: "border-success/30 bg-success/10 text-success",
        erro: "border-error/30 bg-error/10 text-error",
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
