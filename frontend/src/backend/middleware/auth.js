import { supabase } from '../config/supabase.js';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      const error = new Error('Authentication token missing');
      error.statusCode = 401;
      throw error;
    }

    const { data: { user }, error: sbError } = await supabase.auth.getUser(token);

    if (sbError || !user) {
      const error = new Error(sbError?.message || 'Invalid or expired token');
      error.statusCode = 401;
      throw error;
    }

    req.user = {
      _id: user.id, // For backwards compatibility with req.user._id
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || 'User',
    };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
