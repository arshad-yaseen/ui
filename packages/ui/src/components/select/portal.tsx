import { Select as SelectPrimitive } from "@base-ui/react/select";

export type SelectPortalProps = SelectPrimitive.Portal.Props;

export function Portal(props: SelectPortalProps) {
  return <SelectPrimitive.Portal data-slot="select-portal" {...props} />;
}
