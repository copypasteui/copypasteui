"use client";

import { useEffect, useRef, useState } from "react";

// A preview video's link may end in #t=<seconds>: how far in the recorded page had painted, so the loop starts there.
const startOf = (video: string) => Number(video.match(/#t=(\d+(?:\.\d+)?)$/)?.[1] ?? 0);

const wantsStill = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/** Muted loop over the thumbnail that plays while the card is on screen. */
function PreviewVideo({ src, start }: { src: string; start: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!video.src) video.src = src;
          if (video.currentTime < start) video.currentTime = start;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src, start]);

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      onTimeUpdate={(e) => {
        if (e.currentTarget.currentTime < start) e.currentTarget.currentTime = start;
      }}
      onEnded={(e) => {
        e.currentTarget.currentTime = start;
        e.currentTarget.play().catch(() => {});
      }}
      onError={() => setPlaying(false)}
      className={`pointer-events-none absolute inset-0 size-full object-cover object-top transition duration-500 group-hover:scale-[1.03] ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}

/**
 * Thumbnail from the item's image link, with its preview video on top when it has one (and the visitor hasn't
 * asked for less motion or data). If the image can't be loaded it falls back to a scaled live preview.
 */
export default function Thumb({
  src,
  video = null,
  previewSrc,
  alt,
  className = "",
}: {
  src: string;
  video?: string | null;
  previewSrc: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [motion, setMotion] = useState(false);

  useEffect(() => setMotion(!wantsStill()), []);

  if (failed) {
    return (
      <iframe
        src={previewSrc}
        title={alt}
        loading="lazy"
        sandbox="allow-scripts"
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-[400%] w-[400%] origin-top-left scale-25 border-0"
      />
    );
  }
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] ${className}`}
      />
      {video && motion && <PreviewVideo src={video.replace(/#t=.*$/, "")} start={startOf(video)} />}
    </>
  );
}
