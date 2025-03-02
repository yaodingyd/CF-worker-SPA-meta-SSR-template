import { Hono } from 'hono';

const metadata: Record<string, any> = {
  about: {
    title: 'About us',
    description: 'Learn more about us',
  },
  // more metatdata
};

type Bindings = {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('*', async (c) => {
  const request = c.req;

  const url = new URL(request.url);
  const { origin, pathname } = url;

  let title = metadata[pathname]?.title || 'Default title';
  const description = metadata[pathname]?.description || 'Default description';

  const index = await c.env.ASSETS.fetch(new URL('/', origin).toString());
  const indexHtml = await index.text();

  if (pathname === 'need-fetch-more-data') {
    const res = await fetch(
      `https://some-api.com/sites/${url.searchParams.get('id')}`,
    );
    const site = (await res.json()) as any;
    const { name } = site;
    title = `Site ${name}`;
  }

  const meta = `
<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
`;

  const html = indexHtml.replace('<!-- server rendered meta -->', meta);
  return c.html(html);
});

export default app;
