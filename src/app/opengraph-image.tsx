import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import { join } from "path";

export const alt = "Decode Hack - Hack for impact";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.svg"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: "radial-gradient(ellipse at top, #24410f 0%, #06020D 70%)",
          color: "#E9FDB0",
        }}
      >
        <img src={`data:image/svg+xml;base64,${logo}`} width={784} height={240} alt="" />
        <div style={{ width: 600, height: 3, background: "linear-gradient(to right, transparent, #4E941A, transparent)" }} />
        <div style={{ fontSize: 40 }}>Hack for impact</div>
      </div>
    ),
    size,
  );
}
