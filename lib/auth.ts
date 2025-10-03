import { supabaseClient } from "./supabaseClient";

export function signUpWithEmail({
  email,
  password,
  username,
  redirectTo,
}: {
  email: string;
  password: string;
  username?: string;
  redirectTo?: string;
}) {
  return supabaseClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: username ? { username } : undefined,
    },
  });
}

export function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
}

export function signOut() {
  return supabaseClient.auth.signOut();
}
