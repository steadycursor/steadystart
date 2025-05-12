import { errors } from '@steadystart/errors';

export type ExtractGraphQLErrorCodeArgs = {
  error: Error;
};

export const extractGraphQLErrorCode = ({ error }: ExtractGraphQLErrorCodeArgs) => {
  if (!error?.message || typeof error.message !== 'string') {
    return null;
  }

  // Check for direct error code matches first (faster check)
  for (const errorCode of errors) {
    if (error.message.includes(errorCode)) {
      return errorCode;
    }
  }

  // Special case for ClientError format when not directly found
  if (error.name !== 'ClientError') {
    return null;
  }

  const firstLine = error.message.split('\n')[0].trim();
  const match = firstLine.match(/\[ClientError: ([A-Z_]+)\]/);
  if (!match || !match[1]) {
    return null;
  }

  const code = match[1] as (typeof errors)[number];
  if (!errors.includes(code)) {
    return null;
  }

  return code;
}