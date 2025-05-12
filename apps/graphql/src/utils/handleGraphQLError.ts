import { extractGraphQLErrorCode } from './extractGraphQLErrorCode';
import { formatValidationError } from './formatValidationError';

export type HandleGraphQLErrorArgs = {
  error: Error;
  shouldLog?: boolean;
};

export const handleGraphQLError = ({ error, shouldLog = false }: HandleGraphQLErrorArgs) => {
  if (!error) {
    return { errors: [{ message: 'Unknown error' }] };
  }

  if (shouldLog && error.message) {
    console.warn(error.message);
  }

  // Priority 1: Check for known GraphQL error codes (auth errors, etc.)
  const errorCode = extractGraphQLErrorCode({ error });
  if (errorCode) {
    return {
      errors: [{ message: errorCode }],
    };
  }

  // Priority 2: Check for validation errors
  const validationError = formatValidationError({ error });
  if (validationError) {
    return {
      errors: [
        {
          message: `VALIDATION_ERROR: ${validationError.field} - ${validationError.message}`,
          validation: {
            field: validationError.field,
            details: validationError.details,
          },
        },
      ],
    };
  }

  // Priority 3: Return generic error with clean message
  return {
    errors: [
      {
        message: error.message ? String(error.message).split('\n')[0].trim() : String(error),
      },
    ],
  };
};
