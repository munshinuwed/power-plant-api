import { Router, Request, Response } from 'express';
import { getTopPlants, getAllStates } from './controller';
const router = Router();


router.get('/', getTopPlants);

router.get('/states', getAllStates);

export default router;
