import path from 'node:path';
import { promises as fs } from 'node:fs';
import { randomBytes } from 'node:crypto';

function generateRandomFilename(sufix: string): string {
  const hash = randomBytes(8).toString('hex');
  const filename = `${sufix}${hash}.ts`;
  return filename;
}

async function createRandomScriptFile() {
  const scriptsDir = path.join(__dirname, '../scripts');
  const filePath = path.join(scriptsDir, generateRandomFilename('sc-'));
  await fs.writeFile(filePath, 'console.log("hello world");');
  return filePath;
}

createRandomScriptFile().then(console.log);
