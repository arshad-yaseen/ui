import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@arshad/ui/lib/cn";

const SIDE_OFFSET = 4;

export type SelectPositionerProps = SelectPrimitive.Positioner.Props;

export function Positioner({
  sideOffset = SIDE_OFFSET,
  className,
  ...props
}: SelectPositionerProps) {
  return (
    <SelectPrimitive.Positioner
      data-slot="select-positioner"
      sideOffset={sideOffset}
      className={cn("z-50 outline-hidden select-none", className)}
      {...props}
    />
  );
}
