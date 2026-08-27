import type { ComponentType } from "react";
import { JsonFormatterTool } from "./json-formatter";
import { JsonValidatorTool } from "./json-validator";
import { JsonToYamlTool } from "./json-to-yaml";
import { YamlToJsonTool } from "./yaml-to-json";
import { JsonToCsvTool } from "./json-to-csv";
import { CsvToJsonTool } from "./csv-to-json";
import { Base64Tool } from "./base64";
import { UrlEncoderTool } from "./url-encoder";
import { TimestampConverterTool } from "./timestamp-converter";
import { BytesConverterTool } from "./bytes-converter";
import { JwtDecoderTool } from "./jwt-decoder";
import { UuidGeneratorTool } from "./uuid-generator";
import { RegexTesterTool } from "./regex-tester";
import { CronGeneratorTool } from "./cron-generator";
import { SqlFormatterTool } from "./sql-formatter";
import { TextDiffTool } from "./text-diff";
import { HttpStatusCodesTool } from "./http-status-codes";
import { MimeTypesTool } from "./mime-types";
import { CurlGeneratorTool } from "./curl-generator";
import { QueryStringParserTool } from "./query-string-parser";

export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "json-formatter": JsonFormatterTool,
  "json-validator": JsonValidatorTool,
  "json-to-yaml": JsonToYamlTool,
  "yaml-to-json": YamlToJsonTool,
  "json-to-csv": JsonToCsvTool,
  "csv-to-json": CsvToJsonTool,
  base64: Base64Tool,
  "url-encoder": UrlEncoderTool,
  "timestamp-converter": TimestampConverterTool,
  "bytes-converter": BytesConverterTool,
  "jwt-decoder": JwtDecoderTool,
  "uuid-generator": UuidGeneratorTool,
  "regex-tester": RegexTesterTool,
  "cron-generator": CronGeneratorTool,
  "sql-formatter": SqlFormatterTool,
  "text-diff": TextDiffTool,
  "http-status-codes": HttpStatusCodesTool,
  "mime-types": MimeTypesTool,
  "curl-generator": CurlGeneratorTool,
  "query-string-parser": QueryStringParserTool,
};
