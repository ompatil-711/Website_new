import { handleApi } from '../server/api.js';

export default async function handler(req, res) {
  const handled = await handleApi(req, res);
  if (!handled && !res.writableEnded) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Not found.' }));
  }
}

