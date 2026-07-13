import { asyncHandler, sendSuccess } from '../utils/apiResponse.js';
import { registerUser, loginUser, getUserProfile } from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  sendSuccess(res, 'User registered successfully', result, 201);
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);
  sendSuccess(res, 'Login successful', result, 200);
});

export const profile = asyncHandler(async (req, res) => {
  const result = await getUserProfile(req.user._id);
  sendSuccess(res, 'Profile fetched successfully', result, 200);
});
