import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/metadata";
import { site } from "@/lib/site";
import { loadOgFonts } from "@arshad/ui/lib/load-og-fonts";

const TITLE_SIZE_BY_LENGTH = [
  { upTo: 22, size: 100 },
  { upTo: 38, size: 82 },
  { upTo: 55, size: 68 },
] as const;

const titleSize = (length: number): number =>
  TITLE_SIZE_BY_LENGTH.find((step) => length <= step.upTo)?.size ?? 56;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? site.name;
  const subtitle = searchParams.get("subtitle");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        padding: "100px",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          fontSize: titleSize(title.length),
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: "#1a1a17",
          lineHeight: 1.15,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: "32px",
            fontSize: "28px",
            fontWeight: 400,
            color: "#9b9b90",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>,
    {
      ...OG_SIZE,
      fonts: await loadOgFonts(),
      // The URL names the content, so a given URL never needs to change.
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    },
  );
}
