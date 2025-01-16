import { Router } from "express";
import authRoute from './../src/authentication/router.js';
import transferRoute from './../src/transfer/router.js';
import verifyToken from './../middleware/index.js';

const router = Router();

router.use('/auth', authRoute)
router.use('/transfer', transferRoute)

export default router;