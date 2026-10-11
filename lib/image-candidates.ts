export const SUPPORTED_IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".svg",
  ".gif",
  ".ico",
  ".bmp",
] as const;

export const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".bmp": "image/bmp",
};

/**
 * Returns candidate alternative file paths for a given image src.
 * Completely safe for browser/client-side use (no Node.js modules).
 */
export function getImageCandidates(src: string): string[] {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) {
    return [src];
  }

  // Remove query params or hashes if present
  const [cleanSrc, extra] = src.split(/[?#]/);
  const suffix = extra ? `?${extra}` : "";

  const lastDot = cleanSrc.lastIndexOf(".");
  const lastSlash = cleanSrc.lastIndexOf("/");

  // If there's no extension, append all supported formats
  if (lastDot === -1 || lastDot < lastSlash) {
    const list = [cleanSrc];
    for (const ext of SUPPORTED_IMAGE_EXTENSIONS) {
      list.push(`${cleanSrc}${ext}${suffix}`);
    }
    return list;
  }

  const baseWithoutExt = cleanSrc.substring(0, lastDot);
  const originalExt = cleanSrc.substring(lastDot).toLowerCase();

  const candidates: string[] = [src];

  // Try common modern web formats first, then standard formats
  const priorityOrder = [".webp", ".png", ".jpg", ".jpeg", ".avif", ".svg", ".gif"];
  for (const ext of priorityOrder) {
    if (ext !== originalExt) {
      candidates.push(`${baseWithoutExt}${ext}${suffix}`);
    }
  }

  // Also include lowercase variation of the base if it contained uppercase letters
  const baseParts = baseWithoutExt.split("/");
  const fileName = baseParts.pop() || "";
  const dirPath = baseParts.join("/");
  if (fileName.toLowerCase() !== fileName) {
    const lowerBase = `${dirPath}/${fileName.toLowerCase()}`;
    for (const ext of priorityOrder) {
      const lowerCandidate = `${lowerBase}${ext}${suffix}`;
      if (!candidates.includes(lowerCandidate)) {
        candidates.push(lowerCandidate);
      }
    }
  }

  return candidates;
}
