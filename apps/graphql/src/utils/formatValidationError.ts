import { findMatchingClosingBracket } from './findMatchingClosingBracket';

export type FormatValidationErrorArgs = {
  error: Error;
};

export const formatValidationError = ({ error }: FormatValidationErrorArgs) => {
  if (!error?.message || typeof error.message !== 'string') {
    return null;
  }

  const message = error.message;

  if (!message.includes('"code":') || !message.includes('"path":')) {
    return null;
  }

  const openBracket = message.indexOf('[');
  if (openBracket === -1) {
    return null;
  }

  const closeBracket = findMatchingClosingBracket({
    text: message,
    openPosition: openBracket,
  });

  if (closeBracket === -1) {
    return null;
  }

  const jsonText = message.substring(openBracket, closeBracket + 1);

  try {
    const zodErrors = JSON.parse(jsonText);

    if (Array.isArray(zodErrors) && zodErrors.length > 0) {
      const firstError = zodErrors[0];
      const fieldName = firstError.path?.[0] || 'unknown';

      return {
        field: fieldName,
        message: firstError.message,
        details: firstError,
      };
    }
  } catch (e) {
    // Silently fail on JSON parse errors
  }

  return null;
};
