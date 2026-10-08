import { Avatar } from "@arshad/ui/components/avatar";

export function Basic() {
  return (
    <div className="flex items-center gap-4">
      <Avatar.Root>
        <Avatar.Image src="/avatars/lara.webp" alt="Lara Tucci" />
        <Avatar.Fallback delay={600}>LT</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>NP</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
