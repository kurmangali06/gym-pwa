import type { IAuth } from 'shared/model/base.dto';
import { supabase } from '../db/workout';

export async function authEmail(body: IAuth) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.email,
  });
  if (data.user)
    return data;
  if (error)
    throw error.message;
}

export async function createUser(body: IAuth) {
  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
  });

  if (data.user)
    return data;
  if (error)
    throw error.message;
}

export async function resetPassword(body: IAuth) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(body.email);

    if (error)
      throw new Error(error.message);

    return data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}
