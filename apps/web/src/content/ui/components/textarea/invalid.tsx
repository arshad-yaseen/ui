import { Textarea } from "@arshad/ui/components/textarea";

export function Invalid() {
  return <Textarea aria-label="Bio" data-invalid defaultValue="Too short" className="w-64" />;
}
