import { promises as fs } from 'node:fs';
import path from 'node:path';

async function removeAllScripts() {
  const scriptsDir = path.join(__dirname, '../scripts');

  const files = await fs.readdir(scriptsDir);

  for (const file of files) {
    if (file === 'hi.ts') continue;
    const filePath = path.join(scriptsDir, file);
    await fs.rm(filePath);
  }
}

removeAllScripts().then(() => console.log('scripts removed!'));
