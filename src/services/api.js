import { supabase } from "./supabase";
import { getMatchById } from "../data/matches";

export async function getStreamUrl(matchId) {
  const match = getMatchById(matchId);
  if (match?.streamUrl) return match.streamUrl;
  return null;
}

export async function registerUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function verifyOtp(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });
  if (error) throw error;
  return data;
}

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

/* ═══════════════════════════════════════════════
   Standings & Top Scorers — fetched from Supabase
   ═══════════════════════════════════════════════ */

/**
 * Fetch league standings from the `standings` table.
 * @param {string} leagueId — e.g. "premier-league"
 * @returns {Array} rows sorted by position
 */
export async function getStandings(leagueId) {
  const { data, error } = await supabase
    .from("standings")
    .select("*")
    .eq("league_id", leagueId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch top scorers from the `top_scorers` table.
 * @param {string} leagueId — e.g. "premier-league"
 * @returns {Array} rows sorted by position
 */
export async function getTopScorers(leagueId) {
  const { data, error } = await supabase
    .from("top_scorers")
    .select("*")
    .eq("league_id", leagueId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data || [];
}