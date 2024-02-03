/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler deploy src/index.ts --name my-worker` to deploy your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
	async fetch(request, env, ctx) {
	  const email = request.headers.get('Cf-Access-Authenticated-User-Email') || 'Unknown'; // Fetch email from request header
	  const country = request.cf.country || 'Unknown';
	  const timestamp = new Date().toISOString();
	  const flagURL = `https://bucket.tyungchan.com/${country}.png`; // URL to the flag image in the R2 bucket
  
	  const responseContent = `
		${email} authenticated at ${timestamp} from 
		<a href="${flagURL}">${country}</a>
	  `;
  
	  return new Response(responseContent, {
		headers: { 'content-type': 'text/html;charset=UTF-8' },
	  });
	},
  };
