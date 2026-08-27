# Dev Toolkit Hub

Build a modern, fast, responsive web application called DevToolkit — a free all-in-one toolkit for developers.

The website should provide useful developer utilities, converters, formatters, validators, and generators. The initial MVP should contain exactly the 20 tools listed below.

1. Main Goal

Create a polished developer utility website where users can:

Open a tool

Enter/paste data

Run the conversion/transformation

Copy the result

Clear the input

Use the tool without creating an account

Use the tools for free

The website should feel like a professional developer product, not a generic AI-generated template.

Prioritize:

Speed

Simplicity

Excellent UX

Mobile responsiveness

Clean developer-focused design

Accessibility

SEO-friendly pages

Client-side processing wherever possible

Do NOT add authentication, payments, subscriptions, or unnecessary backend functionality in this MVP.

2. Technology

Use:

React

TypeScript

Tailwind CSS

Modern component architecture

Lucide icons or another clean icon library

Prefer client-side JavaScript/TypeScript implementations for tools that do not require a backend.

Do NOT send user-entered data to a server when the operation can safely be performed entirely in the browser.

Keep the architecture modular so additional tools can easily be added later.

3. Website Structure

Create the following main structure:

Header

Logo:

DevToolkit

Navigation:

Home

Tools

Categories

About

Include a search icon/search box that allows users to search for tools.

On mobile, use a hamburger menu.

4. Homepage

Create an attractive developer-focused homepage.

Hero section:

Developer Tools. All in One Place.

Subtitle:

"Free, fast and privacy-friendly tools for developers. Format, convert, encode, validate and generate — directly in your browser."

Primary CTA:

Explore Tools

Secondary CTA:

Search Tools

Below the hero, show popular tools.

Example cards:

JSON Formatter

JSON Validator

JSON → YAML

Base64 Encoder / Decoder

JWT Decoder

Regex Tester

SQL Formatter

Cron Generator

Then show categories.

Categories

Converters
Formatters
Security
Developer Utilities
Web Tools

Then show:

Why DevToolkit?

Cards:

Free
All core tools are free to use.

Fast
Most tools run entirely in your browser.

Privacy Friendly
Your data stays in your browser whenever possible.

No Signup
Start using tools immediately.

5. Tools Page

Create /tools.

Display all 20 tools in a searchable/filterable grid.

Each tool card should contain:

Icon

Tool name

Short description

Category

"Open Tool" button

Add:

Search

Example:

"Search tools..."

Category filters

All

Converters

Formatters

Security

Developer Utilities

Web Tools

6. Individual Tool Pages

Every tool should have its own URL.

Use routes similar to:

/tools/json-formatter
/tools/json-validator
/tools/json-to-yaml
/tools/yaml-to-json
/tools/json-to-csv
/tools/csv-to-json
/tools/base64
/tools/url-encoder
/tools/timestamp-converter
/tools/bytes-converter
/tools/jwt-decoder
/tools/uuid-generator
/tools/regex-tester
/tools/cron-generator
/tools/sql-formatter
/tools/text-diff
/tools/http-status-codes
/tools/mime-types
/tools/curl-generator
/tools/query-string-parser

Each page should have:

Breadcrumb

Tool title

Short description

Tool interface

Copy button

Clear/reset button

Error handling

Helpful usage information

FAQ section

Related tools

Example:

Home → Tools → JSON Formatter

JSON Formatter

"Format, beautify and validate JSON online for free."

Then the actual tool.

7. TOOL #1 — JSON Formatter

Create a professional JSON editor interface.

Input:

Large textarea/editor.

Buttons:

Format

Minify

Validate

Copy

Clear

Example input:

{"name":"John","age":25,"skills":["Python","AWS"]}

Formatted output should become properly indented JSON.

Display meaningful errors for invalid JSON.

Example:

"Invalid JSON: Unexpected token at line 3, column 12."

Everything should happen client-side.

8. TOOL #2 — JSON Validator

Input:

Large JSON textarea.

Button:

Validate JSON

Output:

If valid:

✓ Valid JSON

If invalid:

✕ Invalid JSON

Show useful error information including line/column when possible.

Add buttons:

Copy

Clear

9. TOOL #3 — JSON → YAML

Input:

JSON textarea.

Button:

Convert to YAML

Output:

YAML result.

Buttons:

Copy

Download

Clear

Handle invalid JSON gracefully.

Perform conversion client-side.

10. TOOL #4 — YAML → JSON

Input:

YAML textarea.

Button:

Convert to JSON

Output:

Formatted JSON.

Buttons:

Copy

Download

Clear

Show useful parsing errors.

11. TOOL #5 — JSON → CSV

Input:

JSON textarea.

Support arrays of objects.

Example:

[
{"name":"John","age":25},
{"name":"Jane","age":30}
]

Output:

CSV format.

Buttons:

Copy

Download CSV

Clear

Handle inconsistent object structures gracefully.

12. TOOL #6 — CSV → JSON

Input:

CSV textarea.

Button:

Convert to JSON

Allow users to configure:

Has header row

Delimiter

Output formatted JSON.

Buttons:

Copy

Download

Clear

13. TOOL #7 — Base64 Encoder / Decoder

Create tabs:

Encode
Decode

Encode:

Text → Base64

Decode:

Base64 → Text

Buttons:

Copy

Clear

Show errors for invalid Base64.

Keep processing client-side.

14. TOOL #8 — URL Encoder / Decoder

Create tabs:

Encode URL
Decode URL

Examples:

Encode:

hello world → hello%20world

Decode:

hello%20world → hello world

Buttons:

Copy

Clear

15. TOOL #9 — Timestamp Converter

Create a two-way converter.

Unix Timestamp → Date

Input:

1712345678

Output:

Local date/time

UTC date/time

ISO 8601

Date → Unix Timestamp

Allow users to select date/time.

Support:

Seconds

Milliseconds

Include a button:

Use Current Timestamp

Display the current Unix timestamp.

16. TOOL #10 — Bytes Converter

Create a conversion calculator.

Input:

Number

Unit dropdown:

Bytes

KB

MB

GB

TB

Output all equivalent values.

Example:

1 GB

1024 MB
1,048,576 KB
1,073,741,824 Bytes

Allow decimal/base-10 and binary/base-2 modes.

17. TOOL #11 — JWT Decoder

Create a JWT decoder.

Input:

JWT token

Output:

Header

Formatted JSON

Payload

Formatted JSON

Signature

Display signature information but DO NOT claim to verify the signature unless an actual verification mechanism and key are provided.

Clearly show:

"Decoded locally in your browser. Do not paste sensitive production tokens."

Do not store tokens.

Add:

Copy buttons for Header and Payload.

18. TOOL #12 — UUID Generator

Create a UUID generator.

Default:

UUID v4

Buttons:

Generate UUID

Generate 5

Copy

Clear

Allow users to generate multiple UUIDs.

Display results in a clean list.

19. TOOL #13 — Regex Tester

Create a regex testing interface.

Fields:

Regex pattern

Flags:

g

i

m

s

u

Test string textarea.

Output:

Match count

Matched text

Match positions

Capturing groups

Highlight matches if practical.

Show useful regex errors.

Add a small section:

"Common Regex Examples"

Examples:

Email
URL
Numbers
Phone number
Whitespace

20. TOOL #14 — Cron Expression Generator

Create a visual cron builder.

Fields:

Minute
Hour
Day of Month
Month
Day of Week

Allow options such as:

Every minute
Every hour
Every day
Every week
Every month

Generate the cron expression.

Example:

0 0 * * *

Display:

"Runs every day at midnight."

Include:

Copy Cron

Also add a reverse mode:

Cron Expression → Human-readable explanation.

21. TOOL #15 — SQL Formatter

Create a SQL formatting tool.

Input:

SQL textarea.

Buttons:

Format SQL

Minify SQL

Copy

Clear

Support common SQL syntax including:

SELECT
FROM
WHERE
JOIN
GROUP BY
ORDER BY
INSERT
UPDATE
DELETE

Make the formatting readable and professional.

Do not execute SQL.

Do not connect to any database.

22. TOOL #16 — Text Diff Checker

Create a side-by-side comparison tool.

Left:

Original Text

Right:

Modified Text

Button:

Compare

Output should highlight:

Added lines

Removed lines

Changed lines

Include:

Copy result

Clear

Swap inputs

Make it useful for comparing code, configuration files and plain text.

23. TOOL #17 — HTTP Status Code Lookup

Create a searchable HTTP status code reference.

Categories:

1xx Informational
2xx Success
3xx Redirection
4xx Client Error
5xx Server Error

Examples:

200 OK
201 Created
204 No Content
301 Moved Permanently
302 Found
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
408 Request Timeout
409 Conflict
429 Too Many Requests
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout

Allow users to search by:

Code

Name

Description

Clicking a status code should show detailed information.

24. TOOL #18 — MIME Type Lookup

Create a searchable MIME type database.

Examples:

application/json
text/html
text/css
application/javascript
image/png
image/jpeg
image/svg+xml
application/pdf
application/zip

Allow searching by:

File extension

MIME type

Example:

Input:

.json

Output:

application/json

Include common file extensions.

25. TOOL #19 — cURL Generator

Create a simple API request builder.

Fields:

HTTP method:

GET

POST

PUT

PATCH

DELETE

URL

Headers

Request body

Generate:

cURL

Example:

curl -X POST "https://example.com/api"
-H "Content-Type: application/json"
-d '{"name":"John"}'

Also generate optional code snippets:

Python requests

JavaScript fetch

Buttons:

Copy

Clear

Do not actually execute the request.

26. TOOL #20 — Query String Parser

Input:

URL or query string.

Example:

https://example.com/products?page=2&category=books&sort=price

Output a table:

ParameterValuepage2categorybookssortprice

Allow:

Add parameter

Remove parameter

Edit parameter

Copy query string

Generate updated URL

Support URL encoding/decoding.

27. Global Tool UX

Every tool should consistently have:

Clear input button

Copy output button

Download button when appropriate

Error messages

Success messages

Loading states where necessary

Keyboard-friendly interactions

Responsive layout

When users click Copy, show:

"Copied!"

Do not use annoying popup alerts.

28. Design

Use a modern developer aesthetic.

Prefer:

Dark/light mode

Clean typography

Monospace font for code

Subtle borders

Rounded cards

Minimal animations

Good whitespace

Professional icons

Do NOT make it overly colorful.

The website should feel similar in quality to professional developer platforms.

Use a clean dark theme as the default, with a light/dark mode toggle.

29. Responsive Design

The website must work well on:

Desktop

Laptop

Tablet

Mobile

Tool interfaces should adapt properly to small screens.

For example, side-by-side diff editors should become vertically stacked on mobile.

30. SEO

This is very important.

Each tool must have:

Unique page title

Meta description

SEO-friendly URL

H1

Proper H2 sections

Descriptive content

FAQ section

Related tools

Structured internal linking

Example title:

"JSON Formatter & Validator Online – Free | DevToolkit"

Example description:

"Format, beautify and validate JSON online for free. Fast, private and easy-to-use JSON formatter that runs directly in your browser."

Create SEO-friendly content for every tool page.

Do not generate meaningless filler text.

31. Advertising Preparation

Do NOT integrate advertisements yet.

However, design the layout so advertisements can later be inserted naturally.

Reserve a non-intrusive area between:

Tool interface

and

Educational content

Example:

[ Tool ]

ADVERTISEMENT SPACE

[ About this tool ]

Do not place ads inside the input/output areas.

The eventual monetization model will be:

Free tools + advertising.

32. Privacy

Add a simple Privacy page.

Explain that most tools process data locally in the browser and that DevToolkit does not intentionally store user input for client-side tools.

Do not make claims that cannot technically be guaranteed.

For tools involving sensitive data such as JWT decoding, explicitly warn users not to paste secrets or production credentials.

33. About Page

Create an About page explaining:

"DevToolkit is a free collection of fast, simple and privacy-conscious tools designed to make everyday developer tasks easier."

Mention that the project is focused on useful utilities for developers.

34. Footer

Include:

DevToolkit

Free Developer Tools

Links:

Home

Tools

Categories

About

Privacy

Terms

Copyright:

© 2026 DevToolkit

35. Architecture Requirements

Create reusable components.

For example:

components/
Header
Footer
ToolCard
ToolLayout
CodeEditor
CopyButton
ClearButton
SearchBar
CategoryFilter
FAQ
AdPlaceholder

Create reusable utilities where appropriate.

Do not duplicate large amounts of code between tools.

Make it easy to add a 21st, 22nd, 50th or 100th tool later.

36. Important Performance Requirement

Where possible:

Perform conversions locally

Avoid unnecessary API calls

Avoid unnecessary dependencies

Lazy-load tool pages if appropriate

Keep initial bundle size reasonable

Avoid tracking scripts for now

The basic tools should work even without an external API.

37. Important Security Requirement

Never execute arbitrary user-provided code.

Do not use eval() for user input.

Do not execute SQL.

Do not execute shell commands.

Do not send JWTs, passwords, API keys or other sensitive data to external services.

Sanitize user-generated content before rendering it as HTML.

38. Final Requirement

Build the application completely rather than creating mockups.

All 20 tools should be functional.

Do not leave buttons as placeholders.

Do not create fake results.

Do not add unnecessary features.

Focus on making these 20 tools extremely polished.

The architecture should make it easy to expand the website to 50–100+ developer tools in the future.

Before finishing, verify that:

All 20 routes work

All tools function correctly

Copy buttons work

Clear buttons work

Error handling works

Mobile layout works

Dark/light mode works

Navigation works

Search works

Category filters work

No broken links exist

No console errors exist

The website is production-quality

The final result should look like a real developer product that could be launched publicly, not a prototype.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/42ddb25b-4c53-4a88-ae39-50d4d4b54e1d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
