import {
  Braces,
  CheckCircle2,
  FileJson,
  FileCode2,
  Table2,
  Binary,
  Link2,
  Clock,
  HardDrive,
  KeyRound,
  Fingerprint,
  Regex,
  CalendarClock,
  Database,
  GitCompare,
  Globe,
  FileType2,
  TerminalSquare,
  ListTree,
  type LucideIcon,
} from "lucide-react";

export const CATEGORIES = [
  "Converters",
  "Formatters",
  "Security",
  "Developer Utilities",
  "Web Tools",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Faq {
  q: string;
  a: string;
}

export interface ToolMeta {
  slug: string;
  name: string;
  short: string;
  category: Category;
  icon: LucideIcon;
  popular?: boolean;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  about: string[];
  faqs: Faq[];
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    short: "Format, beautify and validate JSON with clear error messages.",
    category: "Formatters",
    icon: Braces,
    popular: true,
    keywords: ["json", "beautify", "pretty print", "minify"],
    seoTitle: "JSON Formatter & Validator Online – Free | DevToolkit",
    seoDescription:
      "Format, beautify and validate JSON online for free. Fast, private and easy-to-use JSON formatter that runs directly in your browser.",
    about: [
      "JSON is easy for machines to read but painful for humans when it arrives minified on a single line. This formatter re-indents your JSON so nesting, arrays and object boundaries become obvious at a glance.",
      "Formatting also acts as a syntax check: if the document cannot be parsed you get the exact position of the problem instead of a generic failure. Use Minify when you need the smallest possible payload for an API request or a config value.",
    ],
    faqs: [
      {
        q: "Is my JSON uploaded anywhere?",
        a: "No. Parsing and formatting happen with the browser's built-in JSON engine on your device. Nothing is sent to a server.",
      },
      {
        q: "Why does my JSON fail with 'Unexpected token'?",
        a: "The most common causes are trailing commas, single quotes instead of double quotes, unquoted keys and comments. JSON allows none of these.",
      },
      {
        q: "How large a document can I format?",
        a: "It depends on your device's memory, but documents of a few megabytes format almost instantly on a modern machine.",
      },
    ],
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    short: "Check whether a JSON document is valid and locate syntax errors.",
    category: "Formatters",
    icon: CheckCircle2,
    popular: true,
    keywords: ["json", "validate", "lint", "syntax"],
    seoTitle: "JSON Validator Online – Check JSON Syntax Free | DevToolkit",
    seoDescription:
      "Validate JSON online for free. Instantly check JSON syntax and get the exact line and column of any parsing error, entirely in your browser.",
    about: [
      "A validator answers one question quickly: can this document be parsed? That is usually what you need when an API rejects a payload or a config file refuses to load.",
      "When the document is invalid the reported line and column point at the first character the parser could not accept — the actual mistake is often just before it, such as a missing comma or an unclosed bracket.",
    ],
    faqs: [
      {
        q: "Does this validate against a JSON Schema?",
        a: "No, this tool checks syntax only. It confirms the document is well-formed JSON, not that it matches a particular schema.",
      },
      {
        q: "Are comments allowed in JSON?",
        a: "Not in standard JSON. Formats such as JSONC or JSON5 allow them, but they will be reported as errors here.",
      },
      {
        q: "What counts as valid JSON?",
        a: "Any single valid JSON value: an object, array, string, number, boolean or null. A bare top-level value is valid.",
      },
    ],
  },
  {
    slug: "json-to-yaml",
    name: "JSON to YAML",
    short: "Convert JSON documents into readable YAML.",
    category: "Converters",
    icon: FileJson,
    popular: true,
    keywords: ["json", "yaml", "convert", "kubernetes"],
    seoTitle: "JSON to YAML Converter Online – Free | DevToolkit",
    seoDescription:
      "Convert JSON to YAML online for free. Paste JSON and get clean, indented YAML for Kubernetes, CI pipelines and config files — all in your browser.",
    about: [
      "YAML is the configuration language of Kubernetes manifests, GitHub Actions workflows and countless CI systems, while APIs almost always speak JSON. Converting between the two is a daily task.",
      "Because YAML is a superset of JSON, every valid JSON document has a YAML equivalent. The output uses two-space indentation and quotes strings only when required.",
    ],
    faqs: [
      {
        q: "Are comments preserved?",
        a: "JSON has no comments, so the generated YAML contains none. You can add them freely after downloading.",
      },
      {
        q: "How are nested arrays handled?",
        a: "Arrays become block sequences with dash items, nested according to their depth in the source document.",
      },
      {
        q: "Can I download the result?",
        a: "Yes, the Download button saves the output as a .yaml file directly from your browser.",
      },
    ],
  },
  {
    slug: "yaml-to-json",
    name: "YAML to JSON",
    short: "Parse YAML and convert it into formatted JSON.",
    category: "Converters",
    icon: FileCode2,
    keywords: ["yaml", "json", "convert", "parse"],
    seoTitle: "YAML to JSON Converter Online – Free | DevToolkit",
    seoDescription:
      "Convert YAML to JSON online for free. Paste a YAML file and get formatted JSON instantly, with clear parsing errors, directly in your browser.",
    about: [
      "Turning YAML into JSON is useful when you need to feed a configuration file to an API, a JSON Schema validator or a script that only understands JSON.",
      "YAML is whitespace sensitive, so indentation mistakes are the most frequent failure. The parser reports the line where it stopped so you can fix the structure quickly.",
    ],
    faqs: [
      {
        q: "Which YAML version is supported?",
        a: "The tool parses YAML 1.2 core schema documents, which covers virtually all configuration files in the wild.",
      },
      {
        q: "What happens to YAML anchors and aliases?",
        a: "They are resolved during parsing, so the JSON output contains the expanded values.",
      },
      {
        q: "Can I convert multi-document YAML?",
        a: "This tool converts a single document. Split multi-document files on the --- separator and convert each part.",
      },
    ],
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV",
    short: "Turn an array of JSON objects into a CSV table.",
    category: "Converters",
    icon: Table2,
    keywords: ["json", "csv", "export", "spreadsheet"],
    seoTitle: "JSON to CSV Converter Online – Free | DevToolkit",
    seoDescription:
      "Convert a JSON array of objects to CSV online for free. Handles missing keys and quoting automatically, and runs entirely in your browser.",
    about: [
      "API responses are lists of objects; spreadsheets want rows and columns. This converter walks every object in the array, collects the union of all keys and emits them as the header row.",
      "Objects with missing keys leave the cell empty rather than shifting columns. Values containing commas, quotes or newlines are quoted and escaped following RFC 4180.",
    ],
    faqs: [
      {
        q: "What if my objects have different keys?",
        a: "Every key seen anywhere in the array becomes a column, and rows that lack that key get an empty cell.",
      },
      {
        q: "How are nested objects handled?",
        a: "Nested objects and arrays are serialised as compact JSON inside the cell, so no information is lost.",
      },
      {
        q: "Can I open the result in Excel?",
        a: "Yes. Download the .csv file and open it directly; the output uses standard comma separation and quoting.",
      },
    ],
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    short: "Convert CSV or delimited text into a JSON array.",
    category: "Converters",
    icon: Table2,
    keywords: ["csv", "json", "convert", "tsv"],
    seoTitle: "CSV to JSON Converter Online – Free | DevToolkit",
    seoDescription:
      "Convert CSV to JSON online for free. Choose your delimiter and header row and get formatted JSON output instantly in your browser.",
    about: [
      "Exports from spreadsheets, databases and analytics dashboards usually arrive as CSV. Converting to JSON makes the data usable in scripts, fixtures and API payloads.",
      "The parser understands quoted fields, escaped double quotes and newlines inside quotes. You can pick the delimiter and choose whether the first line is a header row or should be turned into positional keys.",
    ],
    faqs: [
      {
        q: "Can I use tab-separated files?",
        a: "Yes, choose Tab as the delimiter to parse TSV content.",
      },
      {
        q: "Are numbers converted automatically?",
        a: "No. Every value stays a string so identifiers with leading zeros and long numeric IDs are preserved exactly.",
      },
      {
        q: "What happens without a header row?",
        a: "Each row becomes an object with keys field_1, field_2 and so on, in column order.",
      },
    ],
  },
  {
    slug: "base64",
    name: "Base64 Encoder / Decoder",
    short: "Encode text to Base64 and decode Base64 back to text.",
    category: "Converters",
    icon: Binary,
    popular: true,
    keywords: ["base64", "encode", "decode", "btoa", "atob"],
    seoTitle: "Base64 Encoder & Decoder Online – Free | DevToolkit",
    seoDescription:
      "Encode text to Base64 or decode Base64 to plain text online for free. Full Unicode support, no uploads, runs entirely in your browser.",
    about: [
      "Base64 represents binary data using 64 printable ASCII characters so it can travel safely through channels that expect text, such as HTTP headers, data URLs and email bodies.",
      "It is an encoding, not encryption: anyone can decode it. Use it for transport, never to protect secrets. This implementation is UTF-8 aware, so accented characters and emoji round-trip correctly.",
    ],
    faqs: [
      {
        q: "Is Base64 secure?",
        a: "No. It is trivially reversible and provides no confidentiality. Encrypt sensitive data instead.",
      },
      {
        q: "Why does decoding fail?",
        a: "The input probably contains characters outside the Base64 alphabet, or its length is not a valid padded multiple of four.",
      },
      {
        q: "Does it support emoji and non-Latin text?",
        a: "Yes. Text is encoded as UTF-8 before Base64 conversion, so all Unicode is handled.",
      },
    ],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    short: "Percent-encode and decode URLs and query parameters.",
    category: "Web Tools",
    icon: Link2,
    keywords: ["url", "percent encoding", "encodeuricomponent", "escape"],
    seoTitle: "URL Encoder & Decoder Online – Free | DevToolkit",
    seoDescription:
      "Encode or decode URLs and query string values online for free. Percent-encoding for spaces and special characters, straight in your browser.",
    about: [
      "URLs may only contain a limited set of characters. Everything else — spaces, ampersands, slashes inside a value, non-ASCII text — has to be percent-encoded so the receiving server parses the request the way you intended.",
      "Component mode escapes reserved characters such as & ? / and = , which is what you want for a single query parameter value. Full URI mode leaves the URL structure intact and escapes only illegal characters.",
    ],
    faqs: [
      {
        q: "What is the difference between the two modes?",
        a: "Component mode is encodeURIComponent and escapes reserved delimiters; full URI mode is encodeURI and keeps a complete URL usable.",
      },
      {
        q: "Why does a space become %20 and not +?",
        a: "%20 is correct percent-encoding. The plus sign is only valid for application/x-www-form-urlencoded form bodies.",
      },
      {
        q: "Why does decoding throw an error?",
        a: "A stray % that is not followed by two hexadecimal digits produces a malformed sequence the decoder cannot interpret.",
      },
    ],
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    short: "Convert Unix timestamps to dates and back, in seconds or ms.",
    category: "Converters",
    icon: Clock,
    keywords: ["unix", "epoch", "timestamp", "date", "iso 8601"],
    seoTitle: "Unix Timestamp Converter Online – Epoch to Date | DevToolkit",
    seoDescription:
      "Convert Unix timestamps to human-readable dates and dates back to epoch time. Supports seconds and milliseconds, UTC, local time and ISO 8601.",
    about: [
      "A Unix timestamp counts the seconds elapsed since 1 January 1970 UTC. It is unambiguous and timezone-free, which makes it the default way to store instants in logs, databases and JWT claims.",
      "Confusion usually comes from units: JavaScript works in milliseconds while most backends use seconds. Ten-digit values are seconds, thirteen-digit values are milliseconds.",
    ],
    faqs: [
      {
        q: "Seconds or milliseconds?",
        a: "A ten-digit number is seconds; a thirteen-digit number is milliseconds. Use the unit selector to switch.",
      },
      {
        q: "Which timezone is used?",
        a: "The output shows both your browser's local time and UTC, plus the ISO 8601 representation.",
      },
      {
        q: "What is the year 2038 problem?",
        a: "Systems storing timestamps in a signed 32-bit integer overflow in January 2038. Use 64-bit integers to avoid it.",
      },
    ],
  },
  {
    slug: "bytes-converter",
    name: "Bytes Converter",
    short: "Convert between bytes, KB, MB, GB and TB in binary or decimal.",
    category: "Converters",
    icon: HardDrive,
    keywords: ["bytes", "kb", "mb", "gb", "kib", "storage"],
    seoTitle: "Bytes Converter – KB, MB, GB, TB Calculator | DevToolkit",
    seoDescription:
      "Convert bytes to KB, MB, GB and TB online for free. Switch between binary (1024) and decimal (1000) units and see every equivalent value at once.",
    about: [
      "Storage units are ambiguous because two conventions coexist. Binary units multiply by 1024 and are what operating systems report; decimal units multiply by 1000 and are what drive manufacturers print on the box.",
      "That is why a '1 TB' disk shows up as roughly 931 GB. Toggle the mode to see both interpretations of the same number.",
    ],
    faqs: [
      {
        q: "What is the difference between KB and KiB?",
        a: "KiB is exactly 1024 bytes. KB is formally 1000 bytes, though it is often used loosely to mean 1024.",
      },
      {
        q: "Which mode should I use?",
        a: "Use binary for memory, file sizes reported by an OS and buffer maths. Use decimal for marketed disk capacity and network transfer figures.",
      },
      {
        q: "Are bits supported?",
        a: "This calculator works in bytes. Divide by eight to reason about bits, for example network throughput in Mbps.",
      },
    ],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    short: "Decode JWT header and payload claims locally in your browser.",
    category: "Security",
    icon: KeyRound,
    popular: true,
    keywords: ["jwt", "token", "decode", "claims", "auth"],
    seoTitle: "JWT Decoder Online – Decode JSON Web Tokens | DevToolkit",
    seoDescription:
      "Decode JSON Web Tokens online. Inspect the JWT header, payload claims and expiry locally in your browser — no token is ever transmitted.",
    about: [
      "A JWT is three Base64URL segments separated by dots: header, payload and signature. The first two are only encoded, not encrypted, so anyone holding the token can read the claims.",
      "This decoder never verifies the signature — doing so requires the signing key, which should never leave your server. Treat the decoded output as informational and never paste production tokens into any online tool, including this one.",
    ],
    faqs: [
      {
        q: "Does this verify the signature?",
        a: "No. Verification needs the secret or public key, so it must happen on your server. This tool only decodes.",
      },
      {
        q: "Is my token sent anywhere?",
        a: "No. Decoding happens in your browser and the token is not stored or logged. Even so, avoid pasting live production tokens.",
      },
      {
        q: "What do exp, iat and nbf mean?",
        a: "They are Unix timestamps for expiry, issued-at and not-before. The decoder shows them as readable dates.",
      },
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    short: "Generate cryptographically random UUID v4 identifiers.",
    category: "Developer Utilities",
    icon: Fingerprint,
    keywords: ["uuid", "guid", "v4", "random", "id"],
    seoTitle: "UUID v4 Generator Online – Free Random GUIDs | DevToolkit",
    seoDescription:
      "Generate random UUID v4 identifiers online for free. Create one or many GUIDs at once using your browser's cryptographic random source.",
    about: [
      "A UUID version 4 is 122 random bits formatted as 36 characters. Collisions are so improbable that independent systems can mint identifiers without coordinating.",
      "Generation uses the Web Crypto API, so the values come from a cryptographically secure random source rather than Math.random.",
    ],
    faqs: [
      {
        q: "Are these UUIDs unique?",
        a: "Practically, yes. With 122 random bits the chance of a duplicate is negligible for any realistic workload.",
      },
      {
        q: "Can I use them as database primary keys?",
        a: "Yes, though random UUIDs fragment B-tree indexes. Consider UUID v7 or a sequential ID for very write-heavy tables.",
      },
      {
        q: "Is a UUID a secret?",
        a: "Version 4 UUIDs are unguessable, but they are usually visible in URLs and logs, so do not rely on them alone for authorisation.",
      },
    ],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    short: "Test regular expressions with live matches and capture groups.",
    category: "Developer Utilities",
    icon: Regex,
    popular: true,
    keywords: ["regex", "regular expression", "match", "pattern"],
    seoTitle: "Regex Tester Online – Test Regular Expressions | DevToolkit",
    seoDescription:
      "Test JavaScript regular expressions online for free. See highlighted matches, positions and capture groups instantly as you type, in your browser.",
    about: [
      "Regular expressions are quick to write and hard to verify by reading. Testing against real sample text is the fastest way to confirm a pattern does what you expect.",
      "Matches are highlighted in place and listed with their index and capture groups. The flags control global matching, case sensitivity, multiline anchors, dot-matches-newline and Unicode mode.",
    ],
    faqs: [
      {
        q: "Which regex flavour is used?",
        a: "The JavaScript (ECMAScript) engine built into your browser, so results match what runs in Node.js and the browser.",
      },
      {
        q: "Why does my pattern only match once?",
        a: "Enable the g flag. Without it the engine stops after the first match.",
      },
      {
        q: "Is my test data sent anywhere?",
        a: "No. The pattern is executed locally against your sample text and nothing leaves the page.",
      },
    ],
  },
  {
    slug: "cron-generator",
    name: "Cron Generator",
    short: "Build cron expressions visually and explain existing ones.",
    category: "Developer Utilities",
    icon: CalendarClock,
    popular: true,
    keywords: ["cron", "crontab", "schedule", "expression"],
    seoTitle: "Cron Expression Generator & Explainer Online | DevToolkit",
    seoDescription:
      "Generate cron expressions with a visual builder and translate any crontab schedule into plain English. Free, fast and runs in your browser.",
    about: [
      "A cron expression has five fields — minute, hour, day of month, month and day of week — each accepting a value, a list, a range or a step such as */15.",
      "The builder writes the expression for you, and the explain mode turns an existing schedule into a sentence so you can confirm it before deploying it to a server or CI pipeline.",
    ],
    faqs: [
      {
        q: "Which cron dialect is this?",
        a: "Standard five-field Unix crontab, the format used by cron, Kubernetes CronJobs and most schedulers.",
      },
      {
        q: "What does */5 mean?",
        a: "A step value: every fifth unit of that field. In the minute field it runs at minute 0, 5, 10 and so on.",
      },
      {
        q: "How do day of month and day of week combine?",
        a: "In classic cron, if both are restricted the job runs when either matches, which surprises many people.",
      },
    ],
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    short: "Format and minify SQL queries for several dialects.",
    category: "Formatters",
    icon: Database,
    popular: true,
    keywords: ["sql", "format", "beautify", "query"],
    seoTitle: "SQL Formatter Online – Beautify SQL Queries Free | DevToolkit",
    seoDescription:
      "Format and beautify SQL queries online for free. Supports PostgreSQL, MySQL, SQLite and more. Nothing is executed and no database is contacted.",
    about: [
      "Generated or hand-edited SQL often arrives as one long line. Formatting puts each clause on its own line and indents subqueries and joins so the shape of the query becomes readable.",
      "This tool only rewrites text. It never connects to a database, never executes a statement and never sees your data.",
    ],
    faqs: [
      {
        q: "Is my query executed?",
        a: "No. The formatter is a pure text transformation performed in your browser.",
      },
      {
        q: "Which dialects are supported?",
        a: "Standard SQL plus PostgreSQL, MySQL, MariaDB, SQLite, BigQuery, Snowflake and T-SQL, selectable above the editor.",
      },
      {
        q: "Are parameter placeholders preserved?",
        a: "Yes. Placeholders such as $1, ? and :name are left untouched.",
      },
    ],
  },
  {
    slug: "text-diff",
    name: "Text Diff Checker",
    short: "Compare two texts line by line and highlight the changes.",
    category: "Developer Utilities",
    icon: GitCompare,
    keywords: ["diff", "compare", "text", "code"],
    seoTitle: "Text Diff Checker Online – Compare Two Texts | DevToolkit",
    seoDescription:
      "Compare two blocks of text or code online for free. See added, removed and unchanged lines side by side, computed entirely in your browser.",
    about: [
      "Diffing is the quickest way to spot what actually changed between two configuration files, API responses or code snippets when the difference is a single character somewhere in the middle.",
      "The comparison uses a longest-common-subsequence algorithm over lines, the same basic approach as version control tools, and stacks the two panes vertically on small screens.",
    ],
    faqs: [
      {
        q: "Is the comparison line based or character based?",
        a: "Lines are matched with an LCS algorithm, so a line is reported as added, removed or unchanged.",
      },
      {
        q: "Can I compare code?",
        a: "Yes. The panes use a monospace font and whitespace is preserved exactly.",
      },
      {
        q: "Is my content uploaded?",
        a: "No. The diff is computed locally in your browser.",
      },
    ],
  },
  {
    slug: "http-status-codes",
    name: "HTTP Status Codes",
    short: "Search a reference of HTTP status codes and their meanings.",
    category: "Web Tools",
    icon: Globe,
    keywords: ["http", "status code", "404", "500", "reference"],
    seoTitle: "HTTP Status Codes Reference – Search All Codes | DevToolkit",
    seoDescription:
      "Search every HTTP status code by number, name or description. Understand 2xx, 3xx, 4xx and 5xx responses with concise, practical explanations.",
    about: [
      "Every HTTP response starts with a three-digit status code. The first digit gives the class: 1xx informational, 2xx success, 3xx redirection, 4xx client error and 5xx server error.",
      "Picking the right code matters — clients, proxies and CDNs change their caching and retry behaviour based on it. Search by number, name or description and open a code for details.",
    ],
    faqs: [
      {
        q: "What is the difference between 401 and 403?",
        a: "401 means you are not authenticated, so credentials may help. 403 means you are authenticated but not allowed.",
      },
      {
        q: "301 or 302?",
        a: "301 is a permanent move and is cached aggressively by browsers. Use 302 or 307 for temporary redirects.",
      },
      {
        q: "When should I return 422?",
        a: "When the request is syntactically valid but semantically wrong, such as a well-formed JSON body failing validation.",
      },
    ],
  },
  {
    slug: "mime-types",
    name: "MIME Type Lookup",
    short: "Find the MIME type for a file extension, or the reverse.",
    category: "Web Tools",
    icon: FileType2,
    keywords: ["mime", "content-type", "extension", "media type"],
    seoTitle: "MIME Type Lookup – Find Content-Type by Extension | DevToolkit",
    seoDescription:
      "Look up MIME types by file extension or search by media type. A fast reference for setting the correct Content-Type header on your responses.",
    about: [
      "The Content-Type header tells a client how to interpret a response body. Get it wrong and browsers may download a page instead of rendering it, or refuse to run a script.",
      "Search by extension such as .json or by media type such as image/ to find the right value, including whether a charset parameter is typically appropriate.",
    ],
    faqs: [
      {
        q: "Is text/javascript or application/javascript correct?",
        a: "The HTML specification now recommends text/javascript for scripts; both are widely accepted.",
      },
      {
        q: "When do I need a charset?",
        a: "Add charset=utf-8 to text-based types such as text/html and text/plain so the client decodes bytes correctly.",
      },
      {
        q: "What if a type is unknown?",
        a: "Use application/octet-stream, which tells the client to treat the body as opaque binary data.",
      },
    ],
  },
  {
    slug: "curl-generator",
    name: "cURL Generator",
    short: "Build cURL, fetch and Python requests snippets from a request.",
    category: "Web Tools",
    icon: TerminalSquare,
    keywords: ["curl", "fetch", "requests", "api", "http"],
    seoTitle: "cURL Command Generator – Build API Requests | DevToolkit",
    seoDescription:
      "Generate cURL commands plus JavaScript fetch and Python requests snippets from a method, URL, headers and body. Nothing is executed or sent.",
    about: [
      "Writing a cURL command by hand means remembering flag order, quoting and how to escape a JSON body. This builder assembles it from structured fields instead.",
      "The same request is emitted as a JavaScript fetch call and a Python requests snippet so you can move between a terminal test and application code without rewriting anything. No request is ever executed here.",
    ],
    faqs: [
      {
        q: "Does this send the request?",
        a: "No. It only generates text. Copy the command and run it yourself when you are ready.",
      },
      {
        q: "How is the body escaped?",
        a: "The body is placed in single quotes for cURL, with embedded single quotes escaped so the shell receives it intact.",
      },
      {
        q: "Can I add authentication headers?",
        a: "Yes, add any header row you need. Avoid pasting real production credentials into any online tool.",
      },
    ],
  },
  {
    slug: "query-string-parser",
    name: "Query String Parser",
    short: "Parse, edit and rebuild URL query parameters.",
    category: "Web Tools",
    icon: ListTree,
    keywords: ["query string", "url", "parameters", "parse"],
    seoTitle: "Query String Parser & Builder Online | DevToolkit",
    seoDescription:
      "Parse a URL query string into an editable table, change or add parameters and rebuild the encoded URL. Free, private and browser-based.",
    about: [
      "Long URLs with a dozen tracking and pagination parameters are hard to read. Parsing them into a table makes each key and value obvious, with percent-encoding already decoded.",
      "Edit any row, add or remove parameters and the encoded query string and full URL are rebuilt as you type, so you can copy a corrected link straight into a browser or test.",
    ],
    faqs: [
      {
        q: "Are repeated keys supported?",
        a: "Yes. Each occurrence gets its own row, which is how array-style parameters like tag=a&tag=b are usually expressed.",
      },
      {
        q: "Do I have to paste a full URL?",
        a: "No. A bare query string, with or without the leading question mark, works too.",
      },
      {
        q: "Is encoding handled automatically?",
        a: "Yes. Values are decoded for editing and re-encoded when the URL is rebuilt.",
      },
    ],
  },
];

export const TOOL_MAP: Record<string, ToolMeta> = Object.fromEntries(TOOLS.map((t) => [t.slug, t]));

export const POPULAR_TOOLS = TOOLS.filter((t) => t.popular);

export function relatedTools(slug: string, count = 4): ToolMeta[] {
  const tool = TOOL_MAP[slug];
  if (!tool) return TOOLS.slice(0, count);
  const sameCategory = TOOLS.filter((t) => t.category === tool.category && t.slug !== slug);
  const rest = TOOLS.filter((t) => t.category !== tool.category && t.slug !== slug);
  return [...sameCategory, ...rest].slice(0, count);
}

export function searchTools(query: string, category: Category | "All" = "All"): ToolMeta[] {
  const q = query.trim().toLowerCase();
  return TOOLS.filter((t) => {
    if (category !== "All" && t.category !== category) return false;
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      t.short.toLowerCase().includes(q) ||
      t.slug.includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q))
    );
  });
}
