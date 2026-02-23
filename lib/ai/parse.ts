function stripCodeFence(input: string): string {
  return input
    .replace(/^```json\s*/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();
}

function extractJsonText(input: string): string {
  const stripped = stripCodeFence(input);
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");

  if (start >= 0 && end > start) {
    return stripped.slice(start, end + 1);
  }

  return stripped;
}

export function parseOrThrowJson<T>(raw: string, providerName: string): T {
  try {
    const normalized = extractJsonText(raw);
    return JSON.parse(normalized) as T;
  } catch {
    const preview = raw.slice(0, 200).replace(/\s+/g, " ");
    throw new Error(
      `[${providerName}] Failed to parse JSON response. Preview: ${preview}`,
    );
  }
}
