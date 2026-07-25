import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const role = verifySession(request.cookies.get('movetra_admin')?.value);
  return role ? NextResponse.json({ authenticated: true, role }) : NextResponse.json({ authenticated: false }, { status: 401 });
}

