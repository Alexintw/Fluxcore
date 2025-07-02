import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /health
 * 回傳 HTTP 200
 */
router.get('/health', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
