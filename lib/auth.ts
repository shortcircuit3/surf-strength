import crypto from "crypto";
import { query, queryOne } from "./db";

// Configuration
const SESSION_EXPIRY_DAYS = 30;
const MAGIC_LINK_EXPIRY_MINUTES = 15;
const MAX_SESSIONS_PER_USER = 3;

interface Session {
  id: number;
  user_id: number;
  token: string;
  device_info: string | null;
  ip_address: string | null;
  created_at: Date;
  last_seen_at: Date;
  expires_at: Date;
}

interface MagicLink {
  id: number;
  email: string;
  token: string;
  created_at: Date;
  expires_at: Date;
  used_at: Date | null;
}

interface User {
  id: number;
  email: string;
  stripe_customer_id: string | null;
  paid_at: Date;
}

/**
 * Generate a cryptographically secure random token
 */
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create a magic link token for email verification
 */
export async function createMagicLink(email: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(
    Date.now() + MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000
  );

  // Delete any existing unused magic links for this email
  await query(
    "DELETE FROM magic_links WHERE LOWER(email) = LOWER($1) AND used_at IS NULL",
    [email]
  );

  // Create new magic link
  await query(
    `INSERT INTO magic_links (email, token, expires_at)
     VALUES ($1, $2, $3)`,
    [email.toLowerCase(), token, expiresAt]
  );

  return token;
}

/**
 * Verify a magic link token and mark it as used
 */
export async function verifyMagicLink(token: string): Promise<string | null> {
  const magicLink = await queryOne<MagicLink>(
    `SELECT * FROM magic_links 
     WHERE token = $1 
       AND used_at IS NULL 
       AND expires_at > NOW()`,
    [token]
  );

  if (!magicLink) {
    return null;
  }

  // Mark as used
  await query("UPDATE magic_links SET used_at = NOW() WHERE id = $1", [
    magicLink.id,
  ]);

  return magicLink.email;
}

/**
 * Create a new session for a user, enforcing session limits
 */
export async function createSession(
  email: string,
  deviceInfo?: string,
  ipAddress?: string
): Promise<string | null> {
  // Get user
  const user = await queryOne<User>(
    "SELECT id, email FROM users WHERE LOWER(email) = LOWER($1)",
    [email]
  );

  if (!user) {
    return null;
  }

  // Clean up expired sessions
  await query("DELETE FROM sessions WHERE expires_at < NOW()");

  // Get current session count for user
  const sessions = await query<Session>(
    "SELECT * FROM sessions WHERE user_id = $1 ORDER BY last_seen_at DESC",
    [user.id]
  );

  // If at limit, remove oldest session(s)
  if (sessions.length >= MAX_SESSIONS_PER_USER) {
    const sessionsToRemove = sessions.slice(MAX_SESSIONS_PER_USER - 1);
    for (const session of sessionsToRemove) {
      await query("DELETE FROM sessions WHERE id = $1", [session.id]);
    }
  }

  // Create new session
  const token = generateToken();
  const expiresAt = new Date(
    Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  );

  await query(
    `INSERT INTO sessions (user_id, token, device_info, ip_address, expires_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [user.id, token, deviceInfo || null, ipAddress || null, expiresAt]
  );

  return token;
}

/**
 * Validate a session token and return user info
 */
export async function validateSession(token: string): Promise<{
  userId: number;
  email: string;
  paidAt: Date;
} | null> {
  const result = await queryOne<{
    user_id: number;
    email: string;
    paid_at: Date;
    session_id: number;
  }>(
    `SELECT s.id as session_id, s.user_id, u.email, u.paid_at
     FROM sessions s
     JOIN users u ON s.user_id = u.id
     WHERE s.token = $1 AND s.expires_at > NOW()`,
    [token]
  );

  if (!result) {
    return null;
  }

  // Update last_seen_at (don't await, fire and forget for performance)
  query("UPDATE sessions SET last_seen_at = NOW() WHERE id = $1", [
    result.session_id,
  ]).catch(console.error);

  return {
    userId: result.user_id,
    email: result.email,
    paidAt: result.paid_at,
  };
}

/**
 * Invalidate a session (logout)
 */
export async function invalidateSession(token: string): Promise<void> {
  await query("DELETE FROM sessions WHERE token = $1", [token]);
}

/**
 * Invalidate all sessions for a user (logout everywhere)
 */
export async function invalidateAllSessions(userId: number): Promise<void> {
  await query("DELETE FROM sessions WHERE user_id = $1", [userId]);
}

/**
 * Get active sessions for a user
 */
export async function getUserSessions(userId: number): Promise<
  Array<{
    id: number;
    deviceInfo: string | null;
    ipAddress: string | null;
    createdAt: Date;
    lastSeenAt: Date;
    isCurrent?: boolean;
  }>
> {
  const sessions = await query<Session>(
    `SELECT * FROM sessions 
     WHERE user_id = $1 AND expires_at > NOW()
     ORDER BY last_seen_at DESC`,
    [userId]
  );

  return sessions.map((s) => ({
    id: s.id,
    deviceInfo: s.device_info,
    ipAddress: s.ip_address,
    createdAt: s.created_at,
    lastSeenAt: s.last_seen_at,
  }));
}

/**
 * Clean up expired magic links and sessions (call periodically)
 */
export async function cleanupExpiredTokens(): Promise<void> {
  await query("DELETE FROM magic_links WHERE expires_at < NOW()");
  await query("DELETE FROM sessions WHERE expires_at < NOW()");
}

/**
 * Check rate limiting for magic link requests
 * Returns true if the request should be allowed
 */
export async function checkMagicLinkRateLimit(email: string): Promise<boolean> {
  // Check if there's been a magic link sent in the last 60 seconds
  const recentLink = await queryOne<MagicLink>(
    `SELECT * FROM magic_links 
     WHERE LOWER(email) = LOWER($1) 
       AND created_at > NOW() - INTERVAL '60 seconds'`,
    [email]
  );

  return recentLink === null;
}
