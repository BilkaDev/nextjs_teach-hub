import { FC, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Typography } from "@/lib/uiElements/typography";

export const formFieldVariants = cva("", {
  variants: {
    variant: {
      default: "block text-sm font-medium leading-6 text-gray-900"
    }
  },

  defaultVariants: {
    variant: "default"
  }
});

interface FormFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  error?: string;
}

const FormField: FC<FormFieldProps> = forwardRef(
  (
    { className, variant, label, children, error, ...props }: FormFieldProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <>
        <div ref={ref} className={className}>
          <label className={cn(formFieldVariants({ variant })) + " flex-1"}>
            {label ? label : null}
            <div className="mt-2 flex gap-4">
              <input
                {...props}
                type="text"
                className="block w-full rounded-md border-9 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </label>
          {children}
        </div>
        {error ? (
          <Typography variant="sm" status="error">
            {error}
          </Typography>
        ) : null}
      </>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
