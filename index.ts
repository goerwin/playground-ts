import chokidar from 'chokidar';
import chalk from 'chalk';
import { execSync } from 'node:child_process';

function clearConsole() {
  process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');
  console.clear();
}

function printNodeVersion() {
  console.log(chalk.dim(`Node.js ${process.version}`));
}

function handleError(e: unknown) {
  if (
    !(
      typeof e === 'object' &&
      e !== null &&
      'stderr' in e &&
      typeof e.stderr === 'string'
    )
  )
    return console.log(chalk.red(e));

  const errorStr = e.stderr;

  if (errorStr.includes('[TransformError]')) {
    const startIdx = errorStr.indexOf('Error [TransformError]');
    const endIdx = errorStr.indexOf('\n', startIdx);
    const parsedError = errorStr.substring(startIdx, endIdx);

    const errorOriginRes = /(.*): (ERROR:.*)/gm.exec(errorStr);
    const errorOriginPath = errorOriginRes?.at(1);
    const moreInfoError = errorOriginRes?.at(2);

    return console.log(
      `${chalk.red(parsedError)}\n` +
        `${chalk.redBright(moreInfoError)}\n` +
        `at ${chalk.blueBright(errorOriginPath)}`
    );
  }

  if (errorStr.includes('Error:')) {
    const errorType = errorStr.includes('Error:') ? 'Error' : 'Error';

    const parsedError = new RegExp(`.*${errorType}:.*`, 'm')
      .exec(errorStr)
      ?.at(0);
    const path = errorStr
      .match(/at .*/gm)
      ?.filter((it) => !it.includes('node:'))
      .join('\n');
    const codeErrorRegex = new RegExp(
      `(?:\\n)([\\s\\S]*?)(?=\\n.*${errorType})`,
      'm'
    );

    const codeErrorStr = codeErrorRegex.exec(errorStr)?.at(1);

    return console.log(
      `${chalk.red(parsedError)}` +
        `\n${chalk.blueBright(path)}` +
        `\n\n${chalk.white.italic(codeErrorStr)}`
    );
  }

  console.log(chalk.red(e));
}

clearConsole();
printNodeVersion();
console.log(new Date());
console.log('Watching for changes...');

// todo: handle race conditions if a file is running and another one has to run
// keep a reference and discard result accordingly?

chokidar.watch('./scripts/*.{ts,js}').on('change', (path) => {
  clearConsole();

  console.log(chalk.dim(`Node ${process.version}`));
  console.log(new Date());
  console.log(chalk.dim(path));
  console.log();

  // print this good in script files
  // console.log('first script yaaa\nsdfs\nadf');

  try {
    const result = execSync(`tsx --import ./polyfills/console.ts ${path}`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    console.log(result);
  } catch (e) {
    handleError(e);
  }
});
