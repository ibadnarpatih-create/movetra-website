import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { defaultSiteContent, SiteContent } from './site-content-schema';

const contentPath = path.join(process.cwd(), 'data', 'site-content.json');

export async function readSiteContent(): Promise<SiteContent> {
  try {
    return { ...defaultSiteContent, ...JSON.parse(await fs.readFile(contentPath, 'utf8')) };
  } catch {
    return defaultSiteContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  await fs.writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
}

