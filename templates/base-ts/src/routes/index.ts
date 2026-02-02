import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Turbo API 🚀' });
});

export default router;
