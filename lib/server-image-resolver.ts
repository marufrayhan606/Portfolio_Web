import path from "path";
import fs from "fs";
import { SUPPORTED_IMAGE_EXTENSIONS, MIME_TYPES } from "./image-candidates";

/**
 * Server-side helper to find a matching image file on disk in public/<baseDir>/...
 * Resolves any format even if the requested extension doesn't match the file on disk.
 */
export function resolvePublicImage(baseDir: string, relativePathParts: string[]): {
  buffer: Buffer;
  mimeType: string;
  filePath: string;
} | null {
  try {
    const relativePath = relativePathParts.join("/");
    const fullPublicDir = path.join(process.cwd(), "public", baseDir);
    const requestedFullPath = path.join(fullPublicDir, relativePath);

    // 1. Direct hit: requested file exists exactly as named
    if (fs.existsSync(requestedFullPath) && fs.statSync(requestedFullPath).isFile()) {
      const ext = path.extname(requestedFullPath).toLowerCase();
      const mimeType = MIME_TYPES[ext] || "application/octet-stream";
      return {
        buffer: fs.readFileSync(requestedFullPath),
        mimeType,
        filePath: requestedFullPath,
      };
    }

    // 2. Format mismatch: search target directory for file with same base name and any format
    const parsed = path.parse(requestedFullPath);
    const targetDir = parsed.dir;
    const targetBaseName = parsed.name.toLowerCase();

    if (fs.existsSync(targetDir) && fs.statSync(targetDir).isDirectory()) {
      const filesInDir = fs.readdirSync(targetDir);

      const normalize = (name: string) => name.toLowerCase().replace(/[-_]/g, "");
      const normalizedTarget = normalize(targetBaseName);

      // Try exact base name match or normalized hyphen/underscore match with any supported extension
      for (const ext of SUPPORTED_IMAGE_EXTENSIONS) {
        const match = filesInDir.find(
          (f) => {
            const fExt = path.extname(f).toLowerCase();
            if (fExt !== ext) return false;
            const fBase = path.parse(f).name.toLowerCase();
            return fBase === targetBaseName || normalize(fBase) === normalizedTarget;
          }
        );
        if (match) {
          const foundPath = path.join(targetDir, match);
          return {
            buffer: fs.readFileSync(foundPath),
            mimeType: MIME_TYPES[ext] || "image/png",
            filePath: foundPath,
          };
        }
      }

      // If still not found and in images/ directory, check if any avatar/portrait exists
      if (baseDir === "images" && (targetBaseName.includes("maruf") || targetBaseName.includes("portrait") || targetBaseName.includes("profile"))) {
        const portraitFile = filesInDir.find((f) => {
          const l = f.toLowerCase();
          const ext = path.extname(l);
          return (
            (l.includes("maruf") || l.includes("portrait") || l.includes("profile") || l.includes("avatar")) &&
            (SUPPORTED_IMAGE_EXTENSIONS as readonly string[]).includes(ext)
          );
        });
        if (portraitFile) {
          const foundPath = path.join(targetDir, portraitFile);
          const ext = path.extname(portraitFile).toLowerCase();
          return {
            buffer: fs.readFileSync(foundPath),
            mimeType: MIME_TYPES[ext] || "image/jpeg",
            filePath: foundPath,
          };
        }
      }
    }

    return null;
  } catch (err) {
    console.error("Error resolving image:", err);
    return null;
  }
}
