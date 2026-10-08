import { Attention } from "@arshad/ui/components/dot-matrix/attention";
import { AuthHandshake } from "@arshad/ui/components/dot-matrix/auth-handshake";
import { Backprop } from "@arshad/ui/components/dot-matrix/backprop";
import { Beacon } from "@arshad/ui/components/dot-matrix/beacon";
import { Bloom } from "@arshad/ui/components/dot-matrix/bloom";
import { CacheWarm } from "@arshad/ui/components/dot-matrix/cache-warm";
import { ClusterSync } from "@arshad/ui/components/dot-matrix/cluster-sync";
import { Compile } from "@arshad/ui/components/dot-matrix/compile";
import { Constellation } from "@arshad/ui/components/dot-matrix/constellation";
import { Cron } from "@arshad/ui/components/dot-matrix/cron";
import { Deploy } from "@arshad/ui/components/dot-matrix/deploy";
import { Diffusion } from "@arshad/ui/components/dot-matrix/diffusion";
import { Drift } from "@arshad/ui/components/dot-matrix/drift";
import { Embedding } from "@arshad/ui/components/dot-matrix/embedding";
import { FlowerBloom } from "@arshad/ui/components/dot-matrix/flower-bloom";
import { GradientDescent } from "@arshad/ui/components/dot-matrix/gradient-descent";
import { Hash } from "@arshad/ui/components/dot-matrix/hash";
import { HeartPulse } from "@arshad/ui/components/dot-matrix/heart-pulse";
import { Helix } from "@arshad/ui/components/dot-matrix/helix";
import { IndexBuild } from "@arshad/ui/components/dot-matrix/index-build";
import { Lattice } from "@arshad/ui/components/dot-matrix/lattice";
import { Orbit } from "@arshad/ui/components/dot-matrix/orbit";
import { PlusPulse } from "@arshad/ui/components/dot-matrix/plus-pulse";
import { Quantize } from "@arshad/ui/components/dot-matrix/quantize";
import { RateLimit } from "@arshad/ui/components/dot-matrix/rate-limit";
import { Ripple } from "@arshad/ui/components/dot-matrix/ripple";
import { Snowflake } from "@arshad/ui/components/dot-matrix/snowflake";
import { SoundBars } from "@arshad/ui/components/dot-matrix/sound-bars";
import { StarBurst } from "@arshad/ui/components/dot-matrix/star-burst";
import { Sync } from "@arshad/ui/components/dot-matrix/sync";
import { TokenStream } from "@arshad/ui/components/dot-matrix/token-stream";
import { TwinHelix } from "@arshad/ui/components/dot-matrix/twin-helix";
import { VectorIndex } from "@arshad/ui/components/dot-matrix/vector-index";
import { Webhook } from "@arshad/ui/components/dot-matrix/webhook";

const LOADERS = [
  { name: "attention", Loader: Attention },
  { name: "auth-handshake", Loader: AuthHandshake },
  { name: "backprop", Loader: Backprop },
  { name: "beacon", Loader: Beacon },
  { name: "bloom", Loader: Bloom },
  { name: "cache-warm", Loader: CacheWarm },
  { name: "cluster-sync", Loader: ClusterSync },
  { name: "compile", Loader: Compile },
  { name: "constellation", Loader: Constellation },
  { name: "cron", Loader: Cron },
  { name: "deploy", Loader: Deploy },
  { name: "diffusion", Loader: Diffusion },
  { name: "drift", Loader: Drift },
  { name: "embedding", Loader: Embedding },
  { name: "flower-bloom", Loader: FlowerBloom },
  { name: "gradient-descent", Loader: GradientDescent },
  { name: "hash", Loader: Hash },
  { name: "heart-pulse", Loader: HeartPulse },
  { name: "helix", Loader: Helix },
  { name: "index-build", Loader: IndexBuild },
  { name: "lattice", Loader: Lattice },
  { name: "orbit", Loader: Orbit },
  { name: "plus-pulse", Loader: PlusPulse },
  { name: "quantize", Loader: Quantize },
  { name: "rate-limit", Loader: RateLimit },
  { name: "ripple", Loader: Ripple },
  { name: "snowflake", Loader: Snowflake },
  { name: "sound-bars", Loader: SoundBars },
  { name: "star-burst", Loader: StarBurst },
  { name: "sync", Loader: Sync },
  { name: "token-stream", Loader: TokenStream },
  { name: "twin-helix", Loader: TwinHelix },
  { name: "vector-index", Loader: VectorIndex },
  { name: "webhook", Loader: Webhook },
];

export function Gallery() {
  return (
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
      {LOADERS.map(({ name, Loader }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-4 [contain-intrinsic-size:auto_5rem] [content-visibility:auto]"
        >
          <div className="flex h-8 items-center justify-center">
            <Loader aria-label={name} />
          </div>
          <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400">{name}</span>
        </div>
      ))}
    </div>
  );
}
