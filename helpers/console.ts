import util from 'node:util';

export function enhanceConsoleLogArgs(...args: unknown[]) {
  return args.map((arg) => {
    if (typeof arg === 'object')
      return util.inspect(arg, { depth: null, colors: true });

    if (typeof arg === 'string' && arg.includes('\n'))
      return util.inspect(arg, { colors: true }).replace(/\\n/g, '\n');

    return util.inspect(arg, { colors: true });
  });
}

export function enhanceConsoleLog(...args: unknown[]) {
  console.log(...enhanceConsoleLogArgs(...args));
}
