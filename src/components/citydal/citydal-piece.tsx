// A small live piece of the CityDal prototype for case studies: one screen of the app in a short iframe.
// `path` is any route of the app, e.g. "/nearby" or "/deals". `height` crops the phone frame.
const BASE = process.env.NEXT_PUBLIC_CITYDAL_URL ?? "http://localhost:8093";

export default function CityDalPiece({
  path,
  title,
  height = 640,
  caption,
}: {
  path: string;
  title: string;
  height?: number;
  caption?: string;
}) {
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_CITYDAL_URL) return null;
  const src = `${BASE}${path}${path.includes("?") ? "&" : "?"}embed=1`;
  return (
    <figure className="m-0 mx-auto w-full max-w-[520px]">
      <iframe
        src={src}
        title={title}
        allow="geolocation"
        loading="lazy"
        style={{ height }}
        className="block w-full border-0 bg-[#09090b]"
      />
      {caption && <figcaption className="mt-3 text-center text-sm text-white/50">{caption}</figcaption>}
    </figure>
  );
}
