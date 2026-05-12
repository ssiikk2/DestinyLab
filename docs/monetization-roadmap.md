# DestinyLab Monetization Roadmap

This project should grow as a small entertainment utility first, then as a content and sharing loop. Do not scale thin pages before the core pages earn impressions and clicks.

## Current Signal

- Google Search Console shows early discovery, not product-market fit yet.
- Sitemap discovery is working.
- Indexed pages are still low compared with submitted URLs.
- The best near-term opportunity is improving a small group of high-intent calculator pages.

## Phase 1: Stabilize

Goal: make the site clean enough for Google, AdSense review, and repeat users.

- Keep `ADS_ENABLED=false` until layout and policy checks are complete.
- Use canonical URLs in internal links; avoid linking to redirected legacy paths.
- Keep the sitemap focused on pages with real value.
- Make every core tool page useful without needing AI calls.
- Verify `npm run build` before every deploy.

Core pages to protect:

- `/`
- `/calculator`
- `/love-percentage`
- `/love-calculator-by-name`
- `/name-compatibility`
- `/zodiac-compatibility`
- `/birthday-compatibility`
- `/crush-calculator`
- `/true-love-test`
- `/couple-test`
- `/blog/how-love-calculators-work`

## Phase 2: Improve Click Value

Goal: turn impressions into clicks and on-page engagement.

- Rewrite titles around exact search intent, not generic romance wording.
- Add clearer above-the-fold result examples on calculator pages.
- Keep score explanations specific: high score, medium score, low score, what to do next.
- Add internal links from every result to one meaning guide and two related tests.
- Track share clicks, compare actions, result image downloads, and guide clicks.

## Phase 3: Build The Sharing Loop

Goal: reduce dependence on search traffic alone.

- Make result cards more visual and optimized for Pinterest/TikTok/Instagram sharing.
- Add a result image endpoint later so shared cards have stable social previews.
- Encourage comparisons: crush, ex, best friend, partner, zodiac sign.
- Keep the tone playful and safe for general audiences.

## Phase 4: Monetize

Start with AdSense only after the site has stable indexed pages and clean policies.

AdSense:

- Use Auto Ads first.
- Avoid aggressive above-the-fold ads.
- Keep policy pages visible in the footer.
- Review CLS after enabling ads.

Later premium ideas:

- Detailed couple report.
- Monthly relationship check-in report.
- Downloadable compatibility PDF.
- Premium AI interpretation for saved results.

## Weekly Operating Loop

1. Check Search Console queries and pages.
2. Pick 3 pages with impressions but low CTR.
3. Improve title, meta description, intro, and result example.
4. Submit updated URLs through URL inspection or IndexNow.
5. Wait at least 7-14 days before judging the effect.
