import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/admin-auth';
import { readSiteContent, writeSiteContent } from '@/lib/site-content-server';
import { defaultSiteContent, SiteContent } from '@/lib/site-content-schema';

function role(request: NextRequest) {
  return verifySession(request.cookies.get('movetra_admin')?.value);
}

export async function GET(request: NextRequest) {
  const currentRole = role(request);
  if (!currentRole) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ content: await readSiteContent(), role: currentRole });
}

export async function PUT(request: NextRequest) {
  const currentRole = role(request);
  if (!currentRole) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json() as SiteContent;
  const content: SiteContent = {
    ...defaultSiteContent,
    ...body,
    updatedAt: new Date().toISOString(),
    updatedBy: currentRole === 'administrator' ? 'Administrator' : 'Editor',
  };
  await writeSiteContent(content);
  return NextResponse.json({ content });
}

export async function DELETE(request: NextRequest) {
  const currentRole = role(request);
  if (currentRole !== 'administrator') return NextResponse.json({ error: 'Hanya administrator yang dapat mereset konten.' }, { status: 403 });
  await writeSiteContent(defaultSiteContent);
  return NextResponse.json({ content: defaultSiteContent });
}

