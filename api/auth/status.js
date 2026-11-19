import { handleApi } from '../../server/api.js';

export default async function handler(req, res) {
  req.url = '/api/auth/status';
  await handleApi(req, res);
}

