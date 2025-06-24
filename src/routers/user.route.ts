import { Router } from 'express';
import { getAll, getById, create } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares';
import { validateInputMiddleware } from '../middlewares/validateInputMiddleware';

const router = Router();

router.get('/', authMiddleware, getAll);
router.get('/:id', validateInputMiddleware, authMiddleware, getById);
router.post('/', validateInputMiddleware, authMiddleware, create);

export default router;
