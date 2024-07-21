declare global {
  interface Console {
    logOriginal: (...args: unknown[]) => void;
  }
}

import { enhanceConsoleLogArgs } from '../helpers/console';

const consoleLogOriginal = console.log;

console.logOriginal = consoleLogOriginal;

console.log = (...args: unknown[]) => {
  const newArgs = enhanceConsoleLogArgs(...args);
  consoleLogOriginal(...newArgs, '\n');
};
