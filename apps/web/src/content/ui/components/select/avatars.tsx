import { Avatar } from "@arshad/ui/components/avatar";
import { Select } from "@arshad/ui/components/select";

const people = [
  { value: "lara", name: "Lara Tucci", initials: "LT", src: "/avatars/lara.webp" },
  { value: "devon", name: "Devon Lane", initials: "DL", src: "/avatars/devon.webp" },
  { value: "noah", name: "Noah Pierre", initials: "NP", src: "/avatars/noah.webp" },
];

const items = people.map((person) => ({
  value: person.value,
  label: (
    <>
      <Avatar.Root aria-hidden>
        <Avatar.Image src={person.src} alt="" />
        <Avatar.Fallback>{person.initials}</Avatar.Fallback>
      </Avatar.Root>
      {person.name}
    </>
  ),
}));

export function Avatars() {
  return (
    <Select.Root items={items} defaultValue="lara">
      <Select.Trigger aria-label="Assignee">
        <Select.Value />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              {items.map((item) => (
                <Select.Item key={item.value} value={item.value}>
                  <Select.ItemIndicator />
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
