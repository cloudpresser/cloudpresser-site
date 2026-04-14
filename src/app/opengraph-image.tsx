import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Luiz Ozorio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0b1221",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Wave layers — echoing the favicon */}
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

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#e2e8f0",
              letterSpacing: "-0.03em",
            }}
          >
            Luiz Ozorio
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              lineHeight: 1.5,
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Staff AI Systems Engineer — production AI platforms, orchestration,
            evals, and system reliability.
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            cloudpresser.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
