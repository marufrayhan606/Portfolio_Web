"use client";

import { useState, useEffect } from "react";
import { getImageCandidates } from "@/lib/image-candidates";

export interface AdaptiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackElement?: React.ReactNode;
}

/**
 * AdaptiveImage handles images in any format (.png, .jpg, .jpeg, .webp, .avif, .svg).
 * If the provided format or extension fails or doesn't match the file on disk,
 * it automatically cycles through all supported image extensions seamlessly.
 */
export function AdaptiveImage({
  src,
  alt,
  className = "",
  fallbackElement,
  onError,
  onLoad,
  style,
  ...props
}: AdaptiveImageProps) {
  const [candidates, setCandidates] = useState<string[]>(() => getImageCandidates(src));
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  // When src changes from props, refresh candidates list and reset index
  useEffect(() => {
    const list = getImageCandidates(src);
    setCandidates(list);
    setCandidateIndex(0);
    setHasFailedAll(false);
  }, [src]);

  const currentSrc = candidates[candidateIndex] || src;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (candidateIndex + 1 < candidates.length) {
      // Try next supported image format
      setCandidateIndex((prev) => prev + 1);
    } else {
      // All candidate extensions exhausted
      setHasFailedAll(true);
      if (onError) onError(e);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (onLoad) onLoad(e);
  };

  if (hasFailedAll) {
    if (fallbackElement) {
      return <>{fallbackElement}</>;
    }
    return (
      <div
        className={`adaptive-img-fallback glass-panel ${className}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "120px",
          color: "var(--text-muted)",
          fontSize: "12px",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <span>Image unavailable ({alt})</span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
