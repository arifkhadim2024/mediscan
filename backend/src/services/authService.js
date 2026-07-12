import { supabase } from '../config/supabase.js';

export const registerUser = async ({ name, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    const err = new Error(error.message);
    err.statusCode = error.status || 400;
    throw err;
  }

  return {
    user: {
      id: data.user.id,
      name: data.user.user_metadata?.name || name,
      email: data.user.email,
      createdAt: data.user.created_at,
    },
    token: data.session?.access_token || '',
  };
};

export const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const err = new Error(error.message);
    err.statusCode = error.status || 401;
    throw err;
  }

  return {
    user: {
      id: data.user.id,
      name: data.user.user_metadata?.name || 'User',
      email: data.user.email,
      createdAt: data.user.created_at,
    },
    token: data.session?.access_token || '',
  };
};

export const getUserProfile = async (userId) => {
  try {
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userId);
    if (!error && user) {
      return {
        id: user.id,
        name: user.user_metadata?.name || 'User',
        email: user.email,
        createdAt: user.created_at,
      };
    }
  } catch {
    // Ignore and fallback (e.g. if Service Role Key is not configured for auth.admin)
  }

  return {
    id: userId,
    name: 'User',
    email: '',
  };
};
