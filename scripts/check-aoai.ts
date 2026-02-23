import { generateTextWithAzureMultiRegion } from "../lib/server/azure-openai-multi-region";

function requiredEnvMissing(): string[] {
  const required = [
    "AZURE_OPENAI_PRIMARY_ENDPOINT",
    "AZURE_OPENAI_API_KEY",
    "AZURE_OPENAI_DEPLOYMENT_NAME",
  ];

  return required.filter((name) => !process.env[name]);
}

async function runCheck(model: "gpt-5-mini" | "gpt-5-nano", forceRefresh: boolean) {
  const result = await generateTextWithAzureMultiRegion({
    prompt: "Return compact JSON: {\"status\":\"ok\",\"message\":\"aoai-check\"}",
    systemPrompt: "Return JSON only.",
    model,
    maxOutputTokens: 180,
    jsonMode: true,
    cacheNamespace: "aoai-health-check",
    forceRefresh,
  });

  return result;
}

async function main() {
  const forceRefresh = process.argv.includes("--force-refresh");
  const missing = requiredEnvMissing();

  if (missing.length > 0) {
    console.error("Missing required AOAI env vars:");
    for (const name of missing) {
      console.error(`- ${name}`);
    }
    process.exit(1);
  }

  console.log("Running Azure OpenAI connectivity check...");

  const mini = await runCheck("gpt-5-mini", forceRefresh);
  const nano = await runCheck("gpt-5-nano", forceRefresh);
  const miniCached = await runCheck("gpt-5-mini", false);

  console.log("\nAOAI Check Summary");
  console.log(`mini endpoint : ${mini.endpointUsed}`);
  console.log(`mini tokens   : ${mini.usage.totalTokens}`);
  console.log(`nano endpoint : ${nano.endpointUsed}`);
  console.log(`nano tokens   : ${nano.usage.totalTokens}`);
  console.log(`mini cached   : ${miniCached.cached}`);

  if (mini.endpointUsed !== nano.endpointUsed) {
    console.log("note          : different endpoints observed between checks");
  }

  console.log("status        : ok");
}

main().catch((error) => {
  console.error("AOAI check failed:", error);
  process.exit(1);
});
