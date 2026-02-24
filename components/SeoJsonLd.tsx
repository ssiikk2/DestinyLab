interface SeoJsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

function safeJson(value: Record<string, unknown> | Array<Record<string, unknown>>): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function SeoJsonLd({ schema }: SeoJsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(schema) }} />;
}
