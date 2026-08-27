export interface MimeEntry {
  extension: string;
  mime: string;
}

export const MIME_TYPES: MimeEntry[] = [
  { extension: ".aac", mime: "audio/aac" },
  { extension: ".avi", mime: "video/x-msvideo" },
  { extension: ".bin", mime: "application/octet-stream" },
  { extension: ".bmp", mime: "image/bmp" },
  { extension: ".bz2", mime: "application/x-bzip2" },
  { extension: ".csv", mime: "text/csv" },
  { extension: ".css", mime: "text/css" },
  { extension: ".doc", mime: "application/msword" },
  {
    extension: ".docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  { extension: ".eot", mime: "application/vnd.ms-fontobject" },
  { extension: ".epub", mime: "application/epub+zip" },
  { extension: ".gif", mime: "image/gif" },
  { extension: ".gz", mime: "application/gzip" },
  { extension: ".htm", mime: "text/html" },
  { extension: ".html", mime: "text/html" },
  { extension: ".ico", mime: "image/vnd.microsoft.icon" },
  { extension: ".jar", mime: "application/java-archive" },
  { extension: ".jpeg", mime: "image/jpeg" },
  { extension: ".jpg", mime: "image/jpeg" },
  { extension: ".js", mime: "application/javascript" },
  { extension: ".json", mime: "application/json" },
  { extension: ".jsonld", mime: "application/ld+json" },
  { extension: ".mjs", mime: "application/javascript" },
  { extension: ".mp3", mime: "audio/mpeg" },
  { extension: ".mp4", mime: "video/mp4" },
  { extension: ".mpeg", mime: "video/mpeg" },
  { extension: ".oga", mime: "audio/ogg" },
  { extension: ".ogv", mime: "video/ogg" },
  { extension: ".ogx", mime: "application/ogg" },
  { extension: ".otf", mime: "font/otf" },
  { extension: ".pdf", mime: "application/pdf" },
  { extension: ".php", mime: "application/x-httpd-php" },
  { extension: ".png", mime: "image/png" },
  { extension: ".ppt", mime: "application/vnd.ms-powerpoint" },
  {
    extension: ".pptx",
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  { extension: ".rar", mime: "application/vnd.rar" },
  { extension: ".rtf", mime: "application/rtf" },
  { extension: ".sh", mime: "application/x-sh" },
  { extension: ".svg", mime: "image/svg+xml" },
  { extension: ".swf", mime: "application/x-shockwave-flash" },
  { extension: ".tar", mime: "application/x-tar" },
  { extension: ".tif", mime: "image/tiff" },
  { extension: ".tiff", mime: "image/tiff" },
  { extension: ".ts", mime: "video/mp2t" },
  { extension: ".ttf", mime: "font/ttf" },
  { extension: ".txt", mime: "text/plain" },
  { extension: ".vsd", mime: "application/vnd.visio" },
  { extension: ".wav", mime: "audio/wav" },
  { extension: ".weba", mime: "audio/webm" },
  { extension: ".webm", mime: "video/webm" },
  { extension: ".webp", mime: "image/webp" },
  { extension: ".woff", mime: "font/woff" },
  { extension: ".woff2", mime: "font/woff2" },
  { extension: ".xhtml", mime: "application/xhtml+xml" },
  { extension: ".xls", mime: "application/vnd.ms-excel" },
  { extension: ".xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  { extension: ".xml", mime: "application/xml" },
  { extension: ".yaml", mime: "application/yaml" },
  { extension: ".yml", mime: "application/yaml" },
  { extension: ".zip", mime: "application/zip" },
  { extension: ".7z", mime: "application/x-7z-compressed" },
];

export function searchMime(query: string): MimeEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return MIME_TYPES;
  const needle = q.startsWith(".") ? q : q;
  return MIME_TYPES.filter(
    (entry) => entry.extension.includes(needle) || entry.mime.toLowerCase().includes(needle),
  );
}
