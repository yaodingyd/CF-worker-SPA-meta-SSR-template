import { Hono } from "hono";

const app = new Hono();

const metadata: Record<string, any> = {
	about: {
		title: 'About Us - Aqualink',
  		description: "Learn about Aqualink's mission, our team, and our efforts in ocean conservation technology.",
	},
	buoy: {
		title: 'Aqualink Smart Buoy | Real-time seafloor &amp; sea surface temperature &amp; sea surface temperature',
  		description: "Aqualink's solar-powered smart buoys collect temperature, wind & wave. Measuring real-time data from seafloor and sea surface. Monitor marine ecosystems."
	},
	drones: {
		title: 'Aqualink Drone | An Autonomous Surface Vehicle',
  		description: "Explore Aqualink's underwater drone technology for ocean conservation, monitoring marine ecosystems to help protect and preserve our oceans.",
	}
}

app.get("*", async (c) => {
	const request=c.req;

	const url = new URL(request.url)
	const firstSegment = url.pathname.split('/').filter(Boolean)[0];
	const id = url.pathname.split('/').filter(Boolean)[1];

	let title = metadata[firstSegment]?.title || "Aqualink"
	let description = metadata[firstSegment]?.description || "Ocean Monitoring"

	if (firstSegment === 'sites') {
		const res = (await fetch(`https://ocean-systems.uc.r.appspot.com/api/sites/${id}`))
		const site = await  res.json() as any;
		title = `Aqualink Site ${site?.name ?? ''}`

	}



	const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<link rel="icon" href="/favicon.ico" />
<meta
name="viewport"
content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
<meta name="theme-color" content="#000000" />
<link rel="apple-touch-icon" href="/logo192.png" />

<link rel="manifest" href="/manifest.json" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:type" content="website" />

<script defer src="/static/js/lib-axios.d936d8c0.js"></script><script defer src="/static/js/lib-react.213c8c75.js"></script><script defer src="/static/js/lib-router.4b21611f.js"></script><script defer src="/static/js/558.30ed97c1.js"></script><script defer src="/static/js/index.ce27c41b.js"></script><link href="/static/css/558.1d3b9e69.css" rel="stylesheet"><link href="/static/css/index.71352fe7.css" rel="stylesheet">

</head>

<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="google_translate_element"></div>
<div id="root"></div>
</body>
</html>
`


	return c.html(html)

});

export default app;
