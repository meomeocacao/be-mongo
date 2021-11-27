export const UpperFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
};
