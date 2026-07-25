import { NextResponse } from 'next/server';
import { readSiteContent } from '@/lib/site-content-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await readSiteContent(), {
    headers: { 'Cache-Control': 'no-store' },
  });
}

