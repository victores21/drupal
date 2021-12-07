export const pipe = (...fns) => arg =>
  fns.reduce((value, fn) => fn(value), arg);
