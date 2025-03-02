# CF worker SPA metadata edge rendering template

If you want to improve your single-page-application(SPA)'s SEO and have metadata dynamically rendered per page, you might not need to drastically change the application architecture so you can do full Server-Side-Render(SSR) or use Static-Site-Generation(SSG) for every page of your page. Either way will incur a large technical toll, making the application more difficult to develop or build. Instead, you could take advantage of Cloudflare worker and keep the SPA, only use edge rendering to dynamically change the metadata.

This repo is a template to mostly demonstrate how to achieve this. We only have one function inside worker to serve all static assets. It will try to update the metadata in `index.html` and then serve to client.
