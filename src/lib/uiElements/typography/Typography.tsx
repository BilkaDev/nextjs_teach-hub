import { FC, HTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-bold text-5xl",
      h2: "font-bold text-4xl",
      h3: "font-bold text-3xl",
      h4: "font-bold text-2xl",
      h5: "font-bold text-xl",
      h6: "font-bold text-lg",
      sm: "text-sm",
      p: ""
    },
    status: {
      error: "text-red-600",
      success: "text-green-600"
    }
  },

  defaultVariants: {
    variant: "p"
  }
});

interface TypographyProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {}

const Typography: FC<TypographyProps> = ({
  className,
  variant,
  status,
  ...props
}: TypographyProps) => {
  return (
    <p className={cn(typographyVariants({ variant, status, className }))}>
      {props.children}
    </p>
  );
};

export default Typography;
