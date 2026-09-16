import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/token.js';

const router = Router();
const validate = (req, res, next) => { const errors = validationResult(req); return errors.isEmpty() ? next() : res.status(422).json({ message: errors.array()[0].msg }); };
const userPayload = (user) => ({ id: user._id, name: user.name, email: user.email });

router.post('/register', [body('name').trim().isLength({ min: 2, max: 60 }).withMessage('Name must be 2–60 characters.'), body('email').isEmail().normalizeEmail().withMessage('Enter a valid email.'), body('password').isLength({ min: 8, max: 100 }).withMessage('Password must be at least 8 characters.'), validate], async (req, res, next) => {
  try { const existing = await User.findOne({ email: req.body.email }); if (existing) return res.status(409).json({ message: 'An account with this email already exists.' }); const user = await User.create({ name: req.body.name, email: req.body.email, password: await bcrypt.hash(req.body.password, 12) }); res.status(201).json({ token: signToken(user._id), user: userPayload(user) }); } catch (e) { next(e); }
});
router.post('/login', [body('email').isEmail().normalizeEmail().withMessage('Enter a valid email.'), body('password').notEmpty().withMessage('Password is required.'), validate], async (req, res, next) => {
  try { const user = await User.findOne({ email: req.body.email }).select('+password'); if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ message: 'Incorrect email or password.' }); res.json({ token: signToken(user._id), user: userPayload(user) }); } catch (e) { next(e); }
});
export default router;
