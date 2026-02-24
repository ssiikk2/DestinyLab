# RUNBOOK

## 1) Local Development

### Prerequisites
- Node.js 20+
- npm 10+

### Setup
```bash
npm install
cp .env.example .env.local
```

### Required env vars for multi-region Azure OpenAI
```env
AZURE_OPENAI_PRIMARY_ENDPOINT=https://<primary-resource>.openai.azure.com
AZURE_OPENAI_SECONDARY_ENDPOINT=https://<secondary-resource>.openai.azure.com
AZURE_OPENAI_API_KEY=<key>
AZURE_OPENAI_DEPLOYMENT_NAME=<gpt-5-mini-deployment>
AZURE_OPENAI_NANO_DEPLOYMENT_NAME=<gpt-5-nano-deployment>
```

### Run app
```bash
npm run dev
```

### Generate SEO content cache
```bash
npm run generate:seo
```

Optional:
```bash
npm run generate:seo -- --keywords="love compatibility calculator,zodiac compatibility chart explained"
npm run generate:seo -- --force
```

## 2) Azure Container Apps Deployment (Single Container)

### Build and push
Use existing script:
```powershell
./infra/deploy-single.ps1 \
  -ResourceGroup "destinylab-rg" \
  -Location "eastus" \
  -AcrName "destinylab12345" \
  -ContainerEnvName "destinylab-env"
```

### Set runtime environment variables
```bash
az containerapp update \
  --name destinylab-main \
  --resource-group destinylab-rg \
  --set-env-vars \
SITE_DOMAIN=https://lovecompatibilitycalculator.com \
ADS_ENABLED=true \
ADSENSE_CLIENT=ca-pub-xxxxxxxx \
AZURE_OPENAI_PRIMARY_ENDPOINT=https://<primary>.openai.azure.com \
AZURE_OPENAI_SECONDARY_ENDPOINT=https://<secondary>.openai.azure.com \
AZURE_OPENAI_API_KEY=<key> \
AZURE_OPENAI_DEPLOYMENT_NAME=<mini-deployment> \
AZURE_OPENAI_NANO_DEPLOYMENT_NAME=<nano-deployment>
```

## 3) Adding AdSense Later

### Start safe
- Keep `ADS_ENABLED=false` in lower environments.
- Use Auto Ads only (no manual ad slots in templates).
- Verify ownership and policy pages before requesting review.

### CLS safety
- Avoid hardcoded empty ad containers.
- Keep layout stable with fixed content blocks and responsive spacing.

## 4) Submitting Sitemap

### Validate routes
- `https://lovecompatibilitycalculator.com/robots.txt`
- `https://lovecompatibilitycalculator.com/sitemap.xml`

### Submit
1. Add domain in Google Search Console and Bing Webmaster Tools.
2. Submit sitemap URL.
3. Monitor crawl/index status for `/blog/*`, `/zodiac/*`, and calculator pages.

## 5) Expanding to 100 Pages

### Content plan
1. Add new high-intent slugs in `content/seo-data.ts`.
2. Keep each page between 800 and 1200 words.
3. Maintain 5+ FAQs and internal link mesh.
4. Pre-generate cache with `npm run generate:seo`.
5. Deploy once pages are validated.

### Internal linking rules
- Blog pages: main calculator + 2 blog posts + 4 zodiac pairs.
- Zodiac pages: main calculator + zodiac hub + 6 pair pages + 2 blog posts.

## 6) Cost Monitoring Strategy

### Model policy
- Default long-form generation: `gpt-5-mini`.
- Short tasks under 900 words: `gpt-5-nano`.
- No heavy models unless explicitly approved.

### Hard controls
- Max output tokens capped in server utility.
- Prompt length trimmed to hard cap.
- Compact system prompts only.
- Filesystem cache enabled (`content/.cache`).
- Skip regeneration if output file exists.

### Tracking
- Generation logs include endpoint, model, and token totals.
- Track:
  - prompt tokens
  - completion tokens
  - total tokens
  - fallback count (primary -> secondary)
  - cache hit rate

### Azure cost guardrails
1. Set Azure budget alerts at 50%, 75%, 90%.
2. Separate mini/nano deployments for clean usage tracking.
3. Monitor 429 events to tune batch size.
4. Keep batch concurrency conservative (default: 3).

