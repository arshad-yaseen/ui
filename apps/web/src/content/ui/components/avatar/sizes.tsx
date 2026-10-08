import { Avatar } from "@arshad/ui/components/avatar";

const sizes = ["sm", "md", "lg"] as const;

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Avatar.Root key={size} size={size}>
          <Avatar.Fallback>NP</Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}
