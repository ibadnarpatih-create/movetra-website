import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

export type AdminRole = 'administrator' | 'editor';
const secret = process.env.ADMIN_SESSION_SECRET || 'local-development-change-before-production';

function sign(value: string) {
  return createHmac('sha256', secret).update(value).digest('hex');
}

export function createSession(role: AdminRole) {
  const payload = `${role}.${Date.now() + 1000 * 60 * 60 * 8}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySession(token?: string): AdminRole | null {
  if (!token) return null;
  const [role, expires, signature] = token.split('.');
  if (!role || !expires || !signature || Number(expires) < Date.now()) return null;
  const expected = sign(`${role}.${expires}`);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  return role === 'administrator' || role === 'editor' ? role : null;
}

export function verifyCredentials(username: string, password: string): AdminRole | null {
  if (process.env.NODE_ENV === 'production' && (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET)) {
    return null;
  }
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'movetra-admin-2026';
  const editorUser = process.env.EDITOR_USERNAME || 'editor';
  const editorPassword = process.env.EDITOR_PASSWORD || 'movetra-editor-2026';
  if (username === adminUser && password === adminPassword) return 'administrator';
  if (username === editorUser && password === editorPassword) return 'editor';
  return null;
}
