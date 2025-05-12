export type FindMatchingClosingBracketArgs = {
  text: string;
  openPosition: number;
};

export const findMatchingClosingBracket = ({ text, openPosition }: FindMatchingClosingBracketArgs) => {
  if (!text || typeof text !== 'string') {
    return -1;
  }
  
  if (openPosition < 0 || openPosition >= text.length) {
    return -1;
  }

  let depth = 0;

  for (let i = openPosition; i < text.length; i++) {
    if (text[i] === '[') {
      depth++;
    }
    if (text[i] === ']') {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }

  return -1;
}