import { NextRequest, NextResponse } from 'next/server';
import { createSession, verifyCredentials } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const role = verifyCredentials(String(username || ''), String(password || ''));
  if (!role) return NextResponse.json({ error: 'Username atau kata sandi salah.' }, { status: 401 });
  const response = NextResponse.json({ role });
  response.cookies.set('movetra_admin', createSession(role), {
    httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production',
    path: '/', maxAge: 60 * 60 * 8,
  });
  return response;
}

