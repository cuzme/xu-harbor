import picocolors from 'picocolors';
import logSymbols from 'log-symbols';

export const log = {
  info: (msg: string) => {
    console.log(logSymbols.info, picocolors.bold(msg));
  },
  warning: (msg: string) => {
    console.log(logSymbols.warning, picocolors.yellow(msg));
  },
  error: (msg: string) => {
    console.log(logSymbols.error, picocolors.red(msg));
  },
};
