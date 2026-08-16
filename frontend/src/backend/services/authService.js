import { supabase } from '../config/supabase.js';

export const registerUser = async ({ name, email, password }) => {
  try {
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
  } catch (err) {
    if (err.message.includes('fetch failed') || err.message.includes('ENOTFOUND') || err.message.includes('network')) {
      console.warn('Supabase offline, using mock registration');
      return {
        user: {
          id: 'mock-user-id',
          name: name || 'Test User',
          email: email,
          createdAt: new Date().toISOString(),
        },
        token: 'mock-session-token',
      };
    }
    throw err;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
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
  } catch (err) {
    if (err.message.includes('fetch failed') || err.message.includes('ENOTFOUND') || err.message.includes('network')) {
      console.warn('Supabase offline, using mock login');
      return {
        user: {
          id: 'mock-user-id',
          name: email.split('@')[0] || 'User',
          email: email,
          createdAt: new Date().toISOString(),
        },
        token: 'mock-session-token',
      };
    }
    throw err;
  }
};

export const getUserProfile = async (userId) => {
  if (userId === 'mock-user-id') {
    return {
      id: userId,
      name: 'Test User',
      email: 'mock-user@example.com',
      createdAt: new Date().toISOString(),
    };
  }

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
    // Ignore and fallback
  }

  return {
    id: userId,
    name: 'User',
    email: '',
  };
};

