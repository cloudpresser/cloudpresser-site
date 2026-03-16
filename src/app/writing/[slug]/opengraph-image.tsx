import { ImageResponse } from "next/og";
import { getPostMeta, getAllPostSlugs } from "@/lib/posts";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostMeta(slug);

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

        {/* Top section: site name + tags */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
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
          </div>

          {post.tags.length > 0 && (
            <div style={{ display: "flex", gap: "8px" }}>
              {post.tags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: "14px",
                    color: "#60a5fa",
                    backgroundColor: "#1a2744",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
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
              fontSize: post.title.length > 60 ? "40px" : "48px",
              fontWeight: 700,
              color: "#e2e8f0",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </div>
          {post.description && (
            <div
              style={{
                fontSize: "20px",
                color: "#94a3b8",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.description.length > 160
                ? post.description.slice(0, 157) + "..."
                : post.description}
            </div>
          )}
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
