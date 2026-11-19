# BHUMAN FORTUNE

Corporate website built with React, TypeScript, Tailwind CSS, Vite, and Cloudflare Workers. The intended GitHub repository is [bhumanfortune/bhuman](https://github.com/bhumanfortune/bhuman).

## Local development

Use Node.js 22. Run `npm ci`, then `npm run dev` for the frontend. Run `npm run check` and `npm run build` to verify types and prerender the site's pages. For full-stack testing, build first and run `npx wrangler dev`. Use an ignored `.dev.vars` file for local contact credentials.

## Production setup

1. Confirm the legal entity and company details, the privacy contact and retention policy, and the final Privacy Policy and Terms. Update the legal pages and their prerender indexing rules after review.
2. Confirm the site hostname. Set the GitHub production environment variable `SITE_URL` to its HTTPS origin to include canonical URLs, robots.txt, and the sitemap. Add `CLOUDFLARE_ACCOUNT_ID` as an environment variable and `CLOUDFLARE_API_TOKEN` as an environment secret.
3. Configure the `RESEND_API_KEY` and `CONTACT_FROM` Worker secrets using Wrangler. Use a sender from a verified domain. All website inquiries are addressed to `info@bhumanfortune.com`. On a new account, deploy an initial Worker to obtain its URL and configure the secrets before enabling production contact traffic.
4. Run the **Website** workflow manually from `main` in `bhumanfortune/bhuman`, or deploy with `npm run deploy` in an authenticated Cloudflare environment with `SITE_URL` set. Attach the Cloudflare custom domain when DNS is ready.
5. Check the live HTTPS homepage, internal deep links, sitemap, mobile navigation, and delivery of a test inquiry to the monitored inbox.

Contact submissions go to `info@bhumanfortune.com` via Resend. The Worker validates fields, limits request size and request frequency, and checks the request origin. It returns a temporary error when delivery is unconfigured. Configure access and retention for the mailbox and email provider as part of the privacy review.

