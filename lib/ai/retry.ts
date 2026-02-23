function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithRetry(
  request: () => Promise<Response>,
  retries = 2,
): Promise<Response> {
  let attempt = 0;
  let lastError: unknown;

  while (attempt <= retries) {
    try {
      const response = await request();
      const isTransient = response.status === 429 || response.status >= 500;

      if (!isTransient || attempt === retries) {
        return response;
      }
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        throw error;
      }
    }

    const backoffMs = 300 * 2 ** attempt;
    await sleep(backoffMs);
    attempt += 1;
  }

  if (lastError) {
    throw lastError;
  }

  throw new Error("Unexpected retry flow state.");
}
