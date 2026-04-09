import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Control Systems for Intelligent Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const layers = [
  "Execution",
  "Verification",
  "Architecture",
  "Observability",
  "Interface",
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b1221",
          padding: "60px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Wave layers */}
        <svg
          viewBox="0 0 1200 630"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "1200px",
            height: "630px",
          }}
        >
          <path
            d="M 0 480 Q 300 380 600 480 T 1200 480 L 1200 630 L 0 630 Z"
            fill="#1b3156"
          />
          <path
            d="M 0 540 Q 300 440 600 540 T 1200 540 L 1200 630 L 0 630 Z"
            fill="#60a5fa"
            opacity="0.6"
          />
        </svg>

        {/* Top: site + layer badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "#94a3b8",
              letterSpacing: "-0.01em",
            }}
          >
            cloudpresser.com
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {layers.map((layer) => (
              <div
                key={layer}
                style={{
                  fontSize: "14px",
                  color: "#60a5fa",
                  backgroundColor: "#1a2744",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                {layer}
              </div>
            ))}
          </div>
        </div>

        {/* Center: title + description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "960px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#e2e8f0",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Control Systems for Intelligent Software
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              lineHeight: 1.5,
            }}
          >
            A series on the architecture AI agents actually need.
          </div>
        </div>

        {/* Bottom: author */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#64748b",
              fontWeight: 400,
            }}
          >
            Luiz Ozorio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
