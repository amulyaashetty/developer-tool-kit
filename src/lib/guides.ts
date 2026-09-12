export interface GuideLink {
  slug: string;
  title: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: "JSON" | "Encoding" | "Security" | "Databases" | "Web" | "Formats" | "Regex";
  readTime: number;
  content: string;
  relatedTools: Array<{ slug: string; name: string }>;
  relatedGuides: GuideLink[];
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "what-is-json",
    title: "What is JSON? A Practical Guide for Developers",
    description: "Learn what JSON is, why it's the universal data format, and how to use it effectively.",
    category: "JSON",
    readTime: 8,
    keywords: [
      "json",
      "data format",
      "api",
      "web development",
      "what is json",
      "json tutorial",
    ],
    seoTitle: "What is JSON? Complete Guide for Developers | DevToolkit",
    seoDescription:
      "Understand JSON: the universal data format for APIs, configs, and web development. Learn syntax, structure, and best practices.",
    content: `
JSON (JavaScript Object Notation) is the most widely used data format for APIs, configuration files, and web applications. Despite the name, JSON works across all programming languages.

## Why JSON Matters

JSON has become the de facto standard because it is:

- **Human-readable**: Unlike binary formats, you can read and edit JSON directly
- **Machine-efficient**: Parsers are fast and built into every modern language
- **Universal**: Supported everywhere—browsers, servers, databases, mobile apps
- **Simple**: A developer can learn JSON in minutes

Every REST API returns JSON. Every configuration framework accepts JSON. Every NoSQL database stores JSON. If you work with data on the internet, you work with JSON daily.

## JSON Structure

JSON consists of two basic building blocks:

**Objects** are key-value pairs in curly braces:

\`\`\`json
{
  "name": "Alice",
  "age": 28,
  "email": "alice@example.com"
}
\`\`\`

**Arrays** are ordered lists in square brackets:

\`\`\`json
["apple", "banana", "cherry"]
\`\`\`

You can nest objects and arrays to create complex structures:

\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "tags": ["admin", "developer"]
    },
    {
      "id": 2,
      "name": "Bob",
      "tags": ["user"]
    }
  ]
}
\`\`\`

## Data Types in JSON

JSON supports five primitive types:

- **String**: "hello", "alice@example.com" (must use double quotes)
- **Number**: 42, 3.14, -17 (integers or floats)
- **Boolean**: true or false (lowercase)
- **Null**: null (represents missing or empty value)
- **Object or Array**: nested structures

Everything else must be represented as one of these types. There is no date type, so dates are usually strings ("2024-01-15") or Unix timestamps (1705276800).

## JSON Rules

JSON has strict rules. Breaking them causes parsing errors:

- Keys must be double-quoted: "name", not 'name' or name
- Strings must use double quotes: "hello", not 'hello'
- No trailing commas: ["a", "b"] not ["a", "b",]
- No comments: JSON ignores // and /* */
- No single quotes: {"key": 'value'} is invalid
- No undefined: use null instead

These rules exist because JSON must be parseable by machines. Flexibility would make parsing impossible.

## When to Use JSON

Use JSON when you need:

- **APIs**: All modern REST APIs return JSON
- **Configuration**: app.json, package.json, tsconfig.json
- **Logging**: Structured logs are often JSON
- **Storage**: NoSQL databases like MongoDB store JSON
- **Data interchange**: Between different systems and languages

## JSON vs Other Formats

**JSON vs XML**: JSON is simpler and smaller. XML is more verbose but allows custom tags. Use JSON unless you specifically need XML's features.

**JSON vs YAML**: YAML is more human-friendly (no quotes required) but JSON is stricter and more widely supported. Use JSON for APIs, YAML for config files.

**JSON vs CSV**: CSV is good for tabular data. JSON is better for complex structures. Most tools can convert between them.

## Common JSON Mistakes

- Forgetting double quotes on keys or string values
- Adding trailing commas in objects or arrays
- Using single quotes instead of double quotes
- Including comments (JSON spec does not allow them)
- Using undefined instead of null

## Validating and Formatting JSON

When JSON breaks, it's usually a simple syntax error. Use the DevToolkit JSON Validator to find errors instantly. The JSON Formatter helps you read large JSON documents by adding indentation.

## Best Practices

- Use meaningful key names: "user_email" not "ue"
- Be consistent: use camelCase, snake_case, or kebab-case, but pick one
- Flatten deeply nested structures if possible for readability
- Use null for missing values, not empty strings
- Document your JSON schema so others understand its structure

JSON is simple, powerful, and everywhere. Understanding it well makes you a better developer.
    `,
    relatedTools: [
      { slug: "json-formatter", name: "JSON Formatter" },
      { slug: "json-validator", name: "JSON Validator" },
    ],
    relatedGuides: [
      { slug: "json-syntax-errors", title: "Common JSON Syntax Errors and Fixes" },
      { slug: "json-vs-yaml", title: "JSON vs YAML: Differences and When to Use Each" },
    ],
  },
  {
    slug: "json-syntax-errors",
    title: "Common JSON Syntax Errors and How to Fix Them",
    description:
      "Learn the most common JSON mistakes and how to fix them quickly.",
    category: "JSON",
    readTime: 6,
    keywords: [
      "json",
      "syntax error",
      "validation",
      "json errors",
      "troubleshooting",
      "debugging",
    ],
    seoTitle: "Common JSON Errors – How to Fix Them | DevToolkit",
    seoDescription:
      "Fix JSON syntax errors fast. Learn the 5 most common JSON mistakes and how to avoid them.",
    content: `
JSON is strict. One typo breaks everything. Here are the most common mistakes and how to fix them.

## Error: Unexpected Token

**"SyntaxError: Unexpected token ' in JSON at position 0"**

**Cause**: You used single quotes instead of double quotes.

**Wrong**:
\`\`\`json
{'name': 'Alice'}
\`\`\`

**Correct**:
\`\`\`json
{"name": "Alice"}
\`\`\`

JSON spec requires double quotes. No exceptions.

## Error: Trailing Comma

**"SyntaxError: Unexpected token , in JSON"**

**Cause**: You left a comma after the last item in an object or array.

**Wrong**:
\`\`\`json
{
  "name": "Alice",
  "age": 28,
}
\`\`\`

**Correct**:
\`\`\`json
{
  "name": "Alice",
  "age": 28
}
\`\`\`

Remove the comma after the last property.

## Error: Unquoted Keys

**"SyntaxError: Unexpected token n in JSON at position 0"**

**Cause**: Object keys must be quoted.

**Wrong**:
\`\`\`json
{name: "Alice", age: 28}
\`\`\`

**Correct**:
\`\`\`json
{"name": "Alice", "age": 28}
\`\`\`

Always quote keys with double quotes.

## Error: Comments in JSON

**"SyntaxError: Unexpected token / in JSON"**

**Cause**: JSON does not support comments.

**Wrong**:
\`\`\`json
{
  // User name
  "name": "Alice"
}
\`\`\`

**Correct**:
\`\`\`json
{
  "name": "Alice"
}
\`\`\`

If you need comments, use a JSON5 parser or store metadata in a separate field.

## Error: Undefined Value

**"SyntaxError: Unexpected token u in JSON"**

**Cause**: JSON does not support undefined. Use null instead.

**Wrong**:
\`\`\`json
{
  "name": "Alice",
  "middle": undefined
}
\`\`\`

**Correct**:
\`\`\`json
{
  "name": "Alice",
  "middle": null
}
\`\`\`

null is JSON's way to represent an empty value.

## Error: Line Breaks in Strings

**"SyntaxError: Unterminated string in JSON"**

**Cause**: Strings cannot contain literal line breaks.

**Wrong**:
\`\`\`json
{
  "bio": "Alice is a
    software engineer"
}
\`\`\`

**Correct**:
\`\`\`json
{
  "bio": "Alice is a software engineer"
}
\`\`\`

Or use \\n for line breaks:

\`\`\`json
{
  "bio": "Alice is a\\nsoftware engineer"
}
\`\`\`

## How to Debug JSON

Use the DevToolkit JSON Validator. Paste your JSON and it will show the exact position of the error. The error message often points to the character just after the real mistake, so check one position before.

## Quick Checklist

- [ ] All strings use double quotes
- [ ] All keys use double quotes
- [ ] No trailing commas
- [ ] No comments
- [ ] Use null for empty values, not undefined
- [ ] No line breaks inside strings (use \\n instead)
- [ ] No single quotes
- [ ] Brackets and braces are balanced

One of these five mistakes causes 95% of JSON errors. Check them first.
    `,
    relatedTools: [
      { slug: "json-validator", name: "JSON Validator" },
      { slug: "json-formatter", name: "JSON Formatter" },
    ],
    relatedGuides: [
      { slug: "what-is-json", title: "What is JSON? A Practical Guide" },
    ],
  },
  {
    slug: "base64-encoding",
    title: "What is Base64 Encoding? Encoding vs Encryption",
    description:
      "Learn what Base64 encoding is, how it works, and why it's different from encryption.",
    category: "Encoding",
    readTime: 7,
    keywords: [
      "base64",
      "encoding",
      "encryption",
      "decode",
      "encode",
      "what is base64",
    ],
    seoTitle: "Base64 Encoding Explained – Not Encryption | DevToolkit",
    seoDescription:
      "Understand Base64: how encoding works, when to use it, and why it's not encryption.",
    content: `
Base64 is everywhere in web development, but it's often misunderstood. Let's clear up what Base64 actually is.

## What is Base64?

Base64 is a way to represent binary data using only 64 printable ASCII characters. It converts any file—an image, a PDF, raw bytes—into a text string that can be safely transmitted anywhere.

The 64 characters are: A-Z, a-z, 0-9, +, /

This scheme was created to solve a real problem: email used to only support text. If you wanted to attach a binary file, it would get corrupted. Base64 solved this by converting the binary into safe text.

## How Base64 Works

Base64 works by grouping binary data into 6-bit chunks and mapping each chunk to one of the 64 safe characters.

Here's "Hello" step by step:

Original text: H e l l o

Step 1: Convert to binary
- H = 01001000
- e = 01100101
- l = 01101100
- l = 01101100
- o = 01101111

Step 2: Group into 6-bit chunks
- 010010 (18) → S
- 000110 (6) → G
- 010101 (21) → V
- 101100 (44) → s
- 110110 (54) → 2
- 111101 (61) → 9
- 11 (3, padded) → D (with padding)

Step 3: Output
SGVsbG8=

The = at the end is padding to make the length a multiple of 4.

## Base64 is NOT Encryption

This is the biggest misunderstanding. Base64 is encoding, not encryption.

- **Encoding** is reversible transformation for transmission. Anyone with Base64 text can instantly decode it.
- **Encryption** is transformation that requires a secret key. Only someone with the key can decrypt it.

If you Base64 encode a password, anyone can decode it. If you encrypt a password with a proper encryption algorithm, only the holder of the key can decrypt it.

## When to Use Base64

Use Base64 when you need to:

- **Embed binary data in text**: Put an image directly in JSON
- **Transmit binary data safely**: Send files over channels that only support text
- **Store binary in URLs**: Encode a binary value for a query parameter
- **Encode credentials**: In HTTP Basic Auth (though this is not secure without HTTPS)
- **Data URIs**: Embed images directly in HTML/CSS

Example - embedding an image in JSON:

\`\`\`json
{
  "name": "logo.png",
  "data": "iVBORw0KGgoAAAANSUhEUgAAAAUA..."
}
\`\`\`

## When NOT to Use Base64

Do NOT use Base64 for:

- **Storing passwords**: Use a proper hash like bcrypt or scrypt
- **Securing data**: Encryption requires a key, Base64 doesn't
- **Hiding information**: Base64 is trivial to reverse
- **Compressing data**: Base64 actually increases size by 33%

## Base64 Size Increase

Base64 encoding increases data size by about 33%.

- Original: 3 bytes
- Base64: 4 characters (plus padding)

If you're sending a 1MB image:
- Original: 1MB
- Base64: 1.33MB

This overhead is why efficient protocols use binary directly when possible. HTTP handles binary well. Only use Base64 when you need the data in text format.

## Tools for Base64

DevToolkit has a Base64 encoder/decoder. Paste text or binary data and convert between representations instantly.

## Summary

- Base64 transforms binary to safe text
- It's reversible, not encrypted
- Use it for transmission, not security
- It increases file size by 33%
- Never rely on Base64 for security
    `,
    relatedTools: [
      { slug: "base64-encoder", name: "Base64 Encoder" },
      { slug: "base64-decoder", name: "Base64 Decoder" },
    ],
    relatedGuides: [
      { slug: "jwt-explained", title: "How JWTs Work: Header, Payload and Signature" },
    ],
  },
  {
    slug: "jwt-explained",
    title: "How JWTs Work: Header, Payload and Signature",
    description:
      "Understand how JSON Web Tokens work and how to inspect them safely.",
    category: "Security",
    readTime: 10,
    keywords: [
      "jwt",
      "json web token",
      "authentication",
      "token",
      "bearer",
      "jwt explained",
    ],
    seoTitle: "How JWTs Work – Header, Payload, Signature | DevToolkit",
    seoDescription:
      "Learn how JSON Web Tokens (JWT) work. Understand the header, payload, and signature.",
    content: `
JWT (JSON Web Token) is the standard way to transmit information securely between systems. If you've ever seen a token that looks like this:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

...that's a JWT. Let's decode it.

## JWT Structure

A JWT is three Base64-encoded parts separated by dots:

header.payload.signature

## Part 1: Header

The header is Base64-decoded metadata about the token.

\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

- alg: The algorithm used to sign the token (HS256, RS256, etc.)
- typ: Always "JWT"

## Part 2: Payload

The payload contains the actual data (claims). This is what the application uses.

\`\`\`json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
\`\`\`

Common claims:
- sub: Subject (usually a user ID)
- iss: Issuer (who created the token)
- aud: Audience (who should accept it)
- iat: Issued at (Unix timestamp)
- exp: Expiration time (Unix timestamp)
- name, email, roles: Custom data

## Part 3: Signature

The signature proves the token hasn't been tampered with.

The server that created the token uses a secret key plus the header and payload to create the signature:

signature = HMAC-SHA256(
  base64(header) + "." + base64(payload),
  secret_key
)

If someone modifies the payload, the signature no longer matches. That's how the server detects tampering.

## How JWT Authentication Works

1. User logs in with username/password
2. Server verifies credentials, creates a JWT
3. Server returns the JWT to the client
4. Client stores the JWT (usually in localStorage)
5. On each request, client sends: Authorization: Bearer {token}
6. Server verifies the signature (using the same secret key)
7. If signature is valid, server trusts the payload claims

## Important: Decoding is NOT Verifying

You can decode any JWT to see its payload. Use the DevToolkit JWT Decoder.

But decoding doesn't mean verifying. To verify, you need:
1. The original secret key (only the server has this)
2. Check that the signature matches

Anyone can decode a JWT. Only someone with the secret key can verify it's legitimate.

## Example

Encoded JWT:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEiLCJuYW1lIjoiQWxpY2UiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjA0MDI3MDAwfQ.d8m5w9x2c4_tJ6kL9_pZ

Decoded header:
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

Decoded payload:
\`\`\`json
{
  "sub": "9876543210",
  "name": "Alice",
  "admin": true,
  "iat": 1604027000
}
\`\`\`

The signature is verified by only the server (using the secret key).

## Security Best Practices

- Never put sensitive data (passwords, credit cards) in JWT payload. It's encoded, not encrypted.
- Always use HTTPS. A JWT can be intercepted over HTTP.
- Set short expiration times (minutes, not days)
- Use HS256 or RS256 algorithms (not none)
- Store the secret key securely on the server
- Rotate keys periodically
- Validate expiration (exp) on every request

## Algorithm Notes

- HS256 (HMAC-SHA256): Server signs with secret key. Good for internal services.
- RS256 (RSA-SHA256): Server signs with private key, client verifies with public key. Good for public APIs.
- none: No signature. Never use this in production.

## When to Use JWT

- API authentication (most common)
- OAuth/OpenID Connect flows
- Sharing identity between services
- Mobile apps (better than cookies)
- Microservices communication

## When NOT to Use JWT

- Don't rely on claims without verifying the signature
- Don't store JWTs longer than necessary
- Don't put sensitive data in the payload

## Tools

DevToolkit's JWT Decoder lets you inspect any token instantly. Remember: decoding shows the payload, but only the server can verify it's legitimate.
    `,
    relatedTools: [
      { slug: "jwt-decoder", name: "JWT Decoder" },
      { slug: "base64-decoder", name: "Base64 Decoder" },
    ],
    relatedGuides: [
      { slug: "base64-encoding", title: "What is Base64 Encoding?" },
    ],
  },
  {
    slug: "regex-guide",
    title: "Regular Expressions: Practical Guide for Beginners",
    description: "Learn regex patterns and how to use them effectively.",
    category: "Regex",
    readTime: 12,
    keywords: [
      "regex",
      "regular expressions",
      "pattern matching",
      "regex tutorial",
      "regex patterns",
    ],
    seoTitle: "Regex Tutorial for Beginners – Patterns Explained | DevToolkit",
    seoDescription:
      "Learn regular expressions from scratch. Patterns, syntax, and practical examples for common tasks.",
    content: `
Regular expressions (regex) are patterns that match strings. They're everywhere in development: validation, searching, replacing, parsing.

Regex syntax looks intimidating at first, but it's a skill worth learning.

## Basic Patterns

The simplest pattern is literal text:

Pattern: cat
Matches: "cat" in "The cat sat on the mat"

But literal matching is rare. Regex becomes powerful with special characters.

## Character Classes

[abc] - matches a, b, or c
[a-z] - matches any lowercase letter
[A-Z] - matches any uppercase letter
[0-9] - matches any digit
[a-zA-Z0-9] - matches any letter or digit
[^abc] - matches anything except a, b, c

Example: [aeiou] matches any vowel

## Quantifiers

? - 0 or 1 times
* - 0 or more times
+ - 1 or more times
{n} - exactly n times
{n,m} - between n and m times

Examples:
- colou?r matches "color" or "colour"
- a+ matches "a", "aa", "aaa" etc
- [0-9]{3} matches exactly 3 digits

## Common Patterns

Email (simplified):
\`\`\`
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}
\`\`\`

Phone (US):
\`\`\`
[0-9]{3}-[0-9]{3}-[0-9]{4}
\`\`\`

URL:
\`\`\`
https?://[^\\s]+
\`\`\`

Date (YYYY-MM-DD):
\`\`\`
[0-9]{4}-[0-9]{2}-[0-9]{2}
\`\`\`

## Meta Characters

. - any character except newline
\\d - digit (0-9)
\\D - non-digit
\\w - word character (a-z, A-Z, 0-9, _)
\\W - non-word character
\\s - whitespace
\\S - non-whitespace
^ - start of string
$ - end of string

Example:
- ^The - matches "The" only at the start
- .$  - matches the last character
- \\d{3}-\\d{4} - matches "123-4567"

## Anchors

^ - matches at the start
$ - matches at the end
\\b - word boundary
\\B - non-word boundary

Examples:
- ^hello - "hello" at the start only
- world$ - "world" at the end only
- \\bhello\\b - "hello" as a whole word, not "helloing"

## Groups

(pattern) - captures a group
(?:pattern) - non-capturing group
| - alternation (or)

Examples:
- (cat|dog) - matches "cat" or "dog"
- (\\d{3}) groups three digits
- colou?r can also be written as colo(u)?r

## Flags

Most regex engines support flags:

- i - case-insensitive
- g - global (find all matches)
- m - multiline (^ and $ match line boundaries)

## Practical Examples

Validate an email:
Pattern: [a-zA-Z0-9._%plus-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}

Extract numbers:
Pattern: \\\\d+

Match HTML tags:
Pattern: <[^>]+>

Match URLs:
Pattern: https?://[a-zA-Z0-9.-]+\\\\.[a-z]{2,}

## Common Mistakes

- Forgetting to escape special characters
- Using . when you mean a literal dot (should be \\\\.)
- Forgetting ^ and $ for full match validation
- Greedy vs non-greedy: .* is greedy, .*? is non-greedy

## Greedy vs Non-Greedy

.*  matches as much as possible
.*? matches as little as possible

Example text: <tag>content</tag>

Greedy: <.*> matches the entire string
Non-greedy: <.*?> matches just <tag> or </tag>

## Tools

DevToolkit has a Regex Tester. Write patterns and test against sample text instantly.

## Learning Tips

1. Start with simple patterns
2. Test as you build
3. Use named groups for clarity
4. Document complex regex
5. Consider simpler solutions first (sometimes split() is better than regex)

## Resources

- Regex101.com - online regex tester with explanations
- MDN - JavaScript regex documentation
- Perl Compatible Regular Expressions (PCRE) - most common syntax

Regex is powerful once you understand the basics. Start simple and build up.
    `,
    relatedTools: [
      { slug: "regex-tester", name: "Regex Tester" },
      { slug: "regex-generator", name: "Regex Generator" },
    ],
    relatedGuides: [],
  },
];

export const GUIDE_MAP = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
