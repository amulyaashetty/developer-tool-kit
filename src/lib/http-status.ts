export interface StatusCode {
  code: number;
  name: string;
  description: string;
  detail: string;
}

export const HTTP_STATUS_CODES: StatusCode[] = [
  {
    code: 100,
    name: "Continue",
    description: "The client should continue with its request.",
    detail:
      "Sent when a client includes Expect: 100-continue and the server is willing to accept the request body.",
  },
  {
    code: 101,
    name: "Switching Protocols",
    description: "The server is switching protocols as requested.",
    detail:
      "Used for protocol upgrades, most commonly the handshake that turns an HTTP connection into a WebSocket.",
  },
  {
    code: 103,
    name: "Early Hints",
    description: "Preliminary response with hint headers.",
    detail:
      "Lets the server send Link headers for preloading while the final response is still being generated.",
  },
  {
    code: 200,
    name: "OK",
    description: "The request succeeded.",
    detail:
      "The default success status. For GET the body is the resource; for POST it is the result of the action.",
  },
  {
    code: 201,
    name: "Created",
    description: "A new resource was created.",
    detail:
      "Return after a successful POST or PUT that creates a resource, with a Location header pointing at it.",
  },
  {
    code: 202,
    name: "Accepted",
    description: "The request was accepted for processing.",
    detail:
      "Useful for asynchronous work: processing has not completed and may not ultimately succeed.",
  },
  {
    code: 204,
    name: "No Content",
    description: "Success, but there is no body to return.",
    detail:
      "Common for DELETE and for PUT requests where the client already has the resulting state.",
  },
  {
    code: 206,
    name: "Partial Content",
    description: "Partial resource delivered.",
    detail: "Response to a Range request, used for resumable downloads and media streaming.",
  },
  {
    code: 301,
    name: "Moved Permanently",
    description: "The resource has a new permanent URL.",
    detail:
      "Cached aggressively by browsers and honoured by search engines. Use for permanent URL changes only.",
  },
  {
    code: 302,
    name: "Found",
    description: "The resource is temporarily at a different URL.",
    detail: "The client should keep using the original URL for future requests.",
  },
  {
    code: 303,
    name: "See Other",
    description: "Retrieve the result with a GET at another URL.",
    detail: "Implements the post/redirect/get pattern so a refresh does not resubmit the form.",
  },
  {
    code: 304,
    name: "Not Modified",
    description: "The cached copy is still valid.",
    detail:
      "Sent for conditional requests using If-None-Match or If-Modified-Since. Carries no body.",
  },
  {
    code: 307,
    name: "Temporary Redirect",
    description: "Temporary redirect preserving the method.",
    detail: "Like 302 but the client must not change POST into GET.",
  },
  {
    code: 308,
    name: "Permanent Redirect",
    description: "Permanent redirect preserving the method.",
    detail: "Like 301 but the request method and body are preserved.",
  },
  {
    code: 400,
    name: "Bad Request",
    description: "The server cannot process the malformed request.",
    detail: "Use for syntax problems such as invalid JSON or a missing required parameter.",
  },
  {
    code: 401,
    name: "Unauthorized",
    description: "Authentication is required or has failed.",
    detail:
      "Really means unauthenticated. Include a WWW-Authenticate header describing the expected scheme.",
  },
  {
    code: 402,
    name: "Payment Required",
    description: "Reserved for payment-related responses.",
    detail: "Increasingly used by APIs to signal an exhausted quota or an unpaid subscription.",
  },
  {
    code: 403,
    name: "Forbidden",
    description: "The server understood but refuses to authorise.",
    detail: "The caller is authenticated but lacks permission. Re-authenticating will not help.",
  },
  {
    code: 404,
    name: "Not Found",
    description: "The resource does not exist.",
    detail: "Also used deliberately to hide the existence of a resource from unauthorised callers.",
  },
  {
    code: 405,
    name: "Method Not Allowed",
    description: "The HTTP method is not supported here.",
    detail: "The response must include an Allow header listing the supported methods.",
  },
  {
    code: 408,
    name: "Request Timeout",
    description: "The client took too long to send the request.",
    detail: "The server closed an idle connection while waiting for the request to arrive.",
  },
  {
    code: 409,
    name: "Conflict",
    description: "The request conflicts with the current state.",
    detail:
      "Typical for duplicate unique values or an edit based on a stale version of the resource.",
  },
  {
    code: 410,
    name: "Gone",
    description: "The resource was intentionally removed.",
    detail: "Stronger than 404: the resource existed and will not come back.",
  },
  {
    code: 415,
    name: "Unsupported Media Type",
    description: "The payload format is not supported.",
    detail: "Returned when the Content-Type of the request body is not one the endpoint accepts.",
  },
  {
    code: 418,
    name: "I'm a teapot",
    description: "The server refuses to brew coffee.",
    detail: "An April Fools' joke from RFC 2324 that survives in many frameworks.",
  },
  {
    code: 422,
    name: "Unprocessable Content",
    description: "Semantically invalid request.",
    detail:
      "The syntax is valid but validation failed, for example an email field that is not an email.",
  },
  {
    code: 429,
    name: "Too Many Requests",
    description: "The client has been rate limited.",
    detail: "Include a Retry-After header so clients know when they may try again.",
  },
  {
    code: 500,
    name: "Internal Server Error",
    description: "An unexpected server error occurred.",
    detail:
      "The generic catch-all. Log the details server side and return an opaque message to the client.",
  },
  {
    code: 501,
    name: "Not Implemented",
    description: "The server does not support the functionality.",
    detail:
      "Used when the method is unrecognised by the server rather than merely disallowed here.",
  },
  {
    code: 502,
    name: "Bad Gateway",
    description: "An upstream server returned an invalid response.",
    detail:
      "Typical when a proxy or load balancer cannot get a valid answer from the application behind it.",
  },
  {
    code: 503,
    name: "Service Unavailable",
    description: "The service is temporarily unavailable.",
    detail: "Used during maintenance or overload. Add Retry-After to signal when to come back.",
  },
  {
    code: 504,
    name: "Gateway Timeout",
    description: "An upstream server did not respond in time.",
    detail: "The proxy gave up waiting for the origin server to answer.",
  },
  {
    code: 507,
    name: "Insufficient Storage",
    description: "The server cannot store the representation.",
    detail: "A WebDAV status indicating the server has run out of space to complete the request.",
  },
];

export function statusClass(code: number): string {
  const first = Math.floor(code / 100);
  return (
    {
      1: "1xx Informational",
      2: "2xx Success",
      3: "3xx Redirection",
      4: "4xx Client Error",
      5: "5xx Server Error",
    }[first] ?? "Unknown"
  );
}
