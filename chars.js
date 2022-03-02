export const chars = Array.from(Array(91)).map((e, i) => String.fromCharCode(i + 33));
export const filteredChars = chars.filter(c => /\w/.test(c))