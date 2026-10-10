import { Select as SelectPrimitive } from "@base-ui/react/select";
import { LABEL_MEDIA } from "@arshad/ui/components/select/item-text";
import { cn } from "@arshad/ui/lib/cn";

export type SelectValueProps = SelectPrimitive.Value.Props;

export function Value({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "min-w-0 truncate text-start",
        "data-placeholder:text-neutral-600 dark:data-placeholder:text-neutral-400",
        LABEL_MEDIA,
        className,
      )}
      {...props}
    />
  );
}
