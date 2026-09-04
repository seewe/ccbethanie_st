import serverless from "serverless-http";
import { createApp } from "../../server/app.js";

const app = createApp();

// Netlify invokes this function for every request matched by the redirect
// rule in netlify.toml (/api/* -> /.netlify/functions/api/:splat).
// serverless-http adapts the Express app to the Lambda-style handler Netlify expects.
export const handler = serverless(app);
