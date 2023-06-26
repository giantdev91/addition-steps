import * as express from 'express';
import * as db from '../../db';

const router = express.Router();

router.get('/', (req, res) => res.json({ok: true}));
router.post('/steps', async (req, res) => res.json({result: await db.steps.saveSteps(req, res)}));
router.get('/steps', async (req, res) => res.json({result: await db.steps.getSteps(req, res)}));
router.post('/generate', async (req, res) => res.json({result: await db.steps.generateSteps(req, res)}));

export default router;