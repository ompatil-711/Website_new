import { handleApi } from '../../server/api.js';

export default async function handler(req, res) {
  req.url = '/api/auth/verify';
  await handleApi(req, res);
}

