export const DEBOUNCE_DELAY_TIME = 200;

export const debounce = (func, timeout = DEBOUNCE_DELAY_TIME) => {
  let timer = undefined;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, timeout);
  };
};
