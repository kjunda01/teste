export const isValidParam = (...params) => {
  return params.every((param) => param !== undefined && param !== null);
};
