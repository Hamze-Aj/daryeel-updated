import fs from 'node:fs';
import path from 'node:path';

type LegacyPageProps = {
  fileName: string;
};

function readBody(fileName: string) {
  const filePath = path.join(process.cwd(), 'content', 'legacy', fileName);
  const source = fs.readFileSync(filePath, 'utf8');
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];

  if (!body) {
    throw new Error(`Could not find a body in ${fileName}`);
  }

  return body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/(src|href)="images\//g, '$1="/images/')
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="about\.html/g, 'href="/about')
    .replace(/href="contact\.html/g, 'href="/contact')
    .replace(/href="gallery\.html/g, 'href="/gallery')
    .replace(/href="impact\.html/g, 'href="/impact')
    .replace(/href="projects\.html/g, 'href="/projects')
    .replace(/href="team\.html/g, 'href="/team')
    .replace(/href="donate\.html/g, 'href="/donate');
}

export default function LegacyPage({ fileName }: LegacyPageProps) {
  return <div dangerouslySetInnerHTML={{ __html: readBody(fileName) }} />;
}