import util from 'node:util';

export function enhanceConsoleLogArgs(...args: unknown[]) {
  return args.map((arg) => {
    if (typeof arg === 'object')
      return util.inspect(arg, { depth: null, colors: true });

    return util.inspect(arg, { colors: true });
  });
}
