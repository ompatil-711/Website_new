import { handleApi } from '../server/api.js';

export default async function handler(req, res) {
  req.url = '/api/quote';
  await handleApi(req, res);
}

