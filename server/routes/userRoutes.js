import express from 'express'
import { getPublishCreations, getUserCreations, toggleLikeCreations } from '../controllers/userContraller.js';
import { auth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations', auth, getUserCreations)
userRouter.get('/get-published-creations', auth, getPublishCreations)
userRouter.post('/toggle-like-creations', auth, toggleLikeCreations)

export default userRouter;