import { enhanceConsoleLogArgs } from '../helpers/console';

const oldConsoleLog = console.log;

console.log = (...args: unknown[]) => {
  const newArgs = enhanceConsoleLogArgs(...args);
  oldConsoleLog(...newArgs, '\n');
};
