import { Button } from "@arshad/ui/components/button";
import { Diffusion } from "@arshad/ui/components/dot-matrix/diffusion";

export function Loading() {
  return (
    <Button variant="outline" disabled>
      <Diffusion aria-hidden />
      Generating…
    </Button>
  );
}
