# Deploy Checklist

Use this before every production deploy.

## Build

- Azure CLI installed and `az login` completed
- `npm install`
- `npm run build`
- `npm run lint`

## Environment

- `SITE_DOMAIN=https://lovecompatibilitycalculator.com`
- `ADS_ENABLED=false` until ad layout is reviewed
- `ADSENSE_CLIENT` set only to the approved publisher id
- `NEXT_PUBLIC_GA_ID` set when analytics should run
- `AZURE_OPENAI_PRIMARY_ENDPOINT` set for meme/spicy upgrades
- `AZURE_OPENAI_API_KEY` set in Azure Container Apps, never committed
- `INDEXNOW_KEY` set only when the key file route is reachable

## SEO

- Open `/robots.txt`
- Open `/sitemap.xml`
- Confirm sitemap does not include redirected legacy URLs
- Confirm footer policy pages are reachable
- Inspect `/calculator`, `/tests`, `/blog`, and one result-sharing URL

## After Deploy

- Confirm the script printed the active image and latest revision
- Submit updated sitemap in Search Console if route count changed
- Use URL Inspection for the top 5 changed pages
- Check the Container Apps revision logs for API errors
- Check GA/Search Console after 24-48 hours
