import { Button } from "@arshad/ui/components/button";

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="solid" color="neutral" size="sm">
        Small
      </Button>
      <Button variant="solid" color="neutral" size="md">
        Medium
      </Button>
      <Button variant="solid" color="neutral" size="lg">
        Large
      </Button>
    </div>
  );
}
