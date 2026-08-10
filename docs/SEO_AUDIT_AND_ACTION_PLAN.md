# Tradivex SEO audit and free growth plan

## Audit snapshot

- The public site has a working `robots.txt` and root sitemap.
- Search-facing routes currently include the homepage, market pages, calculators, static tool pages, static blog posts, categories, and regions.
- `/compare`, `/search`, `/submit`, and admin routes are intentionally excluded from indexing because they are utility, private, or parameter-driven pages.
- Calculator slugs are unique. New work must reuse existing calculator routes or pass the duplicate checks before a new slug is accepted.
- The current priority is improving useful pages, not adding another large batch of tools.

## Page priority

### Priority 1: calculator pages

Start with `/calculators/position-size`, `/calculators/risk-reward`, `/calculators/atr-position-size`, `/calculators/options-probability`, `/calculators/options-strategy`, `/calculators/net-trading-cost`, `/calculators/portfolio-risk-allocation`, and `/calculators/us-capital-gains`.

These pages have a clear user task, can work without a login, and now include a method guide, assumptions, FAQs, related calculator links, canonical metadata, and WebApplication/FAQ structured data.

### Priority 2: USA-focused tool pages

Improve existing tool records before adding new ones. Each high-priority page should eventually have a verified provider source, last-checked date, US availability context, account or fee caveats, and a neutral explanation of who the service may fit. Do not invent fees, regulation, ratings, or product availability.

### Priority 3: evergreen guides

Publish one genuinely useful article per week from the draft list below. Each article should answer one search intent, show its sources, link to one calculator, and link to two relevant tool or category pages.

## Search Console interpretation

- Impressions = Google showed a result; clicks = a visitor selected it.
- Impressions with very few clicks usually indicate a title, description, or search-intent mismatch.
- “Crawled - currently not indexed” usually needs a quality, uniqueness, internal-link, or canonical review; submitting the URL repeatedly is not a quality fix.
- “Excluded by noindex” is expected for compare query URLs and private/utility pages. Inspect important calculator, tool, and blog URLs individually instead.
- Submit the root sitemap once and use URL Inspection for the homepage, calculator hub, five priority calculators, five priority tools, and the newest static blog post.

## Weekly free workflow

1. Check Search Console Performance for the last 28 days and record impressions, clicks, CTR, and average position for the priority pages.
2. Improve one page using current provider documentation and add a dated verification note.
3. Publish one original guide or update one existing guide substantially.
4. Add two or three contextual internal links from older pages.
5. Share the page only where it answers a real question; do not buy links, exchange spam links, or ask people to click ads.

## Duplicate prevention

Before adding any content, compare the proposed title, slug, calculator slug, tool slug, and canonical URL against the existing data and generated sitemap. A new item is rejected if any public slug or canonical URL already exists. Existing public IDs are never reused for new tools.
